import {
  Header,
  Title,
  CategoriesIcon,
  TagsIcon,
  AuthorIcon,
  FilterWrapper,
  FilterList,
} from "./style";
import { useState } from "react";

//Botão para acionar os filtros 
import Filter from "../Filter";


export default function FilterMenu({ filterType, filtros }) {
  //Define qual o tipo de filtro está sendo disposto na tela
  const type =
    filterType === "Categorias"
      ? "categorias"
      : filterType === "Tags"
      ? "tags"
      : "autores";

  //STATE que gerenncia os filtros que estão ativos na tela
  const [filtrosAtivos, setFiltrosAtivos] = useState([]);

  //Alterna o valor dos filtros ativos
  const toggleFiltro = (valor) => {
    setFiltrosAtivos((prev) =>
      prev.includes(valor)
        ? prev.filter((item) => item !== valor)
        : [...prev, valor]
    );
  };

  return (
    <FilterWrapper>
      <Header>
        <Title>
          {type === "categorias" ? (
            <CategoriesIcon />
          ) : type === "tags" ? (
            <TagsIcon />
          ) : (
            <AuthorIcon />
          )}
          {`${filterType} - ${filtros.length} resultados`}
        </Title>
      </Header>
      <FilterList>
        {Array.isArray(filtros) && filtros.length > 0 ? (
          filtros.map((item, index) => {
            const valor = type === "autores" ? item.nome : item;
            return (
              <Filter
                key={type === "autores" ? item.id || index : index}
                type={type}
                title={valor}
                isActive={filtrosAtivos.includes(valor)}
                onClick={() => toggleFiltro(valor)}
              />
            );
          })
        ) : (
          <p style={{ padding: "8px", color: "#565656" }}>Nenhum resultado</p>
        )}
      </FilterList>
    </FilterWrapper>
  );
}
