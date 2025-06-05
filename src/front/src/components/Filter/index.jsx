import { Button } from "./style";
import { BadgeCheck } from "lucide-react";

export default function Filter({ title, onClick, isActive }) {
  return (
    <Button $isActive={isActive} onClick={onClick}>
      {isActive && <BadgeCheck size={16} style={{ color: "#233dff" }} />}
      {title}
    </Button>
  );
}
