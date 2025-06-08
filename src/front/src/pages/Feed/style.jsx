import styled from "styled-components";
import { Funnel, TrendingUp, Clock, Plus } from "lucide-react";

//elemento que mantém a estrutura da página de feed, divide a página entre flows/filtos
export const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  justify-content: space-between;
  position: relative;
  gap: 20px;
`;

export const FeedMain = styled.div`
  border: 1px solid #6c63ff;
  display: flex;
`;

// <--- HEADER - FIXO --->
export const FeedHeader = styled.header`
  display: flex;
  flex-direction: column;
  border: 1px solid #6c63ff;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  gap: 20px;
`;

export const HeaderTop = styled.div`
  border: 1px solid #ff3366;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #233dff;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

//BOTÕES DE DE AÇÃO DO HEADER
export const TrendingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #233dff;
  border: 1px solid #233dff;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 12px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #dee2ff;
    color: #333333;
    svg {
      color: #333333;
      transform: scale(1.2);
    }
  }
`;

export const TrendingIcon = styled(TrendingUp)`
  color: #233dff;
  transition: all 0.4s ease-in-out;
`;
export const RecentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #233dff;
  border: 1px solid #233dff;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 12px;

  &:hover {
    background-color: #dee2ff;
    color: #333333;
    svg {
      color: #333333;
      transform: scale(1.2);
    }
  }
`;

export const RecentIcon = styled(Clock)`
  color: #233dff;
  transition: all 0.4s ease-in-out;
`;

export const CreateFlowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  border: 1px solid #233dff;
  background-color: #233dff;
  border-radius: 5px;
  padding: 10px 20px;
  transition: all 0.4s ease-in-out;

  &:hover {
    svg {
      transform: scale(1.4); /* Gira 360 graus */
      color: #fff;
    }
  }
`;
export const CreateFlowIcon = styled(Plus)`
  color: #fff;
  transition: all 0.4s ease-in-out;
`;

export const SearchMethods = styled.div`
  border: 1px solid #33cc66;
  padding: 20px;
`;

//<--- FLOWS - SCROLLAVEL --->
//Organiza e distribui os flows publicados
export const FlowFeed = styled.div`
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #ccc;
`;

export const ScrollFeed = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 50px;
  height: 100%;
`;

// <--- FILTROS - FIXO --->
//Aside que organiza os elementos disponíveis para filtro
export const FeedFilters = styled.aside`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  height: auto;
`;

export const FilterHeader = styled.header`
  margin-bottom: 20px;
`;

export const FilterIcon = styled(Funnel)`
  fill: #333;
  stroke: #333;
  margin-right: 12px;
  width: 20px;
  height: 20px;
`;

export const FilterTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;
