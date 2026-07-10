import React, { useState, useEffect, useMemo } from "react";
import {
  PageWrapper, PageHeader, PageTitleGroup, PageTitle, PageSub,
  YearBadge, Card, LineCard, TwoColGrid, CardTitle, StatCardsRow,
  StatCard, StatCardTop, StatCardLabel, StatCardIcon, StatCardValue, StatCardSub
} from "./style";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Legend
} from "recharts";
import { ThemeData } from "../../Context/Theme";
import { useNotification } from "../../Context/Messages";
import Axios from "../../Axios";

const api = import.meta.env.VITE_API; 

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ec4899", "#ef4444", "#6366f1", "#eab308"];

const MONTHS = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];
const DAYS = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"];

const formatMln = (v) => `${(v / 1000000).toFixed(1)}M`;
const formatK = (v) => `${(v / 1000).toFixed(0)}K`;

export default function Statistics() {
  const [{ isDark }] = ThemeData();
  const { notify, destroyNotify } = useNotification();

  const userData = localStorage.getItem("userData");
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);

  const textColor = isDark ? "#aaa" : "#666";
  const gridColor = isDark ? "#2a2a45" : "#f0f0f0";
  const bgColor   = isDark ? "#1a1a2e" : "#fff";

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
    notify("loading", "Statistika yuklanmoqda...");
    try {
      const dokonRes = await Axios.get(`${api}/${id}/dokon`);
      const dokonList = Array.isArray(dokonRes.data) ? dokonRes.data : [dokonRes.data];
      const mahsulotlar = dokonList[0]?.mahsulotlar || [];
      const onlyTx = mahsulotlar.filter((item) => item?.itemType === "transaction");
      setTransactions(onlyTx);

      destroyNotify();
      notify("success", "Statistika yuklandi!");
    } catch (error) {
      destroyNotify();
      notify("error", "Yuklashda xatolik!");
      console.log(error.message);
    }
  }

  const lineData = useMemo(() => {
    const map = {};
    MONTHS.forEach((m, i) => { map[i] = { month: m, Daromad: 0, Xarajat: 0 }; });

    transactions.forEach((tx) => {
      const month = new Date(tx.date).getMonth();
      if (isNaN(month)) return;
      if (tx.type === "income") map[month].Daromad += Number(tx.amount);
      if (tx.type === "expense") map[month].Xarajat += Number(tx.amount);
    });

    return Object.values(map).filter(
      (m) => m.Daromad > 0 || m.Xarajat > 0
    );
  }, [transactions]);

  const pieData = useMemo(() => {
    const map = {};
    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        map[tx.category] = (map[tx.category] || 0) + Number(tx.amount);
      });

    const total = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map).map(([name, value]) => ({
      name,
      value: total > 0 ? Math.round((value / total) * 100) : 0,
    }));
  }, [transactions]);

  const barData = useMemo(() => {
    const map = {};
    DAYS.forEach((d) => { map[d] = 0; });

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);

    transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return tx.type === "expense" && d >= weekAgo && d <= now;
      })
      .forEach((tx) => {
        const day = DAYS[new Date(tx.date).getDay()];
        map[day] += Number(tx.amount);
      });

    return DAYS.map((d) => ({ day: d, value: map[d] }));
  }, [transactions]);

  const statCards = useMemo(() => {
    const expenses = transactions.filter((tx) => tx.type === "expense");
    const incomes  = transactions.filter((tx) => tx.type === "income");

    const totalExpense = expenses.reduce((s, tx) => s + Number(tx.amount), 0);
    const totalIncome  = incomes.reduce((s, tx) => s + Number(tx.amount), 0);

    const uniqueDays = new Set(expenses.map((tx) => tx.date?.slice(0, 10))).size;
    const avgDaily = uniqueDays > 0 ? Math.round(totalExpense / uniqueDays) : 0;

    const catMap = {};
    expenses.forEach((tx) => {
      catMap[tx.category] = (catMap[tx.category] || 0) + Number(tx.amount);
    });
    const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    const savingRate = totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

    return [
      {
        label: "O'rtacha kunlik xarajat",
        icon: "↘",
        value: `${avgDaily.toLocaleString("uz-UZ")} so'm`,
        sub: "Oxirgi 30 kun",
      },
      {
        label: "Eng ko'p xarajat",
        icon: "$",
        value: topCat ? topCat[0] : "—",
        sub: topCat ? `${Number(topCat[1]).toLocaleString("uz-UZ")} so'm` : "—",
      },
      {
        label: "Tejash nisbati",
        icon: "↗",
        value: `${savingRate}%`,
        sub: "Daromaddan",
      },
      {
        label: "Jami tranzaksiyalar",
        icon: "∿",
        value: `${transactions.length}`,
        sub: "Ushbu oy",
      },
    ];
  }, [transactions]);

  return (
    <PageWrapper $dark={isDark}>
      <PageHeader>
        <PageTitleGroup>
          <PageTitle $dark={isDark}>Statistika</PageTitle>
          <PageSub $dark={isDark}>Xarajatlaringiz bo'yicha tahlil</PageSub>
        </PageTitleGroup>
        <YearBadge $dark={isDark}>📅 2026 yil</YearBadge>
      </PageHeader>

      <LineCard $dark={isDark} $delay={0.05}>
        <CardTitle $dark={isDark}>Daromad va xarajatlar tendensiyasi</CardTitle>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="4 4" />
            <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatMln} tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: bgColor, border: `1px solid ${gridColor}`, borderRadius: 10, color: textColor }}
              formatter={(v) => [`${Number(v).toLocaleString("uz-UZ")} so'm`]}
            />
            <Legend wrapperStyle={{ color: textColor, fontSize: 13, paddingTop: 12 }} />
            <Line type="monotone" dataKey="Daromad" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Xarajat" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </LineCard>

      <TwoColGrid>
        <Card $dark={isDark} $delay={0.1}>
          <CardTitle $dark={isDark}>Kategoriyalar bo'yicha taqsimot</CardTitle>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={{ stroke: textColor }}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: bgColor, border: `1px solid ${gridColor}`, borderRadius: 10, color: textColor }}
                formatter={(v) => [`${v}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card $dark={isDark} $delay={0.15}>
          <CardTitle $dark={isDark}>Haftalik xarajatlar</CardTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatK} tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: bgColor, border: `1px solid ${gridColor}`, borderRadius: 10, color: textColor }}
                formatter={(v) => [`${Number(v).toLocaleString("uz-UZ")} so'm`, "Xarajat"]}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TwoColGrid>

      <StatCardsRow>
        {statCards.map((s, i) => (
          <StatCard key={s.label} $dark={isDark} $delay={0.2 + i * 0.04}>
            <StatCardTop>
              <StatCardLabel $dark={isDark}>{s.label}</StatCardLabel>
              <StatCardIcon $dark={isDark}>{s.icon}</StatCardIcon>
            </StatCardTop>
            <StatCardValue $dark={isDark}>{s.value}</StatCardValue>
            <StatCardSub $dark={isDark}>{s.sub}</StatCardSub>
          </StatCard>
        ))}
      </StatCardsRow>
    </PageWrapper>
  );
}