import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
`;

// Seção
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Título da seção
export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333333;
  font-family: 'Poppins', sans-serif;
`;

// Mensagem de incentivo
export const IncentiveMessage = styled.p`
  font-size: 0.95rem;
  color: #565656;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`;

// Botão de criar flow
export const CreateFlowButton = styled.button`
  background: linear-gradient(90deg, #233dff, #4a6eff);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(35, 61, 255, 0.3);
  }
`;

// Lista de usuários
export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

// Card de usuário
export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  width: 80px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Avatar do usuário
export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #233dff;
  color: #233dff;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

// Nome do usuário
export const UserName = styled.span`
  font-size: 0.75rem;
  color: #333333;
  text-align: center;
  margin-top: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Botão "Ver mais"
export const ViewMoreButton = styled.button`
  background: #ffffff;
  color: #233dff;
  border: 1px solid #233dff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #233dff;
    color: #ffffff;
  }
`;

// Seção do logo
export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  img {
    max-width: 60%;
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