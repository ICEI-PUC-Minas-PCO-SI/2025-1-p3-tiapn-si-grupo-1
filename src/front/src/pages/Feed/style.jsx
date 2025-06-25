import styled from "styled-components";
import { Funnel, Plus } from "lucide-react";

//elemento que mantém a estrutura da página de feed, divide a página entre flows/filtos
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  height: 100vh;
  gap: 20px;
`;

export const FeedMain = styled.div`
  display: flex;
  gap: 20px;
`;

// <--- HEADER - FIXO --->
export const FeedHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 32px;
  gap: 20px;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HeaderTitleH1 = styled.h1`
  font-size: 28px;
`;

export const HeaderTitleDescription = styled.p`
  font-size: 16px;
  color: #666666;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

//<--- FLOWS - SCROLLAVEL --->
//Organiza e distribui os flows publicados
export const FlowFeed = styled.div`
  width: 70%;
  padding: 64px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 24px;

  /* Estilo da barra de rolagem vertical */
  ::-webkit-scrollbar {
    width: 12px; /* largura da scrollbar */
  }

  /* Track (trilho de fundo) */
  ::-webkit-scrollbar-track {
    background: transparent; /* pode pôr uma cor se quiser */
  }

  /* Thumb (a "alça" que desliza) */
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  /* Thumb no hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }
`;

export const ScrollFeed = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  padding-right: 30px;
  gap: 50px;
  height: 100%;
  overflow-y: auto;
`;

// <--- FILTROS - FIXO --->
//Aside que organiza os elementos disponíveis para filtro
export const FeedStatistics = styled.aside`
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 600px;
  gap: 20px;
  border-radius: 10px;
  position: sticky;
  top: 20px;
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
