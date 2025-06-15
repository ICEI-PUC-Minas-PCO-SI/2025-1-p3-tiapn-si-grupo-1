import { Search } from "lucide-react";
import { Form, Input, IconWrapper, InputWrapper } from "./style";
import { useUIStore } from "../../store/uiStore";

//Searchbar usada apenas para chamar o modal de pesquisa

export default function SearchBar() {
  const openSearchModal = useUIStore((state) => state.openSearchModal);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputWrapper>
        <IconWrapper>
          <Search size={20} />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Buscar Flow por título, tag ou autor..."
          onFocus={openSearchModal}
        ></Input>
      </InputWrapper>
    </Form>
  );
}
