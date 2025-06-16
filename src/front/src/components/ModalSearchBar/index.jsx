import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import { useFlowStore } from "../../store/flowStore";
import { useUIStore } from "../../store/uiStore";

export default function ModalSearchBar() {
  const openSearchModal = useUIStore((state) => state.openSearchModal);
  const modalSearchTerm = useFlowStore((state) => state.modalSearchTerm);
  const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);

  // Estado local para o input, atualizado instantaneamente
  const [localSearch, setLocalSearch] = useState(modalSearchTerm);

  // Função debounced para atualizar o estado global
  const debouncedSearch = useMemo(
    () => debounce(setModalSearchTerm, 300),
    [setModalSearchTerm]
  );

  // Handler do input, atualiza local e dispara debounce
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
          onFocus={openSearchModal}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
