import React from "react";
import styled from "styled-components";

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
  border: 1px solid #233dff;
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
export const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  color: #565656;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto; // empurra para o final do flex container
`;

// FlowTitle - Título do FlowCard

//AVATAR - placeholder para a foto de perfil do usuário
export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #233dff;
  color: #233dff;
  font-weight: 400;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//
