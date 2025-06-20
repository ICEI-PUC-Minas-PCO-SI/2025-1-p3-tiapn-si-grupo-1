import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
`;

// Seção
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Título da seção
export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
`;

// Mensagem de incentivo
export const IncentiveMessage = styled.p`
  font-size: 0.875rem;
  color: #565656;
  line-height: 1.5;
`;

// Botão de criar flow
export const CreateFlowButton = styled.button`
  background: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1e33cc;
  }
`;

// Lista de usuários
export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

// Avatar do usuário
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
  cursor: default;
`;

// Seção do logo
export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  img {
    max-width: 50%;
    height: auto;
  }
  a {
    display: flex;
    justify-content: center;
  }
`;

// Seção de rodapé
export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

// Links do rodapé
export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #565656;

  a {
    color: #565656;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #233dff;
    }
  }

  span {
    color: #565656;
  }
`;

// Texto de direitos autorais
export const Copyright = styled.p`
  font-size: 0.75rem;
  color: #565656;
  text-align: center;
`;