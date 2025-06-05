import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

// Dados mock para flows, flows salvos e atividade (mantidos até integração com backend)
const mockUserFlows = [
  {
    id: 1,
    title: "Processo de Onboarding",
    description: "Guia interativo para novos desenvolvedores",
    likes: 142,
    comments: 23,
    shares: 8,
    views: 1240,
    createdAt: "2024-01-15",
    tags: ["onboarding", "desenvolvimento"],
    status: "published",
    thumbnail: "/placeholder.svg",
  },
];

const mockSavedFlows = [
  {
    id: 4,
    title: "Metodologia de Vendas B2B",
    author: "Carlos Santos",
    authorAvatar: "/placeholder.svg",
    likes: 234,
    views: 1890,
    tags: ["vendas", "b2b"],
    savedAt: "2024-01-14",
  },
];

const mockCommunityActivity = [
  {
    id: 1,
    type: "answer",
    title: "Como implementar autenticação JWT?",
    content: "Recomendo usar a biblioteca @auth0/nextjs-auth0...",
    votes: 15,
    createdAt: "2024-01-16",
    isAccepted: true,
  },
];

// Componente principal da página de perfil
const Profile = () => {
  // Estado para controle da aba ativa
  const [activeTab, setActiveTab] = useState('flows');
  // Estado para dados do usuário
  const [user, setUser] = useState(null);
  // Estado para erros
  const [error, setError] = useState(null);

  // Função para buscar dados do usuário logado
  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Você precisa estar logado para acessar esta página.');
      return;
    }

    try {
      const response = await axios.get('https://layerg-knowflow.pxipv3.easypanel.host/api/usuario/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.erro || 'Erro ao buscar dados do usuário.';
      setError(errorMessage);
      localStorage.removeItem('token'); // Remove token inválido
    }
  };

  // Busca dados do usuário ao montar o componente
  useEffect(() => {
    fetchUser();
  }, []);

  // Função para formatar data
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Exibe mensagem de erro ou loading se necessário
  if (error) {
    // Redireciona para login em caso de erro de autenticação
    window.location.assign('/login');
    return null;
  }

  if (!user) {
    return <S.LoadingMessage>Carregando...</S.LoadingMessage>;
  }

  return (
    <S.Container>
      {/* Cabeçalho */}
      <S.Header>
        <S.HeaderContent>
          <S.LeftSection>
            <S.BackButton onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Voltar
            </S.BackButton>
            <div>
              <S.Title>Perfil</S.Title>
              <S.Subtitle>Veja suas informações e atividades</S.Subtitle>
            </div>
          </S.LeftSection>
        </S.HeaderContent>
      </S.Header>

      {/* Conteúdo principal */}
      <S.Main>
        {/* Cabeçalho do perfil */}
        <S.ProfileCard>
          <S.ProfileContent>
            <S.AvatarContainer>
              <S.AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.nome} />
            </S.AvatarContainer>
            <S.ProfileInfo>
              <S.ProfileName>{user.nome}</S.ProfileName>
              <S.ProfileEmail>{user.email}</S.ProfileEmail>
              <S.ProfileDetails>
                <S.Detail>
                  Membro desde {formatTimeAgo(user.criado_em)}
                </S.Detail>
              </S.ProfileDetails>
            </S.ProfileInfo>
          </S.ProfileContent>
        </S.ProfileCard>

        {/* Abas de conteúdo */}
        <S.TabsContainer>
          <S.TabsList>
            <S.TabsTrigger active={activeTab === 'flows'} onClick={() => setActiveTab('flows')}>
              Meus Flows
            </S.TabsTrigger>
            <S.TabsTrigger active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>
              Salvos
            </S.TabsTrigger>
            <S.TabsTrigger active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>
              Atividade
            </S.TabsTrigger>
            <S.TabsTrigger active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')}>
              Em Breve
            </S.TabsTrigger>
          </S.TabsList>

          {/* Meus Flows */}
          {activeTab === 'flows' && (
            <S.TabsContent>
              {mockUserFlows.map((flow) => (
                <S.FlowCard key={flow.id}>
                  <S.FlowThumbnail src={flow.thumbnail} alt={flow.title} />
                  <S.FlowInfo>
                    <S.FlowTitle>{flow.title}</S.FlowTitle>
                    <S.FlowDescription>{flow.description}</S.FlowDescription>
                    <S.FlowTags>
                      {flow.tags.map((tag) => (
                        <S.Badge key={tag}>#{tag}</S.Badge>
                      ))}
                    </S.FlowTags>
                    <S.FlowStats>
                      <S.Stat>
                        <Heart size={16} />
                        {flow.likes}
                      </S.Stat>
                      <S.Stat>
                        <MessageCircle size={16} />
                        {flow.comments}
                      </S.Stat>
                      <S.Stat>
                        <Share2 size={16} />
                        {flow.shares}
                      </S.Stat>
                      <S.Stat>
                        <Eye size={16} />
                        {flow.views}
                      </S.Stat>
                      <S.FlowDate>{formatTimeAgo(flow.createdAt)}</S.FlowDate>
                    </S.FlowStats>
                  </S.FlowInfo>
                  <S.Badge variant={flow.status === 'published' ? 'default' : 'secondary'}>
                    {flow.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </S.Badge>
                </S.FlowCard>
              ))}
            </S.TabsContent>
          )}

          {/* Flows Salvos */}
          {activeTab === 'saved' && (
            <S.TabsContent>
              {mockSavedFlows.map((flow) => (
                <S.FlowCard key={flow.id}>
                  <S.FlowInfo>
                    <S.FlowTitle>{flow.title}</S.FlowTitle>
                    <S.FlowAuthor>por {flow.author}</S.FlowAuthor>
                    <S.FlowTags>
                      {flow.tags.map((tag) => (
                        <S.Badge key={tag}>#{tag}</S.Badge>
                      ))}
                    </S.FlowTags>
                    <S.FlowStats>
                      <S.Stat>
                        <Heart size={16} />
                        {flow.likes}
                      </S.Stat>
                      <S.Stat>
                        <Eye size={16} />
                        {flow.views}
                      </S.Stat>
                      <S.FlowDate>Salvo em {formatTimeAgo(flow.savedAt)}</S.FlowDate>
                    </S.FlowStats>
                  </S.FlowInfo>
                </S.FlowCard>
              ))}
            </S.TabsContent>
          )}

          {/* Atividade */}
          {activeTab === 'activity' && (
            <S.TabsContent>
              {mockCommunityActivity.map((activity) => (
                <S.ActivityCard key={activity.id}>
                  <S.ActivityVotes>
                    <S.VotesCount>{activity.votes}</S.VotesCount>
                    <S.VotesLabel>votos</S.VotesLabel>
                  </S.ActivityVotes>
                  <S.ActivityInfo>
                    <S.ActivityHeader>
                      <S.Badge variant={activity.type === 'answer' ? 'default' : 'outline'}>
                        {activity.type === 'answer' ? 'Resposta' : 'Pergunta'}
                      </S.Badge>
                      {activity.isAccepted && (
                        <S.Badge variant="success">Aceita</S.Badge>
                      )}
                    </S.ActivityHeader>
                    <S.ActivityTitle>{activity.title}</S.ActivityTitle>
                    <S.ActivityContent>{activity.content}</S.ActivityContent>
                    <S.ActivityDate>{formatTimeAgo(activity.createdAt)}</S.ActivityDate>
                  </S.ActivityInfo>
                </S.ActivityCard>
              ))}
            </S.TabsContent>
          )}

          {/* Aviso de funcionalidades futuras */}
          {activeTab === 'upcoming' && (
            <S.TabsContent>
              <S.UpcomingCard>
                <S.UpcomingTitle>Em Breve, Novas Funcionalidades!</S.UpcomingTitle>
                <S.UpcomingDescription>
                  Estamos trabalhando em novidades como conquistas, níveis e análises detalhadas para tornar sua experiência ainda melhor.
                </S.UpcomingDescription>
              </S.UpcomingCard>
            </S.TabsContent>
          )}
        </S.TabsContainer>
      </S.Main>
    </S.Container>
  );
};

export default Profile;