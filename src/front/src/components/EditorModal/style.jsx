import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 80px;
  left: 60px;
  right: ${({ $sidebarOpen }) => ($sidebarOpen ? "340px" : "0px")};
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* Transparência elegante */
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  overflow: auto;
`;

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  width: 100%;
  max-width: 860px;
  max-height: calc(100vh - 120px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 12px;
  height: 56px;
`;

export const IconArea = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
`;

export const TitleInput = styled.input`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  border: none;
  background: transparent;
  outline: none;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Actions = styled.div`
  position: relative;

  button {
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    color: #888;

    &:hover {
      color: #000;
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  z-index: 10;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  padding: 10px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const EditorWrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 140px);
`;
