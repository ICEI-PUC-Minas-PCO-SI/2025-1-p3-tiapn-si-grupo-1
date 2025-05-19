import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDownUp, Plus, Users, User } from 'lucide-react';
import { SidebarContainer, Logo, NavItem, UserAvatar } from './style';
import logoImage from '../../../public/assets/kf-logo.png'; // Ajuste o caminho conforme necessário

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <SidebarContainer>
      <Logo>
        <img src={logoImage || "/placeholder.svg"} alt="KnowFlow Logo" />
      </Logo>
      <NavItem to="/criar-flow" active={location.pathname === '/criar-flow' ? 1 : 0}>
        <Plus size={20} />
      </NavItem>
      <NavItem to="/compartilhados" active={location.pathname === '/compartilhados' ? 1 : 0}>
        <ArrowDownUp size={20} />
      </NavItem>
      <NavItem to="/compartilhados" active={location.pathname === '/compartilhados' ? 1 : 0}>
        <Users size={20} />
      </NavItem>
      <NavItem to="/compartilhados" active={location.pathname === '/compartilhados' ? 1 : 0}>
        <User size={20} />
      </NavItem>
      <UserAvatar>
        <img src="/placeholder-user.jpg" alt="Avatar do usuário" />
      </UserAvatar>
    </SidebarContainer>
  );
};

export default Sidebar;