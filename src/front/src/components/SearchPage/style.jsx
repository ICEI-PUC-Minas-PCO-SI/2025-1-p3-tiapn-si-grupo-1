import styled from "styled-components";
import { X } from "lucide-react";

//Modal
export const SearchModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  //max-width: 600px;
  width: 750px;
  display: flex;
  flex-direction: column;
  height: 350px; //temporário
  border: 1px solid #f5f6ff;
`;

//Header
export const ModalHeader = styled.header`
  width: 100%;
  border-bottom: 2px solid #f5f6ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  position: relative;
`;

//Close Button
export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  border: none;
  background-color: transparent;

  &:hover {
    svg {
      stroke: #233dff;
    }
  }
`;

//Close Icon
export const CloseIcon = styled(X)`
  stroke: #66768c;
`;

//Body do modal - local onde serão exibidos os flows de acordo com a pesquisa
export const ModalBody = styled.div``;
