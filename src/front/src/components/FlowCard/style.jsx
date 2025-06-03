import styled from "styled-components";
import { Ellipsis } from "lucide-react";

//Flow Wrapper - Envolve o contéudo do FlowCard
export const FlowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ededed;
  padding: 20px;
  position: relative;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

  /* Border radius customizado */
  border-top-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const FlowHat = styled.div`
  min-width: 200px;
  width: 20%;
  height: 20px;
  background-color: #233dff;
  position: absolute;
  top: -20px;
  left: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

// FlowHeader - Cabeçalho do FlowCard
export const FlowHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 4px;
`;

//FlowAuthor - Autor do FlowCard
export const FlowAuthor = styled.span`
  color: #565656;
  font-weight: 400;
  font-size: 16px;
`;

//FlowCategory - Categoria do FlowCard
export const FlowCategory = styled.span`
  font-size: 16px;
  color: #565656;
  font-weight: 600;
`;

//DaysPublished - tempo desde a publicação do FlowCard
export const DaysPublished = styled.span`
  font-size: 12px;
  color: #565656;
  font-weight: 400;
`;

//ActionButton - Botão de ação do FlowCard
//06/03 - O botão ainda não tem funcionalidades definidas, falta desevolver o que ele deve fazer
export const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  color: #565656;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;
  margin-left: auto; // empurra para o final do flex container

  &:hover {
    background-color: #d9d9d9;
  }
`;

//ActionIcon - Ícone de ação do FlowCard
export const ActionIcon = styled(Ellipsis)`
  width: 16px;
  height: 16px;
  background-image: url("path/to/ellipsis-icon.svg"); // Substitua pelo caminho do seu ícone
  background-size: cover;
`;

//AVATAR - placeholder para a foto de perfil do usuário
export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #d9d9d9;
  color: #fff;
  font-weight: 400;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//FlowPreviewWapper - Envolve o preview do FlowCard
export const FlowPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

//FlowFooter - Rodapé do FlowCard
export const FlowFooter = styled.footer`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

//
