import { Button, ArrowIcon } from "./style";
import { useFlowStore } from "../../../../store/flowStore";
import { useUIStore } from "../../../../store/uiStore";

export default function ShowTagFlowsButton({ tag }) {
  const searchByTag = useFlowStore((state) => state.searchByTag);
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);

  const handleClick = async () => {
    await searchByTag(tag);
    closeSearchModal();
  };

  return (
    <Button onClick={handleClick}>
      Ver flows <ArrowIcon />
    </Button>
  );
}
