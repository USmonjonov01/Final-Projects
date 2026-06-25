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
  background: #f0f0f0;
`;



export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 36px;
  animation: ${fadeIn} 0.3s ease;
  min-width: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.15;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #999;
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
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 9px;
  padding: 0 14px;
  height: 40px;
  transition: border-color 0.18s, box-shadow 0.18s;

  &:focus-within {
    border-color: #bbb;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
  }

  svg { color: #aaa; flex-shrink: 0; }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #333;
  background: transparent;
  &::placeholder { color: #bbb; }
`;

export const TabGroup = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 9px;
  padding: 3px;
  gap: 2px;
`;

export const Tab = styled.button`
  padding: 7px 16px;
  border-radius: 7px;
  border: none;
  background: ${({ $active }) => ($active ? '#1a1a1a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#777')};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  transition: background 0.18s, color 0.18s;

  &:hover:not([data-active]) {
    background: #f5f5f5;
    color: #333;
  }
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #ebebeb;
  overflow: hidden;
`;

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid #f2f2f2;
  animation: ${fadeInRow} 0.25s ease both;
  animation-delay: ${({ $index }) => $index * 0.04}s;
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: #fafafa; }
`;

export const TxIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $income }) => ($income ? '#dcfce7' : '#fee2e2')};
  color: ${({$income})=> ($income? "#16a34a" : "#ef4444")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
`;

export const TxInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TxName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TxMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #aaa;
  margin-top: 2px;
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
`;

export const TxActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
  opacity: 0;
  transition: opacity 0.18s;

  ${TransactionRow}:hover & { opacity: 1; }
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












// export const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.45);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 999;
//   animation: ${fadeIn} 0.2s ease;
//   backdrop-filter: blur(2px);
// `;

// export const Dialog = styled.div`
//   background: #fff;
//   border-radius: 16px;
//   width: 100%;
//   max-width: 420px;
//   padding: 28px 28px 24px;
//   box-shadow: 0 24px 60px rgba(0,0,0,0.18);
//   animation: ${slideUp} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
//   position: relative;
// `;

// export const DialogHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 24px;
// `;

// export const DialogTitle = styled.h2`
//   font-size: 17px;
//   font-weight: 700;
//   color: #1a1a1a;
// `;

// export const CloseBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   border-radius: 8px;
//   border: none;
//   background: #f2f2f2;
//   color: #555;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   transition: background 0.15s, color 0.15s;

//   &:hover { background: #e5e5e5; color: #1a1a1a; }
// `;

// export const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   margin-bottom: 16px;
// `;

// export const Label = styled.label`
//   font-size: 13px;
//   font-weight: 500;
//   color: #555;
// `;

// export const Input = styled.input`
//   height: 42px;
//   border: 1.5px solid #e5e5e5;
//   border-radius: 9px;
//   padding: 0 13px;
//   font-size: 14px;
//   color: #1a1a1a;
//   outline: none;
//   transition: border-color 0.18s, box-shadow 0.18s;
//   background: #fafafa;

//   &::placeholder { color: #bbb; }
//   &:focus {
//     border-color: #1a1a1a;
//     background: #fff;
//     box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
//   }
// `;

// export const TypeRow = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// export const TypeOption = styled.button`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 7px;
//   height: 42px;
//   border-radius: 9px;
//   border: 1.5px solid ${({ $selected, $income }) =>
//     $selected ? ($income ? '#16a34a' : '#dc2626') : '#e5e5e5'};
//   background: ${({ $selected, $income }) =>
//     $selected ? ($income ? '#f0fdf4' : '#fff5f5') : '#fafafa'};
//   color: ${({ $selected, $income }) =>
//     $selected ? ($income ? '#16a34a' : '#dc2626') : '#999'};
//   font-size: 13px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.18s;

//   &:hover {
//     border-color: ${({ $income }) => ($income ? '#16a34a' : '#dc2626')};
//     color: ${({ $income }) => ($income ? '#16a34a' : '#dc2626')};
//     background: ${({ $income }) => ($income ? '#f0fdf4' : '#fff5f5')};
//   }
// `;

// export const DialogFooter = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 8px;
// `;

// export const CancelBtn = styled.button`
//   flex: 1;
//   height: 42px;
//   border-radius: 9px;
//   border: 1.5px solid #e5e5e5;
//   background: #fff;
//   color: #555;
//   font-size: 14px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.15s, border-color 0.15s;

//   &:hover { background: #f5f5f5; border-color: #ccc; }
// `;

// export const SubmitBtn = styled.button`
//   flex: 1;
//   height: 42px;
//   border-radius: 9px;
//   border: none;
//   background: #1a1a1a;
//   color: #fff;
//   font-size: 14px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.18s, transform 0.15s;

//   &:hover { background: #333; transform: translateY(-1px); }
//   &:active { transform: translateY(0); }
//   &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
// `;