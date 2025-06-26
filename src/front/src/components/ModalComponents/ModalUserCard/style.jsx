import styled from "styled-components";
import { Mail } from "lucide-react";

export const UserCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const AuthorInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

//AVATAR - placeholder para a foto de perfil do usuário
export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

//FlowAuthor - Autor do FlowCard
export const UserName = styled.span`
  color: #333333;
  font-weight: 600;
  font-size: 14px;
`;

export const UserEmail = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #666666;
`;

export const MailIcon = styled(Mail)`
  stroke: #6c63ff;
  margin-right: 4px;
`;
