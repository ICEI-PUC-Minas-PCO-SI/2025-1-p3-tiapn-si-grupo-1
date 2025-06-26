import { useLocation } from "react-router-dom";
import { ArrowDownUp, Plus, Users, User, LogOut } from "lucide-react";

import { SidebarContainer, Logo, NavItem, LogoutButton } from "./style";

//Sotre de UI para controlar a visibilidade do Modal de logout
import { useUIStore } from "../../store/uiStore";
import logoImage from "../../../assets/kf-logo.png";
import LogoutModal from "../../components/Sidebar/LogoutModal"; // ajuste o caminho conforme sua estrutura

const Sidebar = () => {
  const location = useLocation();

  const { openLogoutModal } = useUIStore();

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

      <LogoutButton onClick={openLogoutModal}>
        <LogOut size={20} />
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
