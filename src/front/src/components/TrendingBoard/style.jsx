import { TrendingUp, Flame } from "lucide-react";
import styled from "styled-components";

export const TrendingBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 12px;
  border-radius: 10px;
  background-color: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TrendingIcon = styled(TrendingUp)`
  color: #233dff;
`;

export const Title = styled.h2`
  font-size: 16px;
  color: #333333;
  font-weight: 600;
`;

export const TrendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const TrendingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-color: #233dff;
  }

  &:hover h3 {
    color: #233dff;
  }
`;
export const FlowPosition = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 5px;
  background-color: #fff;
  color: #233dff;
  border: 2px solid #233dff;
  font-size: 12px;
  align-self: center;
`;
export const FlowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FlowTitle = styled.h3`
  font-size: 12px;
  color: #333333;
`;

export const FlowFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FlowAuthor = styled.p`
  font-size: 11px;
  color: #666666;
`;

export const FlowCategory = styled.span`
  font-size: 10px;
  color: #666666;
  background-color: #dee2ff;
  padding: 4px 12px;
  border-radius: 12px;
`;

export const PlayIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 2px solid #ff3366;
  border-radius: 50%;
`;

export const PlayIcon = styled(Flame)`
  stroke: #ff3366;
`;
