import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #0A0A0A;
`;

export const Subtitle = styled.p`
  margin-top: 6px;
  color: #6b7280;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 28px;
`;

export const StatCard = styled.div`
  width: 366px;
  height: 129px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
`;

export const CardTop = styled.div`
width: 100%;
display:flex;
justify-content: space-between;
align-items: center;
`

export const CardLabel = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const CardValue = styled.h2`
  margin-top: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #111827;

  &.income {
    color: #16a34a;
  }

  &.expense {
    color: #ef4444;
  }
`;

export const CardSubText = styled.p`
  font-size: 12px;
  color: #717182;
  margin-top: 8px;
`;

export const ContentGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const TransactionsCard = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
`;

export const CategoriesCard = styled(TransactionsCard)``;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }

  button {
    display: flex;
    gap: 6px;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 13px;
  }
`;

export const TransactionsList = styled.div`
  margin-top: 22px;
`;

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

export const TransactionIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.income {
    background: #dcfce7;
    color: #16a34a;
  }

  &.expense {
    background: #fee2e2;
    color: #ef4444;
  }
`;

export const TransactionInfo = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const TransactionTitle = styled.div`
  font-weight: 600;
`;

export const TransactionCategory = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

export const TransactionAmount = styled.div`
  font-weight: 700;
  text-align: right;

  &.income {
    color: #16a34a;
  }

  &.expense {
    color: #ef4444;
  }
`;

export const TransactionDate = styled.div`
  font-size: 12px;
  color: #9ca3af;
  text-align: right;
`;

export const CategoryList = styled.div`
  margin-top: 20px;
`;

export const CategoryItem = styled.div`
  margin-bottom: 22px;
`;

export const CategoryTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${({ width }) => width};
  background: ${({ color }) => color};
  border-radius: 999px;
`;