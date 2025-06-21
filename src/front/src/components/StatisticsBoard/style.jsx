import styled from "styled-components";
import { Users, Zap, MessageCircle, Heart } from "lucide-react";

export const StatisticsBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 20px;
  border-radius: 10px;

  background-color: #ffffff;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 colunas de tamanho igual
  grid-template-rows: repeat(2, 1fr); // 2 linhas de tamanho igual
  gap: 20px; // espaçamento entre os itens (pode ajustar conforme desejar)
`;
export const Title = styled.h2`
  font-size: 20px;
  color: #333333;
  font-weight: 600;
`;

export const StatisticsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  justify-content: space-between;
  padding: 15px;
  background-color: #f7f9fa;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    background-color: #dee2ff;
  }

  &:hover h2 {
    color: #233dff;
  }
`;
export const CardNumbers = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 600;
`;

export const CardTitle = styled.p`
  font-size: 16px;
  color: #666666;
`;

export const FlowsIcon = styled(Zap)`
  stroke: #233dff;
`;
export const UsersIcon = styled(Users)`
  stroke: #33cc66;
`;

export const CommunityPostsIcon = styled(MessageCircle)`
  stroke: #6c63ff;
`;

export const LikesIcon = styled(Heart)`
  stroke: #ff3366;
`;
