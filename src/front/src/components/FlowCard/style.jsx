import styled from "styled-components";
import { Ellipsis } from "lucide-react";

export const FlowCardContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

//Flow Wrapper - Envolve o contéudo do FlowCard
export const FlowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 2px solid #e4e6eb;
  padding: 20px;
  position: relative;
  cursor: pointer;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Border radius customizado */
  border-top-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  //Efeito de transição
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-color: #dee2ff;
  }

  &:hover h2 {
    color: #233dff;
  }
`;

export const FlowHat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 40px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #233dff;
  border: 2px solid #233dff;
  position: absolute;
  top: -40px;
  left: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

// FlowHeader - Cabeçalho do FlowCard
export const FlowHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 12px;
`;

//FlowAuthor - Autor do FlowCard
export const FlowAuthor = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 14px;
`;

//AuthorRole
export const AuthorRole = styled.span`
  font-size: 11px;
  color: #565656;
`;

//AuthorInfo
export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlowDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #565656;
`;

//FlowTitle
export const FlowTitle = styled.h2`
  font-size: 18px;
  color: #000;
`;

//FlowDescription
export const FlowDescription = styled.p`
  font-size: 12px;
`;

//FlowTags
export const FlowTags = styled.div`
  border: 1px solid red;
`;

//FlowCategory - Categoria do FlowCard
export const FlowCategory = styled.span`
  font-size: 16px;
  color: #565656;
  font-weight: 600;
`;

//DaysPublished - tempo desde a publicação do FlowCard
export const DaysPublished = styled.span`
  font-size: 11px;
  color: #565656;
  font-weight: 400;
`;

//ActionButton - Botão de ação do FlowCard
//06/03 - O botão ainda não tem funcionalidades definidas, falta desevolver o que ele deve fazer
export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;
  background-color: #ffff;
  margin-left: auto; // empurra para o final do flex container

  &:hover {
    background-color: #ededed;
  }
`;

//ActionIcon - Ícone de ação do FlowCard
export const ActionIcon = styled(Ellipsis)`
  width: 16px;
  height: 16px;
  color: #333;
`;

//AVATAR - placeholder para a foto de perfil do usuário
export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("path/to/ellipsis-icon.svg"); // Substitua pelo caminho do seu ícone
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
  gap: 10px;
  margin-top: 20px;
`;
