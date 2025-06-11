import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333333;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333333;
  padding: 0.25rem;

  &:hover {
    color: #233dff;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #233dff;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  background: #ffffff;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #233dff;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #233dff;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#233dff' : '#ffffff')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#333333')};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${({ primary }) => (primary ? '#1e33cc' : '#f0f0f0')};
  }
`;