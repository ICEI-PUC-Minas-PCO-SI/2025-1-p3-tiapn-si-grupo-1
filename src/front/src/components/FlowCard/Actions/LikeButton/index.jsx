import { Button, LikeIcon } from "./style";

export default function LikeButton({ likes }) {
  return (
    <Button>
      <LikeIcon />
      {likes}
    </Button>
  );
}