import { useEffect, useState } from "react";
import { ThemeData } from "../../Context/Theme";
import { useNotification } from "../../Context/Messages";
import { StudentListData } from "../../Context/Users";
import GenericProgress from "../Generics/Progress";
import { Icons } from "../registration/singIN/style";
import { Wrapper, Header, HeaderLeft, HeaderRight, Title, Subtitle, CardsGrid, StatCard, CardLabel, CardValue, CardSubText, ContentGrid, TransactionsCard, CategoriesCard, SectionHeader, TransactionsList, TransactionItem, TransactionIcon, TransactionInfo, TransactionTitle, TransactionCategory, TransactionAmount, TransactionDate, CardTop, } from "./style";
import Axios from "../../Axios";

const api = import.meta.env.VITE_API;

const Dashboard = () => {
  const [{ isDark }] = ThemeData();
  const { notify, destroyNotify } = useNotification();
  const [{ List }] = StudentListData();

  const userData = localStorage.getItem("userData");

  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);


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

  async function GetTransactions(id) {
    notify("loading", "Ma'lumotlar yuklanmoqda...");
    try {
      const dokonRes = await Axios.get(`${api}/${id}/dokon`);
      const dokonList = Array.isArray(dokonRes.data) ? dokonRes.data : [dokonRes.data];
      const mahsulotlar = dokonList[0]?.mahsulotlar || [];
      const onlyTx = mahsulotlar.filter((item) => item?.itemType === "transaction");
      const sorted = onlyTx.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sorted);

      destroyNotify();
      notify("success", "Ma'lumotlar yuklandi!");
    } catch (error) {
      destroyNotify();
      notify("error", "Ma'lumotlarni yuklashda xatolik!");
      console.log(error.message);
    }
  }


  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const categories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find((c) => c.name === t.category);
      if (existing) {
        existing.total += Number(t.amount);
      } else {
        acc.push({ name: t.category, total: Number(t.amount) });
      }
      return acc;
    }, []);


  const recentTransactions = transactions.slice(0, 5);

  function formatDate(isoString) {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }


  function formatAmount(amount) {
    return Number(amount).toLocaleString("uz-UZ");
  }

  return (
    <div style={{ maxHeight: "100vh", height: "100%", overflow: "scroll" }} className="ScrollBar_Dashboard">
      <Wrapper $dark={isDark}>
        <Header>
          <HeaderLeft>
            <Title $dark={isDark}>Dashboard</Title>
            <Subtitle $dark={isDark}>Xarajatlaringizni boshqaring</Subtitle>
          </HeaderLeft>
          <HeaderRight $dark={isDark}>
            <Icons.DateIcon />
            <span>May 2026</span>
          </HeaderRight>
        </Header>

        <CardsGrid>
          <StatCard $dark={isDark}>
            <CardTop>
              <CardLabel $dark={isDark}>Balans</CardLabel>
              <Icons.smallWalletIcon />
            </CardTop>
            <CardValue $dark={isDark}>
              {formatAmount(balance)} so'm
            </CardValue>
            <CardSubText $dark={isDark}>Umumiy balans</CardSubText>
          </StatCard>

          <StatCard $dark={isDark}>
            <CardTop>
              <CardLabel $dark={isDark}>Daromad</CardLabel>
              <Icons.topGreenIcon />
            </CardTop>
            <CardValue $dark={isDark} className="income">
              {formatAmount(totalIncome)} so'm
            </CardValue>
            <CardSubText $dark={isDark}>Ushbu oy</CardSubText>
          </StatCard>

          <StatCard $dark={isDark}>
            <CardTop>
              <CardLabel $dark={isDark}>Xarajat</CardLabel>
              <Icons.bottomRedIcon />
            </CardTop>
            <CardValue $dark={isDark} className="expense">
              {formatAmount(totalExpense)} so'm
            </CardValue>
            <CardSubText $dark={isDark}>Ushbu oy</CardSubText>
          </StatCard>
        </CardsGrid>

        <ContentGrid>
          <TransactionsCard $dark={isDark}>
            <SectionHeader $dark={isDark}>
              <h3>So'nggi tranzaksiyalar</h3>
              <button>Barchasini ko'rish</button>
            </SectionHeader>

            <TransactionsList>
              {recentTransactions.map((t) => (
                <TransactionItem key={t.id}>
                  <TransactionIcon className={t.type}>
                    {t.type === "income"
                      ? <Icons.GreenbottomIcon />
                      : <Icons.RedRightIcon />}
                  </TransactionIcon>
                  <TransactionInfo>
                    <TransactionTitle $dark={isDark}>{t.description}</TransactionTitle>
                    <TransactionCategory $dark={isDark}>{t.category}</TransactionCategory>
                  </TransactionInfo>
                  <div>
                    <TransactionAmount className={t.type}>
                      {t.type === "income" ? "+" : "-"}{formatAmount(t.amount)} so'm
                    </TransactionAmount>
                    <TransactionDate $dark={isDark}>{formatDate(t.date)}</TransactionDate>
                  </div>
                </TransactionItem>
              ))}
            </TransactionsList>
          </TransactionsCard>

          <CategoriesCard $dark={isDark}>
            <SectionHeader $dark={isDark}>
              <h3>Kategoriyalar bo'yicha</h3>
            </SectionHeader>
            <GenericProgress
              categories={categories}
              totalExpense={totalExpense}
            />
          </CategoriesCard>
        </ContentGrid>
      </Wrapper>
    </div>
  );
};

export default Dashboard;