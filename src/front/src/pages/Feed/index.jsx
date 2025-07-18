//componentes externos
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import FilterMenu from "../../components/FilterOptions";
import FlowCard from "../../components/FlowCard";
import FlowsNotFound from "../../components/SystemResponses/FlowsNotFound";
import Categories from "../../components/FilterOptions/Categories";
import LoadingSpinner from "../../components/LoadingSpinner";
import Overlay from "../../components/Overlay";
import StatisticsBoard from "../../components/StatisticsBoard";
import TrendingBoard from "../../components/TrendingBoard";

//Global state
import { useFlowStore } from "../../store/flowStore";

//Bibliotecas
import axios from "axios"; //responsável pela comunicação com as APIs
import { Navigate, useNavigate } from "react-router-dom";

//componentes internos
import {
  FeedContainer,
  FeedMain,
  FlowFeed,
  FeedStatistics,
  ScrollFeed,
  FeedHeader,
  HeaderTitleH1,
  HeaderTitleDescription,
  HeaderTitle,
  HeaderTop,
  HeaderActions,
  CreateFlowButton,
  CreateFlowIcon,
  SearchMethods,
} from "./style";

export default function Feed() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    categorias: [],
    tags: [],
    autores: [],
  });

  const handleClick = () => {
    navigate("/criar-flow");
  };

  //Estados globais
  const flows = useFlowStore((state) => state.flows);
  const searchTerm = useFlowStore((state) => state.searchTerm);
  const fetchFlows = useFlowStore((state) => state.fetchFlows);
  const category = useFlowStore((state) => state.category);
  const loading = useFlowStore((state) => state.loading);

  //Usuario
  const userToken = localStorage.token;
  const userID = localStorage.usuarioId;

  async function fetchFiltros() {
    try {
      const response = await axios.get(
        "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/filtros"
      );
      setFiltros(response.data);
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
    }
  }

  //Verificação feita para assegurar que o usuário esteja logado para acessa o feed
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetchFlows({ category, searchTerm });
  }, [category, searchTerm]);

  useEffect(() => {
    fetchFiltros();
  }, []);

  return (
    <FeedContainer>
      <FeedHeader>
        <HeaderTop>
          <HeaderTitle>
            <HeaderTitleH1>Descobrir Flows</HeaderTitleH1>
            <HeaderTitleDescription>
              Navegue por conteúdos criados por quem entende do assunto
            </HeaderTitleDescription>
          </HeaderTitle>
          <HeaderActions>
            <CreateFlowButton onClick={handleClick}>
              <CreateFlowIcon size={16} />
              Criar Flow
            </CreateFlowButton>
          </HeaderActions>
        </HeaderTop>

        <SearchMethods>
          <SearchBar />
          <Categories filtros={filtros.categorias} />
        </SearchMethods>
      </FeedHeader>
      <FeedMain>
        <FlowFeed>
          <ScrollFeed>
            {loading ? (
              <LoadingSpinner />
            ) : flows.length > 0 ? (
              flows.map((flow) => (
                <FlowCard flow={flow} key={flow.id} userID={userID} />
              ))
            ) : !loading && flows.length === 0 ? (
              <FlowsNotFound />
            ) : null}
          </ScrollFeed>
        </FlowFeed>
        <FeedStatistics>
          <TrendingBoard />
          <StatisticsBoard />
        </FeedStatistics>
      </FeedMain>
    </FeedContainer>
  );
}
