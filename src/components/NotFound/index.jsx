import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, Card, IconWrap, Code, Title, Subtitle, HomeBtn } from "./style";
import { ThemeData } from "../../Context/Theme";

const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12l9-9 9 9" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const NotFound = () => {
  const navigate = useNavigate();
  const [{ isDark }] = ThemeData();

  return (
    <PageWrapper $dark={isDark}>
      <Card $dark={isDark}>
        <IconWrap $dark={isDark}>
          <CompassIcon />
        </IconWrap>

        <Code>404</Code>
        <Title $dark={isDark}>Sahifa topilmadi</Title>
        <Subtitle $dark={isDark}>
          Kechirasiz, siz izlagan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
        </Subtitle>

        <HomeBtn onClick={() => navigate("/dashboard")}>
          <HomeIcon />
          Bosh sahifaga qaytish
        </HomeBtn>
      </Card>
    </PageWrapper>
  );
};

export default NotFound;      