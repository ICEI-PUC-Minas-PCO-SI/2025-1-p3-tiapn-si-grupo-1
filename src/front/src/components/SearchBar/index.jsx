import { Search } from "lucide-react";
import { useState } from "react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import debounce from "lodash.debounce";

//31/05 - UPDATES
//- Barra de pesquisa já adicionada
//- valor de busca já mapeado
//- Resta apenas relacionar as pesquisas com os flow criados

export default function SearchBar() {
  const [query, setQuery] = useState("");

  //Função debounce
  const debounceSearch = debounce((value) => {
    onsearch(value); // chama a função que faz a busca
  }, 500); // 500ms de atraso

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debounceSearch(value);
  };

  const fetchFlows = async (query) => {
    const response = await fetch(
      `/api/flows?search=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setFlows(data); // Atualiza os flows exibidos
  };

  return (
    <Form onSearch={fetchFlows}>
      <InputWrapper>
        <IconWrapper>
          <Search size={20} />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Buscar Flow por título, tag ou autor..."
          value={query}
          onChange={handleChange}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
