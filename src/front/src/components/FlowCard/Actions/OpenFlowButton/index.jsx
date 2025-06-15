import { Button, ShareIcon } from "./style";
import { useNavigate } from "react-router-dom";

export default function OpenFlowButton({ flowID }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/flow/${flowID}`);
  };

  return (
    <Button onClick={handleClick}>
      {"Explorar"}
      <ShareIcon></ShareIcon>
    </Button>
  );
}
