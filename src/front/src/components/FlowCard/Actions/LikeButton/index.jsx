import { useState } from "react";
import { Heart } from "lucide-react";
import { ActionButton } from "./styles";

export default function LikeButton({ initialLiked = false, onLike }) {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    setLiked(!liked);
    if (onLike) onLike(!liked);
  };

  return (
    <ActionButton onClick={toggleLike} liked={liked}>
      <Heart color={liked ? "red" : "gray"} />
    </ActionButton>
  );
}
