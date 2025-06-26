import styled from 'styled-components';

export const PostCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  position: relative; /* Para posicionar o botão de edição */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #233dff;
    outline-offset: 2px;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    color: #233dff;
    background: #233dff1a;
  }

  &:focus {
    outline: 2px solid #233dff;
    outline-offset: 2px;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const AuthorName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
`;

export const AuthorRole = styled.span`
  font-size: 0.75rem;
  color: #666666;
`;

export const PostContent = styled.div`
  margin-bottom: 1rem;
`;

export const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.5rem;
`;

export const PostText = styled.p`
  font-size: 0.875rem;
  color: #565656;
  line-height: 1.5;
`;

export const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const Tag = styled.span`
  background: #f0f0f0;
  color: #333333;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const PostFooter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #666666;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    color: #233dff;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#233dff' : '#666666')};
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    color: #233dff;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #d32f2f;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    color: #b71c1c;
  }
`;