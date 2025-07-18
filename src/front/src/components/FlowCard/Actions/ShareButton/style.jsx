import styled from "styled-components";
import { Share2 } from "lucide-react";

export const Button = styled.button`
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 12px 12px;
  border-radius: 5px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #f5f5f5;
    svg {
      color: #233dff;
    }
  }
`;

export const ShareIcon = styled(Share2)`
  width: 16px;
  height: 16px;
  color: #565656;
  transition: all 0.3s ease-in;
`;
