import { Search } from "lucide-react";
import { useState } from "react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";

//31/05 - UPDATES
//- Barra de pesquisa já adicionada
//- valor de busca já mapeado
//- Resta apenas relacionar as pesquisas com os flow criados

export default function SearchBar() {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <IconWrapper>
          <Search size={20} />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Buscar Flow por título, tag ou autor..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
