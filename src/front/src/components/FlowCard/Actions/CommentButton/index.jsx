import { MessageCircle } from "lucide-react";
import { Button, CommentIcon } from "./style";

export default function CommentButton({ comments }) {
  return (
    <Button>
      <CommentIcon as={MessageCircle} />
      {comments}
    </Button>
  );
}