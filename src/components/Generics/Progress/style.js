import styled, { keyframes } from 'styled-components';
 

const fillBar = keyframes`
  from { width: 0%; }
  to   { width: var(--target-width); }
`;
 

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
 
const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
 
const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
 
const CategoryName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
`;
 
const CategoryAmount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #555;
`;
 
const TrackBar = styled.div`
  width: 100%;
  height: 8px;
  background: #efefef;
  border-radius: 99px;
  overflow: hidden;
`;
 
const FillBar = styled.div`
  height: 100%;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  width: ${({ $percent }) => $percent}%;
  --target-width: ${({ $percent }) => $percent}%;
  animation: ${fillBar} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export {Wrapper, CategoryItem, CategoryHeader, CategoryName, CategoryAmount, TrackBar, FillBar}