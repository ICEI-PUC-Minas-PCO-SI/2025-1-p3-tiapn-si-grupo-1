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
  width: 750px;
  height: 550px;
  display: flex;
  flex-direction: column;
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
export const ModalBody = styled.div`
  width: 100%;
  padding: 16px;
`;

//Lista que tem os diferentes tipos de busca
export const SearchOptionsList = styled.div`
  display: inline-flex;
  background-color: #f5f6ff;
  padding: 6px;
  gap: 4px;
  border-radius: 5px;
`;

//Titulos de busca
export const SearchOption = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  color: #66768c;
  border: none;
  border-radius: 5px;
  background-color: transparent;

  background: ${({ isActive }) => (isActive ? "#233dff" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#66768c")};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
`;

//Container que armazenará os flows no modal
export const ModalFlowsContainer = styled.div`
  max-height: 400px; // Ou height: 100%, ou height: 60vh
  overflow-y: auto;
  padding: 10px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  // Estiliza a barra de rolagem no Chrome/Safari
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 8px;
  }
`;
