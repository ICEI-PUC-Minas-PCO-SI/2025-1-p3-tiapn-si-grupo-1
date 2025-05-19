import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  width: 60px;
  background-color: ${props => props.theme.colors.sidebar};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
`;

export const Logo = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const NavItem = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  background-color: ${props => props.active ? props.theme.colors.backgroundblue : 'transparent'};
  
  
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ddd;
  overflow: hidden;
  margin-top: auto;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;