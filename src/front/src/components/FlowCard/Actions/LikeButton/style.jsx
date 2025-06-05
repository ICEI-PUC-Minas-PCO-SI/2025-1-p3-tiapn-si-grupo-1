import styled from "styled-components";
import { Heart } from "lucide-react";

export const Button = styled.button`
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 4px 12px;
  border-radius: 24px;
  background-color: #f5f5f5;
  border: 2px solid transparent;
  color: #565656;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    svg {
      fill: #233dff;
      color: #233dff;
    }
  }
`;

export const LikeIcon = styled(Heart)`
  width: 16px;
  height: 16px;
  color: #565656;
  fill: #565656;
  transition: all 0.3s ease-in;
`;
