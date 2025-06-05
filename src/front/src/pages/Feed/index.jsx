//componentes externos
import { useEffect, useState } from "react";
import ComponentDivider from "../../components/ComponentDivider/Index";
import SearchBar from "../../components/SearchBar";
import FilterMenu from "../../components/FilterOptions";
import FlowCard from "../../components/FlowCard";

//componentes internos
import {
  FeedContainer,
  FlowFeed,
  FeedFilters,
  ScrollFeed,
  FilterHeader,
  FilterIcon,
  FilterTitle,
} from "./style";
import axios from "axios"; //responsável pela comunicação com as APIs

export default function Feed() {
  //STATE que armazena todos os filtros disponíveis
  const [filtros, setFiltros] = useState({
    categorias: [],
    tags: [],
    autores: [],
  });

  //STATE que mantém os flows a serem exibidos no feed
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    //Codígo que será executado após a renderização

    async function fetchFiltros() {
      //CONSULTAR API DE FILTROS
      try {
        const response = await axios.get("https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/filtros");
        setFiltros(response.data);
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      }
    }

    //CONSULTAR API DE FLOWS
    async function fetchFlows() {
      try {
        const response = await axios.get("https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow");
        setFlows(response.data);
      } catch (error) {
        console.error("Erro ao buscar flows:", error);
      }
    }

    fetchFiltros();
    fetchFlows();
  }, []);

  return (
    <FeedContainer>
      <FlowFeed>
        <SearchBar />
        <ComponentDivider />
        <ScrollFeed>
          {flows.length > 0 ? (
            flows.map((flow) => <FlowCard flow={flow} />)
          ) : (
            <p>Carregando flows...</p>
          )}
          <ComponentDivider />
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
    </FeedContainer>
  );
}
