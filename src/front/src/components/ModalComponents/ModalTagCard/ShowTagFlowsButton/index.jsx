import { Button, ArrowIcon } from "./style";
import { useFlowStore } from "../../../../store/flowStore";
import { useUIStore } from "../../../../store/uiStore";

export default function ShowTagFlowsButton({ tag }) {
  // Atualiza a categoria do feed principal para a tag clicada
  const setCategory = useFlowStore((state) => state.setCategory);
  // Atualiza a lista de flows da página principal com base na tag
  const setSearchTerm = useFlowStore((state) => state.setSearchTerm);
  // Fecha o modal de busca
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);

  const handleClick = () => {
    setCategory(""); // limpa a categoria para evitar conflitos
    setSearchTerm(tag); // atualiza o feed principal com a tag clicada
    closeSearchModal(); // fecha o modal
  };

  return (
    <Button onClick={handleClick}>
      Ver flows <ArrowIcon />
    </Button>
  );
}
