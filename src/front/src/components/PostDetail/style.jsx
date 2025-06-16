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

export const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
`;

export const AuthorRole = styled.span`
  font-size: 0.875rem;
  color: #565656;
`;

export const PostContent = styled.div`
  margin-bottom: 1rem;
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
  margin-bottom: 0.75rem;
`;

export const Tag = styled.span`
  background: #f0f0f0;
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
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #ffffff;
  color: #333333;
  cursor: pointer;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background: #f0f0f0;
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  background: #ffffff;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background: #fff1f0;
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;