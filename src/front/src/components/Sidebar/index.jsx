import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDownUp, Plus, Users, User, LogOut, X } from "lucide-react";
import { SidebarContainer, Logo, NavItem, LogoutButton, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalButton, CloseButton } from "./style";
import logoImage from "../../../assets/kf-logo.png";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirmar Saída</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} color="#374151" />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <p>Tem certeza que deseja sair?</p>
        </ModalBody>
        <ModalFooter>
          <ModalButton variant="outline" onClick={onClose}>
            Cancelar
          </ModalButton>
          <ModalButton onClick={onConfirm}>Sair</ModalButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    localStorage.removeItem('usuarioId'); // Remove o usuarioId
    navigate('/login'); // Redireciona para login
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src={logoImage || "/placeholder.svg"} alt="KnowFlow Logo" />
      </Logo>
      <NavItem
        to="/criar-flow"
        active={location.pathname === "/criar-flow" ? 1 : 0}
      >
        <Plus size={20} />
      </NavItem>
      <NavItem to="/feed" active={location.pathname === "/feed" ? 1 : 0}>
        <ArrowDownUp size={20} />
      </NavItem>
      <NavItem
        to="/comunidade"
        active={location.pathname === "/comunidade" ? 1 : 0}
      >
        <Users size={20} />
      </NavItem>
      <NavItem to="/perfil" active={location.pathname === "/perfil" ? 1 : 0}>
        <User size={20} />
      </NavItem>
      <LogoutButton onClick={() => setIsModalOpen(true)}>
        <LogOut size={20} />
      </LogoutButton>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </SidebarContainer>
  );
};

export default Sidebar;