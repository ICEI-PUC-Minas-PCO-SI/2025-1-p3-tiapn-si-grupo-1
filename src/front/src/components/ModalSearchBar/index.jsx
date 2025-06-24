import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import { useFlowStore } from "../../store/flowStore";
import { useUserStore } from "../../store/userStore";
import { useFiltroStore } from "../../store/filterStore";

export default function ModalSearchBar() {
  // Termo de busca do modal para os flows, obtido do estado global
  const modalSearchTerm = useFlowStore((state) => state.modalSearchTerm);
  const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);

  // Estado local para o input, atualizado instantaneamente
  const [localSearch, setLocalSearch] = useState(modalSearchTerm);

  // Funções para filtrar usuários e tags, obtidas do estado global
  const filterUsers = useUserStore((state) => state.filterUsers);
  const filterTags = useFiltroStore((state) => state.filterTags);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setModalSearchTerm(value);
        filterUsers(value);
        filterTags(value);
      }, 300),
    [setModalSearchTerm, filterUsers, filterTags]
  );

  // Função debounced para atualizar o estado global
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputWrapper>
        <IconWrapper>
          <Search size={20} style={{ marginLeft: "5px" }} />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Buscar Flow por título, tag ou autor..."
          value={localSearch} // valor controlado
          onChange={handleChange}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
