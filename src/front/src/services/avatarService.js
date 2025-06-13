import styled from 'styled-components';

export const getIniciais = (nome) => {
  if (!nome) return '';
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();
};

export const InitialsAvatar = styled.div`
  width: 44px; /* Mesmo tamanho do Avatar no style.jsx */
  height: 44px;
  border-radius: 50%;
  background-color: #233dff;
  color: #fff;
  font-weight: 500;
  font-size: 16px; /* Aumentado para melhor legibilidade */
  display: flex;
  align-items: center;
  justify-content: center;
`;