import styled, { keyframes } from 'styled-components';

const fillBar = keyframes`
  from { width: 0%; }
  to   { width: var(--target-width); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#1a1a1a"};

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const CategoryAmount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dark }) => $dark ? "#aaa" : "#555"};

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TrackBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ $dark }) => $dark ? "#2a2a45" : "#efefef"};
  border-radius: 99px;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 6px;
  }
`;

export const FillBar = styled.div`
  height: 100%;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  width: ${({ $percent }) => $percent}%;
  --target-width: ${({ $percent }) => $percent}%;
  animation: ${fillBar} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: ${({ $delay }) => $delay}s;
`;