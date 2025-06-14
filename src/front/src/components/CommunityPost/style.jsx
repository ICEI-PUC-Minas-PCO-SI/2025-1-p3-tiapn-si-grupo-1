import styled from 'styled-components';

export const PostCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

export const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.5rem;
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
`;

export const Tag = styled.span`
  background: #f0f0f0;
  color: #333333;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const VoteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${({ active }) => (active ? '#233dff' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  border: 1px solid #e5e5e5;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #233dff;
    color: #ffffff;
  }
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  border: 1px solid #e5e5e5;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  color: #333333;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #f0f0f0;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ active }) => (active ? '#233dff' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  border: 1px solid #e5e5e5;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #233dff;
    color: #ffffff;
  }
`;