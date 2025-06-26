import { Button, ShareIcon } from "./style";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../../../../store/uiStore"; // ← importe a store

export default function OpenFlowButton({ flowID }) {
  const navigate = useNavigate();
  const closeSearchModal = useUIStore((state) => state.closeSearchModal); // ← acesse a função

  const handleClick = () => {
    closeSearchModal(); // ← fecha o modal e remove o overlay
    navigate(`/flow/${flowID}`); // ← navega após fechar
  };

  return (
    <Button onClick={handleClick}>
      {"Ver Flow"}
      <ShareIcon />
    </Button>
  );
}
