import { useEffect, useState } from "react";
import ComponentDivider from "../../components/ComponentDivider/Index";
import SearchBar from "../../components/SearchBar";
import FilterMenu from "../../components/FilterOptions";
import {
  FeedContainer,
  FlowFeed,
  FeedFilters,
  ScrollFeed,
  FilterHeader,
  FilterIcon,
  FilterTitle,
} from "./style";
import axios from "axios";

export default function Feed() {
  const [filtros, setFiltros] = useState({
    categorias: [],
    tags: [],
    autores: [],
  });

  const [flows, setFlows] = useState([]);

  useEffect(() => {
    async function fetchFiltros() {
      console.log("Desgraça");
      try {
        const response = await axios.get("http://localhost:3000/api/filtros");
        setFiltros(response.data);
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      }
    }

    async function fetchFlows() {
      try {
        const response = await axios.get("http://localhost:3000/api/flow");
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
            flows.map((flow) => (
              <div
                key={flow.id}
                style={{ padding: "20px", border: "1px solid #ccc" }}
              >
                <h4>{flow.titulo}</h4>
                <p>{flow.descricao}</p>
                <p>
                  <strong>Categoria:</strong> {flow.categoria}
                </p>
                <p>
                  <strong>Autor:</strong> {flow.usuario?.nome || "Desconhecido"}
                </p>
              </div>
            ))
          ) : (
            <p>Carregando flows...</p>
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
    </FeedContainer>
  );
}
