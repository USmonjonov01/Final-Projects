import React, { useState, useEffect } from "react";
import { PageWrapper, PageHeader, PageTitleGroup, PageTitle, PageSub, AddBtn, CardsGrid, CategoryCard, CardTop, IconCircle, CardPercent, CardActions, CardActionBtn, CardName, CardTxCount, CardAmount, ProgressBar, ProgressFill, SummaryCard, SummaryTitle, SummaryRow, SummaryIconCircle, SummaryInfo, SummaryName, SummaryBarWrap, SummaryBarFill, SummaryRight, SummaryAmount, SummaryPercent, ModalOverlay, ModalBox, ModalHeader, ModalTitle, ModalCloseBtn, ModalLabel, ModalInput, IconGrid, IconBtn, ColorGrid, ColorBtn, ModalFooter, CancelBtn, SubmitBtn, } from "./style";
import { ThemeData } from "../../Context/Theme";
import { Icons } from "../registration/singIN/style";
import { useNotification } from "../../Context/Messages";
import { Use_Notification } from "../../Context/Notification"; // ⛔ YANGI
import Axios from "../../Axios";

const ICONS = ["🛒", "🚗", "🏠", "🎮", "☕", "❤️", "💼", "🎁", "📱", "✈️", "🎓", "💊", "🏋️", "🎵", "🍕", "⚽"];

const COLORS = [
  { color: "#3b82f6", bg: "#dbeafe" },
  { color: "#22c55e", bg: "#dcfce7" },
  { color: "#f97316", bg: "#ffedd5" },
  { color: "#a855f7", bg: "#f3e8ff" },
  { color: "#ec4899", bg: "#fce7f3" },
  { color: "#ef4444", bg: "#fee2e2" },
  { color: "#6366f1", bg: "#e0e7ff" },
  { color: "#eab308", bg: "#fef9c3" },
  { color: "#14b8a6", bg: "#ccfbf1" },
  { color: "#06b6d4", bg: "#cffafe" },
];

const api = import.meta.env.VITE_API;

export default function Categories() {
  const [{ isDark }] = ThemeData();
  const { notify, destroyNotify } = useNotification();
  const { confirmModal } = Use_Notification(); // ⛔ YANGI
  const [userId, setUserId] = useState()

  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newName, setNewName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [extraAmount, setExtraAmount] = useState(""); // ⛔ YANGI: faqat tahrirlashda ishlatiladi
  const userData = localStorage.getItem("userData")

  useEffect(() => {
    GetCategories();
  }, []);

  async function GetOrCreateDokon(uid) {
    const res = await Axios.get(`${api}/${uid}/dokon`);
    const list = Array.isArray(res.data) ? res.data : [res.data];
    if (list.length > 0 && list[0]) return list[0];

    const createRes = await Axios.post(`${api}/${uid}/dokon`, { registerId: uid, mahsulotlar: [] });
    return createRes.data;
  }

  async function GetCategories() {
    notify("loading", "Kategoriyalar yuklanmoqda...");
    try {
      const userRes = await Axios.get(api);
      const user = userRes.data.find((obj) => obj?.ism === userData);
      if (!user) {
        destroyNotify();
        notify("error", "Foydalanuvchi topilmadi!");
        return;
      }
      setUserId(user.id);

      const dokonRes = await Axios.get(`${api}/${user.id}/dokon`);
      const dokonList = Array.isArray(dokonRes.data) ? dokonRes.data : [dokonRes.data];
      const mahsulotlar = dokonList[0]?.mahsulotlar || [];

      const cats = mahsulotlar.filter((item) => item?.itemType === "category");
      const transactions = mahsulotlar.filter((item) => item?.itemType === "transaction");

      // ⛔ YANGI: percent endi umumiy balansga nisbatan hisoblanadi (Dashboard bilan bir xil mantiq)
      const totalIncome = transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
      const totalExpense = transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
      const balance = totalIncome - totalExpense;

      const merged = cats.map((cat) => {
        const catTxs = transactions.filter((tx) => tx.type === "expense" && tx.category === cat.name);
        const txAmount = catTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);

        // ⛔ YANGI: qo'lda kiritilgan qo'shimcha summa (manualAdjustment) tranzaksiyalar yig'indisiga qo'shiladi
        const amount = txAmount + Number(cat.manualAdjustment || 0);
        const txCount = catTxs.length;

        // ⛔ YANGI: foiz balansga nisbatan (balans <= 0 bo'lsa 0 qaytariladi, manfiy/mantiqsiz foizning oldini olish uchun)
        const percent = balance > 0 ? Math.round((amount / balance) * 100) : 0;

        return { ...cat, amount, txCount, percent };
      });

      setCategories(merged);

      destroyNotify();
      notify("success", "Kategoriyalar yuklandi!");
    } catch (error) {
      destroyNotify();
      notify("error", "Yuklaishda xatolik!");
      console.log(error.message);
    }
  }

  async function HandleAdd() {
    if (!newName.trim()) return;
    notify("loading", "Saqlanmoqda...");
    try {
      const dokon = await GetOrCreateDokon(userId);
      const newItem = {
        id: crypto.randomUUID(),
        itemType: "category",
        icon: selectedIcon,
        color: selectedColor.color,
        bg: selectedColor.bg,
        name: newName.trim(),
        manualAdjustment: 0, // ⛔ YANGI: yaratishda har doim 0
      };
      const updatedMahsulotlar = [...(dokon.mahsulotlar || []), newItem];

      await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
      await GetCategories();

      destroyNotify();
      notify("success", "Kategoriya qo'shildi!");
      CloseModal();
    } catch (error) {
      destroyNotify();
      notify("error", "Qo'shishda xatolik!");
      console.log(error.message);
    }
  }

  async function HandleEdit() {
    if (!newName.trim()) return;
    notify("loading", "Yangilanmoqda...");
    try {
      const dokon = await GetOrCreateDokon(userId);

      // ⛔ YANGI: kiritilgan qo'shimcha summa avvalgi manualAdjustment ustiga QO'SHILADI, ustidan yozilmaydi
      const addedAmount = Number(extraAmount) || 0;

      const updatedMahsulotlar = (dokon.mahsulotlar || []).map((item) =>
        item.id === editTarget.id
          ? {
              ...item,
              icon: selectedIcon,
              color: selectedColor.color,
              bg: selectedColor.bg,
              name: newName.trim(),
              manualAdjustment: Number(item.manualAdjustment || 0) + addedAmount,
            }
          : item
      );

      await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
      await GetCategories();

      destroyNotify();
      notify("success", "Kategoriya yangilandi!");
      CloseModal();
    } catch (error) {
      destroyNotify();
      notify("error", "Yangilashda xatolik!");
      console.log(error.message);
    }
  }

  // ⛔ TUZATILDI: confirm() -> confirmModal()
  function HandleDelete(id) {
    confirmModal({
      title: "Kategoriyani o'chirish",
      content: "Kategoriyani o'chirishni tasdiqlaysizmi?",
      okText: "Ha, o'chirish",
      cancelText: "Bekor qilish",
      okButtonProps: { danger: true },
      onOk: async () => {
        notify("loading", "O'chirilmoqda...");
        try {
          const dokon = await GetOrCreateDokon(userId);
          const updatedMahsulotlar = (dokon.mahsulotlar || []).filter((item) => item.id !== id);

          await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
          await GetCategories();

          destroyNotify();
          notify("success", "Kategoriya o'chirildi!");
        } catch (error) {
          destroyNotify();
          notify("error", "O'chirishda xatolik!");
          console.log(error.message);
        }
      },
    });
  }

  function OpenAdd() {
    setEditTarget(null);
    setNewName("");
    setSelectedIcon(ICONS[0]);
    setSelectedColor(COLORS[0]);
    setExtraAmount(""); // ⛔ YANGI
    setModalOpen(true);
  }

  function OpenEdit(cat) {
    setEditTarget(cat);
    setNewName(cat.name);
    setSelectedIcon(cat.icon || ICONS[0]);
    setSelectedColor(
      COLORS.find((c) => c.color === cat.color) || COLORS[0]
    );
    setExtraAmount(""); // ⛔ YANGI: har safar bo'sh boshlanadi (bu — QO'SHILADIGAN son, joriy summa emas)
    setModalOpen(true);
  }

  function CloseModal() {
    setModalOpen(false);
    setEditTarget(null);
    setExtraAmount(""); // ⛔ YANGI
  }


  return (
    <div style={{ maxHeight: "100vh", height: "100%", overflow: "scroll" }} className="ScrollBar">
      <PageWrapper $dark={isDark}>
        <PageHeader>
          <PageTitleGroup>
            <PageTitle $dark={isDark}>Kategoriyalar</PageTitle>
            <PageSub $dark={isDark}>Xarajatlaringizni kategoriyalar bo'yicha boshqaring</PageSub>
          </PageTitleGroup>
          <AddBtn onClick={OpenAdd}>+ Yangi kategoriya</AddBtn>
        </PageHeader>

        <CardsGrid>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} $dark={isDark} $delay={i * 0.04}>
              <CardTop>
                <IconCircle $bg={cat.bg}>{cat.icon}</IconCircle>
                <CardPercent $dark={isDark}>{cat.percent}%</CardPercent>
              </CardTop>
              <CardName $dark={isDark}>{cat.name}</CardName>
              <CardTxCount $dark={isDark}>{cat.txCount} ta tranzaksiya</CardTxCount>
              <CardAmount $dark={isDark}>
                {Number(cat.amount || 0).toLocaleString("uz-UZ")} so'm
              </CardAmount>
              <ProgressBar $dark={isDark}>
                <ProgressFill $color={cat.color} $width={`${cat.percent}%`} />
              </ProgressBar>

              <CardActions>
                <CardActionBtn
                  title="Tahrirlash"
                  onClick={(e) => { e.stopPropagation(); OpenEdit(cat); }}
                >
                  <Icons.EditIcon />
                </CardActionBtn>
                <CardActionBtn
                  $danger
                  title="O'chirish"
                  onClick={(e) => { e.stopPropagation(); HandleDelete(cat.id); }}
                >
                  <Icons.DeleteIcon />
                </CardActionBtn>
              </CardActions>
            </CategoryCard>
          ))}
        </CardsGrid>

        <SummaryCard $dark={isDark}>
          <SummaryTitle $dark={isDark}>Umumiy xarajatlar</SummaryTitle>
          {categories.map((cat) => (
            <SummaryRow key={cat.id} $dark={isDark}>
              <SummaryIconCircle $bg={cat.bg}>{cat.icon}</SummaryIconCircle>
              <SummaryInfo>
                <SummaryName $dark={isDark}>{cat.name}</SummaryName>
                <SummaryBarWrap $dark={isDark}>
                  <SummaryBarFill $color={cat.color} $width={`${cat.percent}%`} />
                </SummaryBarWrap>
              </SummaryInfo>
              <SummaryRight>
                <SummaryAmount $dark={isDark}>
                  {Number(cat.amount || 0).toLocaleString("uz-UZ")} so'm
                </SummaryAmount>
                <SummaryPercent $dark={isDark}>{cat.percent}%</SummaryPercent>
              </SummaryRight>
            </SummaryRow>
          ))}
        </SummaryCard>

        {modalOpen && (
          <ModalOverlay onClick={CloseModal}>
            <ModalBox $dark={isDark} onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle $dark={isDark}>
                  {editTarget ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
                </ModalTitle>
                <ModalCloseBtn $dark={isDark} onClick={CloseModal}>×</ModalCloseBtn>
              </ModalHeader>

              <ModalLabel $dark={isDark}>Kategoriya nomi</ModalLabel>
              <ModalInput
                $dark={isDark}
                placeholder="Masalan: Ovqat"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              {/* ⛔ YANGI: faqat tahrirlashda ko'rinadi, yaratishda yo'q */}
              {editTarget && (
                <>
                  <ModalLabel $dark={isDark}>Qo'shimcha summa (so'm)</ModalLabel>
                  <ModalInput
                    $dark={isDark}
                    type="number"
                    placeholder="Masalan: 50000"
                    value={extraAmount}
                    onChange={(e) => setExtraAmount(e.target.value)}
                  />
                </>
              )}

              <ModalLabel $dark={isDark}>Icon tanlang</ModalLabel>
              <IconGrid>
                {ICONS.map((icon) => (
                  <IconBtn
                    key={icon}
                    $active={selectedIcon === icon}
                    $dark={isDark}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    {icon}
                  </IconBtn>
                ))}
              </IconGrid>

              <ModalLabel $dark={isDark}>Rang tanlang</ModalLabel>
              <ColorGrid>
                {COLORS.map((c) => (
                  <ColorBtn
                    key={c.color}
                    $color={c.color}
                    $active={selectedColor.color === c.color}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </ColorGrid>

              <ModalFooter>
                <CancelBtn $dark={isDark} onClick={CloseModal}>Bekor qilish</CancelBtn>
                <SubmitBtn onClick={editTarget ? HandleEdit : HandleAdd}>
                  {editTarget ? "Saqlash" : "Qo'shish"}
                </SubmitBtn>
              </ModalFooter>
            </ModalBox>
          </ModalOverlay>
        )}
      </PageWrapper>
    </div>
  );
}