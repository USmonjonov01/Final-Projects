import React, { useState, useEffect } from 'react';
import { Wrapper, CategoryItem, CategoryHeader, CategoryName, CategoryAmount, TrackBar, FillBar } from './style';
import { ThemeData } from '../../../Context/Theme';
import Axios from '../../../Axios';

const api = import.meta.env.VITE_API; 

const FALLBACK_COLORS = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#dc2626', '#0891b2', '#d97706'];

const GenericProgress = ({ categories: propCategories, totalExpense }) => {
  const [{ isDark }] = ThemeData();
  const [apiCategories, setApiCategories] = useState([]);

  const hasPropData = propCategories && propCategories.length > 0;
  const userData = localStorage.getItem("userData");

  useEffect(() => {
    if (!hasPropData) {
      GetProgress();
    }
  }, [hasPropData]);

  async function GetProgress() {
    try {
      const userRes = await Axios.get(api);
      const user = userRes.data.find((obj) => obj?.ism === userData);
      if (!user) return;

      const dokonRes = await Axios.get(`${api}/${user.id}/dokon`);
      const dokonList = Array.isArray(dokonRes.data) ? dokonRes.data : [dokonRes.data];
      const mahsulotlar = dokonList[0]?.mahsulotlar || [];

      const cats = mahsulotlar.filter((item) => item?.itemType === "category");
      const transactions = mahsulotlar.filter((item) => item?.itemType === "transaction");

      const expenses = transactions.filter((t) => t.type === "expense");
      const totalExpenseSum = expenses.reduce((sum, t) => sum + Number(t.amount || 0), 0);

      const merged = cats.map((cat, i) => {
        const catTxs = expenses.filter((t) => t.category === cat.name);
        const amount = catTxs.reduce((sum, t) => sum + Number(t.amount || 0), 0);
        const percent = totalExpenseSum > 0
          ? Math.round((amount / totalExpenseSum) * 100)
          : 0;

        return {
          name: cat.name,
          amount: `${amount.toLocaleString("uz-UZ")} so'm`,
          color: cat.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
          percent,
        };
      });

      setApiCategories(merged);
    } catch (error) {
      console.log("GenericProgress xatolik:", error.message);
    }
  }

  const fromProps = hasPropData
    ? propCategories.map((cat, i) => ({
        name: cat.name,
        amount: `${Number(cat.total).toLocaleString("uz-UZ")} so'm`,
        color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
        percent: totalExpense > 0
          ? Math.round((cat.total / totalExpense) * 100)
          : 0,
      }))
    : null;

  const displayCategories = fromProps || apiCategories;

  return (
    <Wrapper>
      {displayCategories.map(({ name, amount, color, percent }, i) => (
        <CategoryItem key={name}>
          <CategoryHeader>
            <CategoryName $dark={isDark}>{name}</CategoryName>
            <CategoryAmount $dark={isDark}>{amount}</CategoryAmount>
          </CategoryHeader>
          <TrackBar $dark={isDark}>
            <FillBar $color={color} $percent={percent} $delay={i * 0.1} />
          </TrackBar>
        </CategoryItem>
      ))}

      {displayCategories.length === 0 && (
        <CategoryName $dark={isDark} style={{ color: isDark ? "#666" : "#bbb" }}>
          Hozircha kategoriya yo'q
        </CategoryName>
      )}
    </Wrapper>
  );
};

export default GenericProgress;