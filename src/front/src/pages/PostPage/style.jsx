import styled from 'styled-components';

export const ContainerGeral = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

export const PostFilters = styled.aside`
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  height: 100%;
  background-color: #233DFF;
  position: sticky;
  top: 30px;
  margin-top: 65px;
  margin-right: 15px;
  align-self: flex-start;
  border: 1px solid #e5e5e5;
  overflow: hidden; /* Para não vazar para fora do box */

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    z-index: 0; /* Fica atrás do texto */
  }

  &::before {
    top: -40px;
    left: -40px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #3e83fa 0%, #233DFF 60%);
  }

  &::after {
    bottom: -60px;
    right: -60px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #5d95f5 0%, #233DFF 60%);
  }

  /* Os filhos ficam acima dos círculos */
  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  width: 70%;
  padding: 1rem;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #565656;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff4d4f;
`;

export const Breadcrumb = styled.div`
  margin-bottom: 1rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #233dff;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
  &:hover {
    background: #233dff1a;
  }
`;

export const PostCard = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative; /* Para posicionar o botão de edição */
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

export const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9fafb;
  padding: 1rem;
  min-width: 60px;
`;

export const VoteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#f97316' : '#9ca3af')};
  padding: 0.25rem;
  &:hover {
    color: ${(props) => (props.$active ? '#f97316' : '#f97316')};
    background: #f3f4f6;
  }
`;

export const VoteScore = styled.span`
  font-weight: bold;
  color: #333333;
  padding: 0.5rem 0;
`;

export const SaveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#233dff' : '#9ca3af')};
  padding: 0.25rem;
  margin-top: 1rem;
  &:hover {
    color: #233dff;
    background: #f3f4f6;
  }
`;

export const PostContent = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const AuthorAvatar = styled.div`
  width: ${(props) => (props.$depth > 0 ? '32px' : '40px')};
  height: ${(props) => (props.$depth > 0 ? '32px' : '40px')};
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: bold;
  font-size: ${(props) => (props.$depth > 0 ? '14px' : '16px')};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: bold;
  color: #333333;
`;

export const AuthorMeta = styled.span`
  font-size: 0.875rem;
  color: #565656;
`;

export const Badges = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TypeBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: ${(props) => {
    switch (props.type) {
      case 'Discussão':
        return '#e0f2fe';
      case 'Pergunta':
        return '#f0fdf4';
      case 'Flow Compartilhado':
        return '#faf5ff';
      case 'Showcase':
        return '#fefce8';
      case 'Ajuda':
        return '#fef2f2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case 'Discussão':
        return '#0369a1';
      case 'Pergunta':
        return '#15803d';
      case 'Flow Compartilhado':
        return '#7e22ce';
      case 'Showcase':
        return '#a16207';
      case 'Ajuda':
        return '#dc2626';
      default:
        return '#4b5563';
    }
  }};
`;

export const CategoryBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: #f3f4f6;
  color: #4b5563;
`;

export const FlowBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: #233dff1a;
  color: #233dff;
`;

export const PostTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1rem;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: #e5e7eb;
  color: #4b5563;
  &:hover {
    background: #233dff1a;
    color: #233dff;
  }
`;

export const PostBody = styled.div`
  color: #333333;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #565656;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
  &:hover {
    color: #233dff;
    background: #233dff1a;
  }
`;

export const CommentSection = styled.div`
  margin-top: 0px;
`;

export const CommentForm = styled.div`
  display: flex;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
`;

export const Textarea = styled.textarea`
  flex: 1;
  min-height: 80px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.875rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: #233dff;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover:not(:disabled) {
    background: #1e3a8a;
  }
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Comment = styled.div`
  display: flex;
  gap: 1rem;
  background: ${(props) => (props.$depth > 0 ? '#f9fafb' : '#ffffff')};
  border: 1px solid #e5e5e5;
  border-left: ${(props) => (props.$depth > 0 ? '4px solid #233dff' : '1px solid #e5e5e5')};
  border-radius: 8px;
  padding: 1rem;
  margin-left: ${(props) => props.$depth * 3}rem;
  margin-bottom: 1rem;
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

export const CommentMeta = styled.span`
  font-size: ${(props) => (props.$depth > 0 ? '0.8rem' : '0.875rem')};
  color: #565656;
`;

export const CommentText = styled.p`
  font-size: ${(props) => (props.$depth > 0 ? '0.85rem' : '0.875rem')};
  color: #333333;
  line-height: 1.5;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ReplyForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-left: 2rem;
`;

export const ReplyList = styled.div`
  margin-top: 1rem;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333333;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: #f3f4f6;
  }
`;