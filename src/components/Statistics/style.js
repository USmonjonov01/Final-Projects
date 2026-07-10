import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  padding: 36px 40px;
  background: ${({ $dark }) => ($dark ? "#0f0f1a" : "#f8f9fb")};
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
  color: ${({ $dark }) => ($dark ? "#f0f0f0" : "#111")};
  margin: 0 0 4px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: ${({ $dark }) => ($dark ? "#666" : "#999")};
  margin: 0;
`;

export const YearBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#555")};
  background: ${({ $dark }) => ($dark ? "#1a1a2e" : "#fff")};
  border: 1px solid ${({ $dark }) => ($dark ? "#2a2a45" : "#f0f0f0")};
  border-radius: 10px;
  padding: 8px 16px;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

export const Card = styled.div`
  background: ${({ $dark }) => ($dark ? "#1a1a2e" : "#fff")};
  border: 1px solid ${({ $dark }) => ($dark ? "#2a2a45" : "#f0f0f0")};
  border-radius: 16px;
  padding: 24px;
  animation: ${fadeUp} 0.3s ease both;
  animation-delay: ${({ $delay }) => $delay || 0}s;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? "#f0f0f0" : "#111")};
  margin: 0 0 20px;
`;

export const LineCard = styled(Card)`
  margin-bottom: 20px;
`;

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(Card)`
  padding: 20px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const StatCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StatCardLabel = styled.div`
  font-size: 13px;
  color: ${({ $dark }) => ($dark ? "#666" : "#999")};
`;

export const StatCardIcon = styled.div`
  font-size: 16px;
  color: ${({ $dark }) => ($dark ? "#555" : "#bbb")};
`;

export const StatCardValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? "#f0f0f0" : "#111")};
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const StatCardSub = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => ($dark ? "#555" : "#bbb")};
`;