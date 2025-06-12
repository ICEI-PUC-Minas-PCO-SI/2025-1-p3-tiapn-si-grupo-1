import styled from "styled-components";
import { Bookmark } from "lucide-react";

export const Button = styled.button`
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 12px 12px;
  border-radius: 5px;
  background-color: #fff;
  border: none;
  color: #565656;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #f5f5f5;
    svg {
      color: #233dff;
    }
  }
`;

export const SaveIcon = styled(Bookmark)`
  width: 16px;
  height: 16px;
  color: #565656;
  transition: all 0.3s ease-in;
`;
