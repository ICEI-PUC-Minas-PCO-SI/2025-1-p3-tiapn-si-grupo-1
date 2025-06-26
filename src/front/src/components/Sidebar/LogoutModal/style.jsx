import styled from "styled-components";
import { Power } from "lucide-react";

// Modal box
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f5f6ff;
  padding: 20px;
  gap: 12px;
`;

// Header
export const ModalHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

// Title
export const ModalTitle = styled.h2`
  font-size: 20px;
  color: #111827;
`;

// Body
export const ModalBody = styled.div`
  margin-top: 16px;
  color: #374151;
`;

// Footer
export const ModalFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

// Buttons
export const ModalButton = styled.button`
  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : "#ef4444"};
  color: ${({ variant }) => (variant === "outline" ? "#374151" : "#fff")};
  border: ${({ variant }) =>
    variant === "outline" ? "1px solid #d1d5db" : "none"};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${({ variant }) =>
      variant === "outline" ? "#f3f4f6" : "#dc2626"};
  }
`;

// Close (X) Button
export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  right: 20px;
  border: none;
  background-color: transparent;
  margin-left: 24px;

  &:hover {
    svg {
      stroke: #233dff;
    }
  }
`;

//Log out Icon
export const LogOutIcon = styled(Power)`
  stroke: #233dff;
`;
