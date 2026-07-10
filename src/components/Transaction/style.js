import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f5f5f5;
    color: #1a1a1a;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const fadeInRow = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ $dark }) => $dark ? "#0f0f1a" : "#f8f9fb"};
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 36px;
  animation: ${fadeIn} 0.3s ease;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#1a1a1a"};
  line-height: 1.15;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: ${({ $dark }) => $dark ? "#888" : "#999"};
  margin-top: 3px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 20px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;
  white-space: nowrap;

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#e5e5e5"};
  border-radius: 9px;
  padding: 0 14px;
  height: 40px;
  transition: border-color 0.18s, box-shadow 0.18s;

  &:focus-within {
    border-color: ${({ $dark }) => $dark ? "#4cc9be" : "#bbb"};
    box-shadow: 0 0 0 3px ${({ $dark }) => $dark ? "rgba(76,201,190,0.1)" : "rgba(0,0,0,0.05)"};
  }

  svg { color: #aaa; flex-shrink: 0; }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  background: transparent;
  &::placeholder { color: #bbb; }
`;

export const TabGroup = styled.div`
  display: flex;
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#e5e5e5"};
  border-radius: 9px;
  padding: 3px;
  gap: 2px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: stretch;
  }
`;

export const Tab = styled.button`
  padding: 7px 16px;
  border-radius: 7px;
  border: none;
  background: ${({ $active, $dark }) => $active ? ($dark ? "#4cc9be" : "#1a1a1a") : "transparent"};
  color: ${({ $active, $dark }) => $active ? "#fff" : ($dark ? "#aaa" : "#777")};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition: background 0.18s, color 0.18s;

  &:hover:not([data-active]) {
    background: ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"};
    color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border-radius: 14px;
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ebebeb"};
  overflow: hidden;
`;

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f2f2f2"};
  animation: ${fadeInRow} 0.25s ease both;
  animation-delay: ${({ $index }) => $index * 0.04}s;
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ $dark }) => $dark ? "#12121f" : "#fafafa"}; }

  @media (max-width: 480px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

export const TxIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $income }) => ($income ? '#dcfce7' : '#fee2e2')};
  color: ${({ $income }) => ($income ? "#16a34a" : "#ef4444")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const TxInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TxName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#1a1a1a"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const TxMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#aaa"};
  margin-top: 2px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const TxDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #ccc;
  display: inline-block;
`;

export const TxAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ $income }) => ($income ? '#16a34a' : '#dc2626')};
  white-space: nowrap;
  margin-left: auto;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const TxActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
  opacity: 0;
  transition: opacity 0.18s;

  ${TransactionRow}:hover & { opacity: 1; }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const IconBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fff0f0' : '#f0f0f0')};
    color: ${({ $danger }) => ($danger ? '#dc2626' : '#555')};
  }
`;

// ── Bu qatorlarni Transaction/style.js ga qo'shing ──────────────────────────

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
  background: ${({ $dark }) => $dark ? '#1a1a2e' : '#fff'};
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
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
  color: ${({ $dark }) => $dark ? '#f0f0f0' : '#111'};
  margin: 0;
`;

export const ModalCloseBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: ${({ $dark }) => $dark ? '#2a2a45' : '#f5f5f5'};
  color: ${({ $dark }) => $dark ? '#aaa' : '#666'};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover { background: ${({ $dark }) => $dark ? '#3a3a5a' : '#ececec'}; }
`;

export const ModalLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? '#aaa' : '#555'};
  margin-bottom: 6px;
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid ${({ $dark }) => $dark ? '#2a2a45' : '#ececec'};
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: ${({ $dark }) => $dark ? '#f0f0f0' : '#333'};
  background: ${({ $dark }) => $dark ? '#12121f' : '#fff'};
  outline: none;
  margin-bottom: 16px;
  box-sizing: border-box;
  transition: border-color 0.18s, box-shadow 0.18s;

  &::placeholder { color: ${({ $dark }) => $dark ? '#444' : '#bbb'}; }
  &:focus {
    border-color: ${({ $dark }) => $dark ? '#4cc9be' : '#1a1a2e'};
    box-shadow: 0 0 0 3px ${({ $dark }) => $dark ? 'rgba(76,201,190,0.1)' : 'rgba(26,26,46,0.06)'};
  }
`;

export const TypeRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

export const TypeBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $active, $income }) =>
    $active ? ($income ? '#16a34a' : '#dc2626') : '#ececec'};
  background: ${({ $active, $income, $dark }) =>
    $active
      ? ($income ? '#dcfce7' : '#fee2e2')
      : $dark ? '#12121f' : 'transparent'};
  color: ${({ $active, $income, $dark }) =>
    $active
      ? ($income ? '#16a34a' : '#dc2626')
      : $dark ? '#666' : '#aaa'};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: all 0.15s;
  outline: none;

  svg { width: 14px; height: 14px; }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

export const CancelBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $dark }) => $dark ? '#2a2a45' : '#ececec'};
  background: transparent;
  color: ${({ $dark }) => $dark ? '#aaa' : '#555'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ $dark }) => $dark ? '#2a2a45' : '#f5f5f5'}; }
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

export const DeleteBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid #dc2626;
  background: transparent;
  color: #dc2626;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #fff0f0; }
`;