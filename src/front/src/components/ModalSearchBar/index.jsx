import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import { useFlowStore } from "../../store/flowStore";
import { useUIStore } from "../../store/uiStore";
import { useUserStore } from "../../store/userStore";
import { useEffect } from "react";
import { useFiltroStore } from "../../store/filterStore";

export default function ModalSearchBar({ activeOption }) {
  // Termo de busca do modal para os flows, obtido do estado global
  const modalSearchTerm = useFlowStore((state) => state.modalSearchTerm);
  const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);

  // Estado local para o input, atualizado instantaneamente
  const [localSearch, setLocalSearch] = useState(modalSearchTerm);

  // Estado que controla a abertura do modal de busca
  const openSearchModal = useUIStore((state) => state.openSearchModal);

  // Funções para filtrar usuários e tags, obtidas do estado global
  const filterUsers = useUserStore((state) => state.filterUsers);
  const filterTags = useFiltroStore((state) => state.filterTags);

  // Zera o campo quando o componente monta
  useEffect(() => {
    setLocalSearch("");
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (activeOption === "flows") {
          setModalSearchTerm(value);
        } else if (activeOption === "usuarios") {
          filterUsers(value);
        } else if (activeOption === "tags") {
          filterTags(value);
        }
      }, 300),
    [activeOption, setModalSearchTerm, filterUsers, filterTags]
  );

  // Função debounced para atualizar o estado global
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  // Executa busca ao trocar de aba, reaproveitando o texto atual
  useEffect(() => {
    if (localSearch.trim() !== "") {
      if (activeOption === "flows") {
        setModalSearchTerm(localSearch);
      } else if (activeOption === "usuarios") {
        filterUsers(localSearch);
      } else if (activeOption === "tags") {
        filterTags(localSearch);
      }
    }
  }, [activeOption]);

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
          onFocus={openSearchModal}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
