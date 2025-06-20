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

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  cursor: default;
`;

export const AuthorName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #333333;
`;

export const AuthorRole = styled.span`
  font-size: 0.875rem;
  color: #565656;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PostText = styled.p`
  font-size: 1rem;
  color: #333333;
  margin-bottom: 0.75rem;
  line-height: 1.5;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Tag = styled.div`
  background: #e8e8e8;
  color: #333333;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #565656;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: #233dff;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background: #1e33cc;
  }

  &:disabled {
    background: #555555;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  background: #ff4d4f;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;

  &:hover:disabled {
    background: #cc0000;
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;