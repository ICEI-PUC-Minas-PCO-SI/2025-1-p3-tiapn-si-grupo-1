import { useState } from "react";
import { Button, LikeIcon } from "./style";

export default function LikeButton({ initialLiked = false, onLike }) {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    setLiked(!liked);
    if (onLike) onLike(!liked);
  };

  return (
    <Button onClick={toggleLike} liked={liked}>
      <LikeIcon />
    </Button>
  );
}
