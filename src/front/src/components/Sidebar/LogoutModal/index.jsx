import React from "react";
import { X } from "lucide-react";
import {
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalButton,
  CloseButton,
  LogOutIcon,
} from "./style";

import { useUIStore } from "../../../store/uiStore";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const navigate = useNavigate();
  const { closeLogoutModal } = useUIStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    navigate("/login");
    closeLogoutModal(); // garantir que o modal feche após logout
  };

  return (
    <ModalContent>
      <ModalHeader>
        <LogOutIcon size={20} />
        <ModalTitle>Finalizar sua sessão</ModalTitle>
        <CloseButton onClick={closeLogoutModal}>
          <X size={24} color="#374151" />
        </CloseButton>
      </ModalHeader>
      <ModalBody>
        <p>Tem certeza que deseja sair?</p>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="outline" onClick={closeLogoutModal}>
          Cancelar
        </ModalButton>
        <ModalButton onClick={handleLogout}>Sair</ModalButton>
      </ModalFooter>
    </ModalContent>
  );
}
