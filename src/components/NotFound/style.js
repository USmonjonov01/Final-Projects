import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${(p) => (p.$dark ? "#12121f" : "#f7f8fb")};
  transition: background 0.25s ease;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 480px;
  text-align: center;
  background: ${(p) => (p.$dark ? "#1a1a2e" : "#ffffff")};
  border: 1px solid ${(p) => (p.$dark ? "#2a2a45" : "#eef0f4")};
  border-radius: 20px;
  padding: 48px 32px;
  box-shadow: ${(p) =>
    p.$dark
      ? "0 10px 30px rgba(0,0,0,0.35)"
      : "0 10px 30px rgba(20,20,50,0.06)"};

  @media (max-width: 480px) {
    padding: 36px 20px;
    border-radius: 16px;
  }
`;

export const IconWrap = styled.div`
  width: 88px;
  height: 88px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$dark ? "#241b3a" : "#eef0ff")};
  color: #6366f1;
  animation: ${floatAnim} 3s ease-in-out infinite;

  svg {
    width: 40px;
    height: 40px;
  }
`;

export const Code = styled.h1`
  font-size: 64px;
  font-weight: 800;
  margin: 0 0 4px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 48px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${(p) => (p.$dark ? "#f4f4f8" : "#111827")};
`;

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 28px;
  color: ${(p) => (p.$dark ? "#9a9ab0" : "#6b7280")};
`;

export const HomeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;