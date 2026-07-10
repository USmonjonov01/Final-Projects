import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  padding: 36px 40px;
  background: ${({ $dark }) => $dark ? "#0f0f1a" : "#f8f9fb"};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const PageTitleGroup = styled.div``;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin: 0 0 4px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
  margin: 0;
`;

export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 20px;
  border-radius: 10px;
  border: none;
  background: #1a1a2e;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;
  white-space: nowrap;

  svg { width: 16px; height: 16px; }
  &:hover { background: #2a2a45; transform: translateY(-1px); }
  &:active { transform: translateY(0); }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  border-radius: 16px;
  padding: 20px;
  animation: ${fadeUp} 0.3s ease both;
  animation-delay: ${({ $delay }) => $delay || 0}s;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || "#e8f0fe"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

export const CardPercent = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const CardName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin-bottom: 4px;
`;

export const CardTxCount = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
  margin-bottom: 8px;
`;

export const CardAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin-bottom: 10px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  border-radius: 999px;
  background: ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${({ $color }) => $color || "#2563eb"};
  width: ${({ $width }) => $width || "0%"};
  transition: width 0.4s ease;
`;

export const SummaryCard = styled.div`
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  border-radius: 16px;
  padding: 24px;
  animation: ${fadeUp} 0.3s ease both;
  animation-delay: 0.2s;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const SummaryTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin: 0 0 20px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"};

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const SummaryIconCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || "#e8f0fe"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
`;

export const SummaryInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SummaryName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin-bottom: 6px;
`;

export const SummaryBarWrap = styled.div`
  width: 100%;
  height: 7px;
  border-radius: 999px;
  background: ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  overflow: hidden;
`;

export const SummaryBarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${({ $color }) => $color || "#2563eb"};
  width: ${({ $width }) => $width || "0%"};
  transition: width 0.4s ease;
`;

export const SummaryRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
`;

export const SummaryAmount = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const SummaryPercent = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalBox = styled.div`
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  animation: ${fadeUp} 0.25s ease both;

  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: 14px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin: 0;
`;

export const ModalCloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"};
  color: ${({ $dark }) => $dark ? "#aaa" : "#666"};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover { background: ${({ $dark }) => $dark ? "#3a3a5a" : "#ececec"}; }
`;

export const ModalLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#aaa" : "#555"};
  margin-bottom: 8px;
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ececec"};
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  background: ${({ $dark }) => $dark ? "#12121f" : "#fafafa"};
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.18s, box-shadow 0.18s;
  box-sizing: border-box;

  &::placeholder { color: ${({ $dark }) => $dark ? "#444" : "#bbb"}; }
  &:focus {
    border-color: ${({ $dark }) => $dark ? "#4cc9be" : "#1a1a2e"};
    box-shadow: 0 0 0 3px ${({ $dark }) => $dark ? "rgba(76,201,190,0.1)" : "rgba(26,26,46,0.06)"};
  }
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const IconBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid ${({ $active, $dark }) =>
    $active ? "#1a1a2e" : $dark ? "#2a2a45" : "#ececec"};
  background: ${({ $active, $dark }) =>
    $active ? ($dark ? "#2a2a45" : "#f0f0ff") : "transparent"};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${({ $dark }) => $dark ? "#4cc9be" : "#1a1a2e"};
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 24px;
`;

export const ColorBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 3px solid ${({ $active }) => $active ? "#1a1a2e" : "transparent"};
  background: ${({ $color }) => $color};
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
  outline: 2px solid ${({ $active }) => $active ? "rgba(26,26,46,0.2)" : "transparent"};

  &:hover { transform: scale(1.08); }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
`;

export const CancelBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ececec"};
  background: transparent;
  color: ${({ $dark }) => $dark ? "#aaa" : "#555"};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"}; }
`;

export const SubmitBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: none;
  background: #1a1a2e;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;

  &:hover { background: #2a2a45; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;