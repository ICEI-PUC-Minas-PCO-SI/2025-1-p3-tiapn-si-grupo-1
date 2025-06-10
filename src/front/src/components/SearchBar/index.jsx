import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import debounce from "lodash/debounce";
import { useState, useEffect, useMemo } from "react";

//31/05 - UPDATES
//- Barra de pesquisa já adicionada
//- valor de busca já mapeado
//- Resta apenas relacionar as pesquisas com os flow criados

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const [query, setQuery] = useState("");

  // Função debounced apenas para a busca
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 0),
    [setSearchTerm]
  );

  // Sempre que o usuário digita, atualiza localmente e dispara o debounce
  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel(); // limpeza
  }, [query, debouncedSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value); // resposta instantânea no input
  };
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputWrapper>
        <IconWrapper>
          <Search size={20} />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Buscar Flow por título, tag ou autor..."
          value={searchTerm}
          onChange={handleChange}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
