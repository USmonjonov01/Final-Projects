import React, { useState, useMemo, useEffect } from 'react';
import {
  GlobalStyle, AppWrapper, Main, PageHeader, PageTitle, PageSub, AddButton,
  Toolbar, SearchBox, SearchInput, TabGroup, Tab, TransactionList,
  TransactionRow, TxIcon, TxInfo, TxName, TxMeta, TxDot, TxAmount,
  TxActions, IconBtn,
  ModalOverlay, ModalBox, ModalHeader, ModalTitle, ModalCloseBtn,
  ModalLabel, ModalInput, TypeRow, TypeBtn,
  ModalFooter, CancelBtn, SubmitBtn, DeleteBtn,
} from './style';

import { Icons } from '../registration/singIN/style';
import { ThemeData } from '../../Context/Theme';
import { useNotification } from '../../Context/Messages';
import { Use_Notification } from '../../Context/Notification'; 
import Axios from '../../Axios';

const api = import.meta.env.VITE_API;

const formatAmount = (n) =>
  Number(n).toLocaleString('uz-UZ') + " so'm";

const CATEGORIES = [
  'Ovqat', 'Transport', "To'lovlar", "O'yin-kulgi",
  'Kafe', 'Salomatlik', 'Ish', "Sovg'alar", 'Daromad', 'Boshqa',
];

const EMPTY_FORM = {
  name: '',
  amount: '',
  category: 'Ovqat',
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
};

export default function Transactions() {
  const [{ isDark }] = ThemeData();
  const { notify, destroyNotify } = useNotification();
  const { confirmModal } = Use_Notification(); 

  const userData = localStorage.getItem('userData');

  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    GetUserId();
  }, []);

  useEffect(() => {
    if (userId) GetTransactions(userId);
  }, [userId]);

  async function GetUserId() {
    try {
      const res = await Axios.get(api);
      const user = res.data.find((obj) => obj?.ism === userData);
      if (user) setUserId(user.id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function GetOrCreateDokon(uid) {
    const res = await Axios.get(`${api}/${uid}/dokon`);
    const list = Array.isArray(res.data) ? res.data : [res.data];
    if (list.length > 0 && list[0]) return list[0];

    const createRes = await Axios.post(`${api}/${uid}/dokon`, { registerId: uid, mahsulotlar: [] });
    return createRes.data;
  }

  async function GetTransactions(id) {
    notify('loading', "Tranzaksiyalar yuklanmoqda...");
    try {
      const dokon = await GetOrCreateDokon(id);
      const mahsulotlar = dokon?.mahsulotlar || [];
      const onlyTx = mahsulotlar.filter((item) => item?.itemType === "transaction");
      const sorted = onlyTx.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sorted);

      destroyNotify();
      notify('success', "Tranzaksiyalar yuklandi!");
    } catch (error) {
      destroyNotify();
      notify('error', "Yuklashda xatolik!");
      console.log(error.message);
    }
  }

  // POST
  async function HandleAdd() {
    if (!form.name || !form.amount) return;
    notify('loading', "Saqlanmoqda...");
    try {
      const dokon = await GetOrCreateDokon(userId);
      const newItem = {
        id: crypto.randomUUID(),
        itemType: "transaction",
        name: form.name,
        amount: Number(form.amount),
        category: form.category,
        date: form.date || new Date().toISOString().slice(0, 10),
        type: form.type,
        description: form.name,
      };
      const updatedMahsulotlar = [...(dokon.mahsulotlar || []), newItem];

      await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
      await GetTransactions(userId);

      destroyNotify();
      notify('success', "Tranzaksiya qo'shildi!");
      CloseModal();
    } catch (error) {
      destroyNotify();
      notify('error', "Qo'shishda xatolik!");
      console.log(error.message);
    }
  }

  // PUT
  async function HandleEdit() {
    if (!form.name || !form.amount) return;
    notify('loading', "Yangilanmoqda...");
    try {
      const dokon = await GetOrCreateDokon(userId);
      const updatedMahsulotlar = (dokon.mahsulotlar || []).map((item) =>
        item.id === editTarget.id
          ? {
              ...item,
              name: form.name,
              amount: Number(form.amount),
              category: form.category,
              date: form.date,
              type: form.type,
              description: form.name,
            }
          : item
      );

      await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
      await GetTransactions(userId);

      destroyNotify();
      notify('success', "Tranzaksiya yangilandi!");
      CloseModal();
    } catch (error) {
      destroyNotify();
      notify('error', "Yangilashda xatolik!");
      console.log(error.message);
    }
  }

  function HandleDelete(id) {
    confirmModal({
      title: "Tranzaksiyani o'chirish",
      content: "Tranzaksiyani o'chirishni tasdiqlaysizmi?",
      okText: "Ha, o'chirish",
      cancelText: "Bekor qilish",
      okButtonProps: { danger: true },
      onOk: async () => {
        notify('loading', "O'chirilmoqda...");
        try {
          const dokon = await GetOrCreateDokon(userId);
          const updatedMahsulotlar = (dokon.mahsulotlar || []).filter((item) => item.id !== id);

          await Axios.put(`${api}/${userId}/dokon/${dokon.id}`, { ...dokon, mahsulotlar: updatedMahsulotlar });
          await GetTransactions(userId);

          destroyNotify();
          notify('success', "Tranzaksiya o'chirildi!");
        } catch (error) {
          destroyNotify();
          notify('error', "O'chirishda xatolik!");
          console.log(error.message);
        }
      },
    });
  }

  function OpenAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function OpenEdit(tx) {
    setEditTarget(tx);
    setForm({
      name: tx.name || tx.description || '',
      amount: tx.amount,
      category: tx.category,
      date: tx.date ? tx.date.slice(0, 10) : '',
      type: tx.type,
    });
    setModalOpen(true);
  }

  function CloseModal() {
    setModalOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
  }

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'income' && tx.type === 'income') ||
        (activeTab === 'expense' && tx.type === 'expense');
      const matchSearch =
        (tx.name || tx.description || '').toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [transactions, activeTab, search]);

  return (
    <>
      <GlobalStyle />
      <AppWrapper $dark={isDark}>
        <Main>
          <PageHeader>
            <div>
              <PageTitle $dark={isDark}>Tranzaksiyalar</PageTitle>
              <PageSub $dark={isDark}>Barcha xarajat va daromadlar</PageSub>
            </div>
            <AddButton $dark={isDark} onClick={OpenAdd}>
              <Icons.PlusIcon />
              Yangi tranzaksiya
            </AddButton>
          </PageHeader>

          <Toolbar>
            <SearchBox $dark={isDark}>
              <Icons.SearchIcon />
              <SearchInput
                $dark={isDark}
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>

            <TabGroup $dark={isDark}>
              <Tab $dark={isDark} $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>Barchasi</Tab>
              <Tab $dark={isDark} $active={activeTab === 'income'} onClick={() => setActiveTab('income')}>Daromad</Tab>
              <Tab $dark={isDark} $active={activeTab === 'expense'} onClick={() => setActiveTab('expense')}>Xarajat</Tab>
            </TabGroup>
          </Toolbar>

          <TransactionList $dark={isDark}>
            {filtered.map((tx, i) => (
              <TransactionRow key={tx.id} $index={i} $dark={isDark}>
                <TxIcon $income={tx.type === 'income'}>
                  {tx.type === 'income' ? <Icons.GreenbottomIcon /> : <Icons.RedRightIcon />}
                </TxIcon>

                <TxInfo>
                  <TxName $dark={isDark}>{tx.name || tx.description}</TxName>
                  <TxMeta $dark={isDark}>
                    {tx.category}
                    <TxDot />
                    <Icons.DateIcon style={{ width: "12px", height: "12px" }} />
                    {tx.date ? tx.date.slice(0, 10) : ''}
                  </TxMeta>
                </TxInfo>

                <TxAmount $income={tx.type === 'income'}>
                  {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
                </TxAmount>

                <TxActions>
                  <IconBtn title="Tahrirlash" onClick={() => OpenEdit(tx)}>
                    <Icons.EditIcon />
                  </IconBtn>
                  <IconBtn $danger onClick={() => HandleDelete(tx.id)} title="O'chirish">
                    <Icons.DeleteIcon />
                  </IconBtn>
                </TxActions>
              </TransactionRow>
            ))}
          </TransactionList>
        </Main>
      </AppWrapper>

      {modalOpen && (
  <ModalOverlay onClick={CloseModal}>
    <ModalBox $dark={isDark} onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle $dark={isDark}>
          {editTarget ? "Tranzaksiyani tahrirlash" : "Yangi tranzaksiya"}
        </ModalTitle>
        <ModalCloseBtn $dark={isDark} onClick={CloseModal}>×</ModalCloseBtn>
      </ModalHeader>

      <ModalLabel $dark={isDark}>Nomi</ModalLabel>
      <ModalInput $dark={isDark} name="name"
        placeholder="Masalan: Supermarket"
        value={form.name} onChange={handleFormChange} />

      <ModalLabel $dark={isDark}>Summa (so'm)</ModalLabel>
      <ModalInput $dark={isDark} name="amount" type="number"
        placeholder="0"
        value={form.amount} onChange={handleFormChange} />

      <ModalLabel $dark={isDark}>Kategoriya</ModalLabel>
      <ModalInput $dark={isDark} name="category"
        placeholder="Masalan: Ovqat"
        value={form.category} onChange={handleFormChange} />

      <ModalLabel $dark={isDark}>Sana</ModalLabel>
      <ModalInput $dark={isDark} name="date" type="date"
        value={form.date} onChange={handleFormChange} />

      <ModalLabel $dark={isDark}>Turi</ModalLabel>
      <TypeRow>
        <TypeBtn
          $dark={isDark}
          $active={form.type === 'expense'}
          $income={false}
          onClick={() => setForm(p => ({ ...p, type: 'expense' }))}
        >
          <Icons.RedRightIcon /> Xarajat
        </TypeBtn>
        <TypeBtn
          $dark={isDark}
          $active={form.type === 'income'}
          $income={true}
          onClick={() => setForm(p => ({ ...p, type: 'income' }))}
        >
          <Icons.GreenbottomIcon /> Daromad
        </TypeBtn>
      </TypeRow>

      <ModalFooter>
        {editTarget && (
          <DeleteBtn onClick={() => { HandleDelete(editTarget.id); CloseModal(); }}>
            O'chirish
          </DeleteBtn>
        )}
        <CancelBtn $dark={isDark} onClick={CloseModal}>Bekor qilish</CancelBtn>
        <SubmitBtn onClick={editTarget ? HandleEdit : HandleAdd}>
          {editTarget ? "Saqlash" : "Qo'shish"}
        </SubmitBtn>
      </ModalFooter>
    </ModalBox>
  </ModalOverlay>
)}
    </>
  );
}