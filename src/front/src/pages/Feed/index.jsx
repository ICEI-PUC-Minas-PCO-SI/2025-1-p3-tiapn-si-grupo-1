//componentes externos
import { useEffect, useState } from "react";
import ComponentDivider from "../../components/ComponentDivider/Index";
import SearchBar from "../../components/SearchBar";
import FilterMenu from "../../components/FilterOptions";
import FlowCard from "../../components/FlowCard";
import FlowsNotFound from "../../components/SystemResponses/FlowsNotFound";
import debounce from "lodash.debounce";
import axios from "axios"; //responsável pela comunicação com as APIs

//componentes internos
import {
  FeedContainer,
  FeedMain,
  FlowFeed,
  FeedFilters,
  ScrollFeed,
  FilterHeader,
  FilterIcon,
  FilterTitle,
  FeedHeader,
  HeaderTitle,
  HeaderTop,
  HeaderActions,
  TrendingButton,
  RecentButton,
  CreateFlowButton,
  TrendingIcon,
  RecentIcon,
  CreateFlowIcon,
  SearchMethods,
} from "./style";

export default function Feed() {
  //STATE que armazena o termo de busca
  const [searchTerm, setSearchTerm] = useState("");
  //STATE que mantém os flows a serem exibidos no feed
  const [flows, setFlows] = useState([]);
  //STATE que armazena todos os filtros disponíveis
  const [filtros, setFiltros] = useState({
    categorias: [],
    tags: [],
    autores: [],
  });

  const fetchFlows = async (termo = "") => {
    console.log("Buscando flows com termo:", termo);
    try {
      const response = await axios.get("http://localhost:3000/api/flow", {
        params: { search: termo },
      });
      setFlows(response.data);
    } catch (error) {
      console.error("Erro ao buscar flows:", error);
    }
  };

  async function fetchFiltros() {
    //CONSULTAR API DE FILTROS
    try {
      const response = await axios.get("http://localhost:3000/api/filtros");
      setFiltros(response.data);
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
    }
  }

  const debouncedFetchFlows = debounce(fetchFlows, 500);

  useEffect(() => {
    // Carrega todos inicialmente
    fetchFiltros();
    fetchFlows();
  }, []);

  useEffect(() => {
    debouncedFetchFlows(searchTerm);
    return debouncedFetchFlows.cancel;
  }, [searchTerm]);

  return (
    <FeedContainer>
      <FeedHeader>
        <HeaderTop>
          <HeaderTitle>
            <h1 style={{ color: "#000" }}>Descobrir Flows</h1>
            <p>Navegue por conteúdos criados por quem entende do assunto</p>
          </HeaderTitle>
          <HeaderActions>
            <TrendingButton>
              <TrendingIcon size={16} />
              Trending
            </TrendingButton>
            <RecentButton>
              <RecentIcon size={16} />
              Recentes
            </RecentButton>
            <CreateFlowButton>
              <CreateFlowIcon size={16} />
              Criar Flow
            </CreateFlowButton>
          </HeaderActions>
        </HeaderTop>

        <SearchMethods>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </SearchMethods>
      </FeedHeader>
      <FeedMain>
        <FlowFeed>
          <ComponentDivider />
          <ScrollFeed>
            {flows.length > 0 ? (
              flows.map((flow) => <FlowCard flow={flow} key={flow.id} />)
            ) : (
              <FlowsNotFound />
            )}
          </ScrollFeed>
        </FlowFeed>

        <FeedFilters>
          <FilterHeader>
            <FilterTitle>
              <FilterIcon />
              Filtros
            </FilterTitle>
          </FilterHeader>
          <FilterMenu filterType={"Categorias"} filtros={filtros.categorias} />
          <FilterMenu filterType={"Tags"} filtros={filtros.tags} />
          <FilterMenu filterType={"Autores"} filtros={filtros.autores} />
        </FeedFilters>
      </FeedMain>
    </FeedContainer>
  );
}

/*seEffect(() => {
    //Codígo que será executado após a renderização

    async function fetchFiltros() {
      //CONSULTAR API DE FILTROS
      try {
        const response = await axios.get("http://localhost:3000/api/filtros");
        setFiltros(response.data);
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      }
    }

    //CONSULTAR API DE FLOWS
    const fetchFlows = async (termo = "") => {
      try {
        const response = await axios.get("http://localhost:3000/api/flow", {
          params: { search: termo },
        });
        setFlows(response.data);
      } catch (error) {
        console.error("Erro ao buscar flows:", error);
      }
    };

    fetchFiltros();
    fetchFlows();
  }, []);*/
