import React from "react";
import { SidebarContainer, Logo, Nav, NavItem, Avatar } from "./style";
import { Plus, Workflow, Users, User, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <SidebarContainer>
            <Logo src="../../assets/kf-logo.png" alt="KnowFlow" />

            <Nav>
                <NavItem onClick={() => navigate("/criar-flow")} className={isActive("/criar-flow") ? "active" : ""}>
                    <Plus size={20} />
                </NavItem>
                <NavItem onClick={() => navigate("/")} className={isActive("/") ? "active" : ""}>
                    <Workflow size={20} />
                </NavItem>
                <NavItem onClick={() => navigate("/comunidade")} className={isActive("/comunidade") ? "active" : ""}>
                    <Users size={20} />
                </NavItem>
                <NavItem onClick={() => navigate("/perfil")} className={isActive("/perfil") ? "active" : ""}>
                    <User size={20} />
                </NavItem>
            </Nav>

            <div className="bottom">
                <NavItem>
                    <LogOut size={20} />
                    <span>Sair</span>
                </NavItem>
                <Avatar src="https://i.pravatar.cc/40" alt="avatar" />
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;
