import { Button, SaveIcon } from "./style";

export default function SaveButton({ saves }) {
  return (
    <Button>
      <SaveIcon />
      {saves}
    </Button>
  );
}