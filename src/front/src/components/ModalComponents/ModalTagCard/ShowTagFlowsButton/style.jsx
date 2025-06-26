import { ArrowRight } from "lucide-react";
import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 5px;
  color: #fff;
  background-color: #233dff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: rgba(35, 61, 255, 0.8);
    svg {
      color: #fff;
    }
  }
`;

export const ArrowIcon = styled(ArrowRight)`
  color: #fff;
  transition: all 0.4s ease-in-out;
  width: 16px;
  height: 16px;
`;
