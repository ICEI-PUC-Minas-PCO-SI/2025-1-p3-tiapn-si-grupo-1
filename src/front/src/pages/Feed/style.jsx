import styled from "styled-components";
import { Funnel } from "lucide-react";

//elemento que mantém a estrutura da página de feed, divide a página entre flows/filtos
export const FeedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 35px); /* altura total da viewport */
  display: flex;
  padding: 30px;
  justify-content: space-between;
  gap: 60px;
`;

//<--- FLOWS - SCROLLAVEL --->
//Organiza e distribui os flows publicados
export const FlowFeed = styled.div`
  width: 60%;
  height: calc(100vh - 35px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ScrollFeed = styled.section`
  flex: 1;
  overflow-y: auto; /* Permite rolagem vertical */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// <--- FILTROS - FIXO --->
//Aside que organiza os elementos disponíveis para filtro
export const FeedFilters = styled.aside`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
