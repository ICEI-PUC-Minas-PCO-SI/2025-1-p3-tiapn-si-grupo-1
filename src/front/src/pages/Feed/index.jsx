//componentes externos
import { useEffect, useState } from "react";
import ComponentDivider from "../../components/ComponentDivider/Index";
import SearchBar from "../../components/SearchBar";
import FilterMenu from "../../components/FilterOptions";
import FlowCard from "../../components/FlowCard";
import FlowsNotFound from "../../components/SystemResponses/FlowsNotFound";
import Categories from "../../components/FilterOptions/Categories";

//Global state
import { useFlowStore } from "../../store/flowStore";

//Bibliotecas
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
  const [filtros, setFiltros] = useState({
    categorias: [],
    tags: [],
    autores: [],
  });

  //Estados globais
  const flows = useFlowStore((state) => state.flows);
  const setSearchTerm = useFlowStore((state) => state.setSearchTerm);
  const searchTerm = useFlowStore((state) => state.searchTerm);
  const fetchFlows = useFlowStore((state) => state.fetchFlows);
  const category = useFlowStore((state) => state.category);

  async function fetchFiltros() {
    try {
      const response = await axios.get("http://localhost:3000/api/filtros");
      setFiltros(response.data);
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
    }
  }

  const debouncedSetSearchTerm = debounce((term) => {
    setSearchTerm(term);
  }, 0);

  //
  useEffect(() => {
    fetchFlows(); // carrega os flows ao entrar na página
    fetchFiltros();
  }, []);

  useEffect(() => {
    fetchFlows(); // atualiza os flows quando a categoria muda
  }, [category]);

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm); // dispara a busca com delay
    return debouncedSetSearchTerm.cancel;
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
          <Categories filtros={filtros.categorias} />
        </SearchMethods>
      </FeedHeader>
      <FeedMain>
        <FlowFeed>
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
