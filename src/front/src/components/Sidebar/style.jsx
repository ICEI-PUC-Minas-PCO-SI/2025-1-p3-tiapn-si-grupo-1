import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: 60px;
  background-color: ${(props) => props.theme.colors.sidebar};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm} 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
`;

export const Logo = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
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
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  text-decoration: none;
  background-color: ${(props) =>
    props.active ? props.theme.colors.backgroundblue : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

export const LogoutButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.textLight};
  margin-top: auto;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000000000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  font-family: "Inter", sans-serif;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
  font-family: "Inter", sans-serif;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: ${({ variant }) =>
    variant === "outline" ? "1px solid #e5e7eb" : "none"};
  background: ${({ variant }) => (variant === "outline" ? "none" : "#233DFF")};
  color: ${({ variant }) => (variant === "outline" ? "#374151" : "#fff")};
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ variant }) =>
      variant === "outline" ? "#f3f4f6" : "#1e3a8a"};
    border-color: ${({ variant }) =>
      variant === "outline" ? "#d1d5db" : "none"};
  }
`;
