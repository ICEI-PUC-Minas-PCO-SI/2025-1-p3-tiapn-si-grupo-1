import { Ellipsis, GitBranch, Eye, Heart, MessageCircle } from "lucide-react";
import styled from "styled-components";

export const FlowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #dee2ff;
  padding: 24px;
  gap: 16px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #f5f6ff;
  }
`;

export const FlowHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorInfo = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

//AVATAR - placeholder para a foto de perfil do usuário
export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #233dff;
  color: #233dff;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("path/to/ellipsis-icon.svg"); // Substitua pelo caminho do seu ícone
`;

//FlowAuthor - Autor do FlowCard
export const FlowAuthor = styled.span`
  color: #656566;
  font-weight: 400;
  font-size: 14px;
`;

export const FlowCategory = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: default;
  padding: 3px 12px;
  border-radius: 10px;
  background-color: #dee2ff;
  color: #233dff;
  text-transform: capitalize;
`;

export const FlowBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FlowTitle = styled.h2`
  font-size: 18px;
`;

export const FlowDescription = styled.p`
  font-size: 12px;
  color: #66768c;
`;

export const FlowTags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

//FlowTag
export const Tag = styled.span`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 2px 10px;
  border-radius: 15px;
  background-color: #fff;
  color: #66768c;
  border: 1px solid #dee2ff;
  font-weight: 600;
`;

export const FlowFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlowInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const Info = styled.span`
  display: flex;
  align-items: center;
  color: #656665;
  font-size: 12px;
  gap: 6px;
`;

export const NodeIcon = styled(GitBranch)``;
export const EyeIcon = styled(Eye)``;
export const HeartIcon = styled(Heart)``;
export const CommentIcon = styled(MessageCircle)``;
