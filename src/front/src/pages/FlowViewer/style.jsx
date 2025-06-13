import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #FAFAFA;
`;

export const ToastOverride = styled.div`
  .Toastify__toast--success {
    background: #233DFF;
    color: #fff;
    font-family: 'Inter', sans-serif;
    border-radius: 8px;
  }
`;

export const Header = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
`;

export const TitleWrapper = styled.div`
  flex: 1;
  margin: 0 16px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ $compact }) => ($compact ? '6px 8px' : '8px 16px')};
  border: 1px solid ${({ $variant, $active }) =>
    $variant === 'like' && $active ? '#ef4444' :
      $variant === 'save' && $active ? '#233DFF' :
        '#e5e7eb'};
  background: ${({ $variant, $active }) =>
    $variant === 'like' && $active ? '#ef4444' :
      $variant === 'save' && $active ? '#233DFF' :
        'none'};
  color: ${({ $variant, $active }) =>
    ($variant === 'like' && $active) || ($variant === 'save' && $active) ? '#fff' :
      '#374151'};
  border-radius: 6px;
  font-size: ${({ $compact }) => ($compact ? '12px' : '14px')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ $variant, $active }) =>
    $variant === 'like' && !$active ? '#fef2f2' :
      $variant === 'comment' ? '#eff6ff' :
        $variant === 'save' && !$active ? '#eff6ff' :
          $variant === 'share' ? '#f0fdf4' :
            $variant === 'commentLike' ? '#eff6ff' :
              $variant === 'commentReply' ? '#f3f4f6' :
                $variant === 'commentFlag' ? '#fef2f2' :
                  $variant === 'commentEdit' ? '#fff7ed' :
                    $variant === 'commentDelete' ? '#fef2f2' : '#f3f4f6'};
    border-color: ${({ $variant }) =>
    $variant === 'like' ? '#f87171' :
      $variant === 'comment' ? '#3b82f6' :
        $variant === 'save' ? '#233DFF' :
          $variant === 'share' ? '#22c55e' :
            $variant === 'commentLike' ? '#3b82f6' :
              $variant === 'commentReply' ? '#6b7280' :
                $variant === 'commentFlag' ? '#ef4444' :
                  $variant === 'commentEdit' ? '#fb923c' :
                    $variant === 'commentDelete' ? '#ef4444' : '#d1d5db'};
  }
`;

export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 0px 24px 0px; 
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const FlowSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: solid 1px rgba(229, 231, 235, 0.5);
`;

export const CardHeader = styled.div`
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.8);
`;

export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const CardContent = styled.div`
  padding: 10px 24px 24px 24px;
`;

export const Canvas = styled.div`
  height: 700px;
  border-radius: 8px;
  overflow: hidden;
  border: 0 solid rgba(229, 231, 235, 0.5);
`;

export const CommentForm = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #233DFF;
    box-shadow: 0 0 0 2px rgba(35, 61, 255, 0.2);
  }
`;

export const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  flex-wrap: nowrap;
`;

export const CommentsActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
`;

export const CommentHint = styled.p`
  font-size: 12px;
  color: #6b7280;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #233DFF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1e3a8a;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Comment = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const Avatar = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const VerifiedBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 18px;
  height: 18px;
  background: #233DFF;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 2px solid #fff;
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

export const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

export const CommentMeta = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;

  svg {
    color: #6b7280;
  }

  strong {
    font-weight: 600;
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  padding: 4px 12px;
  background: ${({ isCategory }) => (isCategory ? '#EFF6FF' : '#F3F4F6')};
  color: ${({ isCategory }) => (isCategory ? '#233DFF' : '#374151')};
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
`;

export const AuthorCard = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AuthorName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const AuthorRole = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const AuthorCompany = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const AuthorFollowers = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: ${({ $variant }) =>
    $variant === 'delete' ? '#ef4444' :
      $variant === 'outline' ? 'none' : '#233DFF'};
  color: ${({ $variant }) =>
    $variant === 'outline' ? '#374151' : '#fff'};
  border: ${({ $variant }) =>
    $variant === 'outline' ? '1px solid #e5e7eb' :
      $variant === 'delete' ? 'none' : 'none'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $variant }) =>
    $variant === 'delete' ? '#dc2626' :
      $variant === 'outline' ? '#f3f4f6' : '#1e3a8a'};
    border-color: ${({ $variant }) =>
    $variant === 'outline' ? '#d1d5db' : 'none'};
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
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
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
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
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
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
`;

export const TextContent = styled.p`
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const DecisionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DecisionQuestion = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  color: #374151;
  &:hover {
    background: #fff7ed;
    border-color: #fb923c;
  }
`;

export const OptionNumber = styled.div`
  width: flex;
  height: 24px;
  background: #fb923c;
  padding: 4px 12px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

export const MediaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MediaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MediaIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(to right, #10b981, #059669);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MediaTitle = styled.div`
  font-size: 18px;
  font-weight: 600;

  color: #333;
`;

export const MediaMeta = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #10b981;
`;

export const MediaDescription = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;

export const MediaActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  height: 100vh;
  font-size: 16px;
  color: #374151;
`;