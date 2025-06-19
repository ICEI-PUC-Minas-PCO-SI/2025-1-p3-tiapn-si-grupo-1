import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import { useFlowStore } from "../../store/flowStore";
import { useUIStore } from "../../store/uiStore";
import { useUserStore } from "../../store/userStore";
import { useEffect } from "react";

export default function ModalSearchBar({ activeOption }) {
  const openSearchModal = useUIStore((state) => state.openSearchModal);
  const modalSearchTerm = useFlowStore((state) => state.modalSearchTerm);
  const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);
  const filterUsers = useUserStore((state) => state.filterUsers);

  // Estado local para o input, atualizado instantaneamente
  const [localSearch, setLocalSearch] = useState(modalSearchTerm);

  // Zera o campo quando o componente monta (ex: troca de aba com key)
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
        }
        // Se quiser, adicione para "tags" também aqui
      }, 300),
    [activeOption, setModalSearchTerm, filterUsers]
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
