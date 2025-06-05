import styled from "styled-components";
import { Funnel } from "lucide-react";

//elemento que mantém a estrutura da página de feed, divide a página entre flows/filtos
export const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 30px;
  justify-content: space-between;
  position: relative;
  gap: 20px;
  border: 1px solid violet;
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
