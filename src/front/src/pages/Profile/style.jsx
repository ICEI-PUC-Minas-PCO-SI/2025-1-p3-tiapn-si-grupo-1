import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 16px 32px;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #233dff;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #1e33cc;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

export const Main = styled.main`
  flex: 1;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProfileCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #233dff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarFallback = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
`;

export const ProfileInfo = styled.div`
  text-align: center;
`;

export const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const ProfileEmail = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;

export const ProfileDetails = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

export const ProfileActions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 12px;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #233dff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #1e33cc;
  }
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  color: #233dff;
  border: 1px solid #233dff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f0f2ff;
  }
`;

export const StatsCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatsHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #233dff;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 24px;
  position: relative;
  z-index: 1; /* Garante que as abas fiquem acima do conteúdo */
`;

export const TabsTrigger = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$isActive ? '#233dff' : '#666')};
  background: none;
  border: none;
  border-bottom: ${(props) => (props.$isActive ? '2px solid #233dff' : 'none')};
  cursor: pointer;
  &:hover {
    color: #1e33cc;
  }
`;

export const TabsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px; /* Adiciona espaço entre TabsList e conteúdo */
`;

export const Section = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px; /* Espaço entre elementos internos (header e FlowCard) */
`;

export const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px; /* Espaço abaixo do header */
`;

export const EmptyMessage = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 16px;
`;

export const ErrorMessage = styled.div`
  font-size: 16px;
  color: #e74c3c;
  text-align: center;
  margin-top: 100px;
  button {
    margin-top: 16px;
    padding: 8px 16px;
    background: #233dff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: #1e33cc;
    }
  }
`;

export const LoadingMessage = styled.div`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 100px;
`;

export const FlowCardWrapper = styled.div`
  position: relative;
  margin-top: 16px;
  z-index: 0;
  padding-top: 16px;;
`;
