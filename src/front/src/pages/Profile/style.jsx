import styled, { css } from 'styled-components';

// Estilização do contêiner principal
export const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

// Estilização do cabeçalho
export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
`;

// Estilização do conteúdo do cabeçalho
export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Estilização da seção à esquerda do cabeçalho
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Estilização do botão de voltar
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f8fafc;
    border-radius: 4px;
  }
`;

// Estilização do título do cabeçalho
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
`;

// Estilização do subtítulo do cabeçalho
export const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
`;

// Estilização do conteúdo principal
export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

// Estilização do cartão de perfil
export const ProfileCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`;

// Estilização do conteúdo do perfil
export const ProfileContent = styled.div`
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

// Estilização do contêiner do avatar
export const AvatarContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilização da imagem do avatar
export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Estilização das informações do perfil
export const ProfileInfo = styled.div`
  flex: 1;
`;

// Estilização do nome do perfil
export const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
`;

// Estilização do email do perfil
export const ProfileEmail = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-top: 4px;
`;

// Estilização dos detalhes do perfil
export const ProfileDetails = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #64748b;
`;

// Estilização de cada detalhe
export const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Estilização do contêiner de abas
export const TabsContainer = styled.div`
  width: 100%;
`;

// Estilização da lista de abas
export const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #e2e8f0;
`;

// Estilização do trigger de aba
export const TabsTrigger = styled.button`
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#233dff' : '#64748b')};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#233dff' : 'transparent')};
  cursor: pointer;
  &:hover {
    color: #233dff;
  }
`;

// Estilização do conteúdo da aba
export const TabsContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Estilização do cartão de fluxo
export const FlowCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  position: relative;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Estilização da miniatura do fluxo
export const FlowThumbnail = styled.img`
  width: 96px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
`;

// Estilização das informações do fluxo
export const FlowInfo = styled.div`
  flex: 1;
`;

// Estilização do título do fluxo
export const FlowTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  &:hover {
    color: #233dff;
    cursor: pointer;
  }
`;

// Estilização da descrição do fluxo
export const FlowDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
`;

// Estilização do autor do fluxo
export const FlowAuthor = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
`;

// Estilização das tags do fluxo
export const FlowTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

// Estilização das estatísticas do fluxo
export const FlowStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  font-size: 14px;
  color: #64748b;
`;

// Estilização de cada estatística
export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Estilização da data do fluxo
export const FlowDate = styled.div`
  margin-left: auto;
`;

// Estilização do badge
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  ${({ variant }) => {
    switch (variant) {
      case 'default':
        return css`
          background: #233dff;
          color: #fff;
        `;
      case 'secondary':
        return css`
          background: #f1f5f9;
          color: #64748b;
        `;
      case 'success':
        return css`
          background: #22c55e;
          color: #fff;
        `;
      case 'outline':
        return css`
          border: 1px solid #e2e8f0;
          color: #64748b;
        `;
      default:
        return css`
          background: #e2e8f0;
          color: #1e293b;
        `;
    }
  }}
`;

// Estilização do cartão de atividade
export const ActivityCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Estilização dos votos da atividade
export const ActivityVotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

// Estilização da contagem de votos
export const VotesCount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

// Estilização do rótulo de votos
export const VotesLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`;

// Estilização das informações da atividade
export const ActivityInfo = styled.div`
  flex: 1;
`;

// Estilização do cabeçalho da atividade
export const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

// Estilização do título da atividade
export const ActivityTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  &:hover {
    color: #233dff;
    cursor: pointer;
  }
`;

// Estilização do conteúdo da atividade
export const ActivityContent = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Estilização da data da atividade
export const ActivityDate = styled.div`
  font-size: 14px;
  color: #64748b;
`;

// Estilização do cartão de funcionalidades futuras
export const UpcomingCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
`;

// Estilização do título de funcionalidades futuras
export const UpcomingTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
`;

// Estilização da descrição de funcionalidades futuras
export const UpcomingDescription = styled.p`
  font-size: 14px;
  color: #64748b;
`;

// Estilização da mensagem de erro
export const ErrorMessage = styled.div`
  font-size: 16px;
  color: #e74c3c;
  text-align: center;
  margin-top: 100px;
`;

// Estilização da mensagem de carregamento
export const LoadingMessage = styled.div`
  font-size: 16px;
  color: #64748b;
  text-align: center;
  margin-top: 100px;
`;