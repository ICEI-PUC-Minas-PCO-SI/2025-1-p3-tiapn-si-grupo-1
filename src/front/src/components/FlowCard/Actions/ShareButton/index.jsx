import { Button, ShareIcon } from "./style";
import { toast } from "sonner";

export default function ShareButton({ flowID }) {
  const handleShare = () => {
    const url = `http://localhost:5173/flow/${flowID}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copiado!");
      })
      .catch(() => {
        toast.error("Erro ao copiar o link.");
      });
  };

  return (
    <Button onClick={handleShare} title="Compartilhar">
      <ShareIcon />
    </Button>
  );
}
