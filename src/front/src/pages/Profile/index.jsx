import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import { ArrowLeft, Users, Calendar, Edit, Share2, Zap, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlowCard from '../../components/FlowCard';
import {CommunityPost} from '../../components/CommunityPost';
import { useFlowStore } from '../../store/flowStore';

// Configurar axios com URL base
axios.defaults.baseURL = 'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    flowsCreated: 0,
    postsCreated: 0,
    commentsCount: 0,
    likesReceived: 0,
    viewsTotal: 0,
  });

  // Usar FlowStore
  const { flows, fetchFlows, loading } = useFlowStore();

  // Configurar interceptor para token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      console.log('Interceptor - Configurando header Authorization:', token ? `Bearer ${token}` : 'Nenhum token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (err) => Promise.reject(err)
  );

  // Função para obter iniciais do nome
  const getIniciais = (nome) => {
    if (!nome) return '??';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  };

  // Função para calcular "tempo atrás"
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Data desconhecida';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return 'Hoje';
    if (diffInDays < 7) return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) > 1 ? 's' : ''} atrás`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} mês${Math.floor(diffInDays / 30) > 1 ? 'es' : ''} atrás`;
    return `${Math.floor(diffInDays / 365)} ano${Math.floor(diffInDays / 365) > 1 ? 's' : ''} atrás`;
  };

  // Buscar dados
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      console.log('Token encontrado:', token);
      if (!token) {
        console.log('Nenhum token encontrado, definindo erro.');
        setError('Você precisa estar logado.');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Buscando dados do usuário em /api/Usuario/me');
        const userResponse = await axios.get('/Usuario/me');
        console.log('Resposta do usuário:', userResponse.data);
        setUser(userResponse.data);
        const userId = userResponse.data.id;

        console.log('Buscando flows do usuário:', userId);
        await fetchFlows({ usuarioId: userId });
        console.log('Flows do FlowStore:', flows);

        console.log('Buscando posts do usuário:', userId);
        const postsResponse = await axios.get('/PostagemComunidade', {
          params: { criado_por: userId },
        });
        console.log('Resposta dos posts:', postsResponse.data);
        const mappedPosts = postsResponse.data
          .filter((post) => post.criado_por === userId)
          .map((post) => ({
            id: post.id || '',
            title: post.titulo || 'Sem título',
            content: post.conteudo || 'Sem conteúdo',
            author: {
              name: post.usuario?.nome || userResponse.data.nome || 'Usuário',
              initials: getIniciais(post.usuario?.nome || userResponse.data.nome || 'Usuário'),
              role: userResponse.data.cargo || 'Membro',
              reputation: 0,
              id: userId,
            },
            type: post.tipo || 'Discussão',
            category: post.categoria || 'Geral',
            tags: Array.isArray(post.tags) ? post.tags : [],
            upvotes: Number(post.upvotes) || 0,
            downvotes: Number(post.downvotes) || 0,
            comments: Array.isArray(post.comentarios) ? post.comentarios.length : 0,
            createdAt: formatTimeAgo(post.criado_em),
            createdAtRaw: post.criado_em || '',
            hasFlow: post.tipo === 'Flow Compartilhado' || post.tipo === 'Showcase',
            flowId: post.id,
            isUpvoted: false,
            isDownvoted: false,
            isSaved: false,
          }))
          .sort((a, b) => new Date(b.createdAtRaw) - new Date(a.createdAtRaw))
          .slice(0, 1); // Limitar a 1 post
        console.log('Posts mapeados após filtragem:', mappedPosts);
        setPosts(mappedPosts);

        // Filtrar flows por usuário
        const userFlows = flows.filter((flow) => flow.criado_por === userId);
        console.log('Flows filtrados para o usuário:', userFlows);

        const commentsCount = mappedPosts.reduce((sum, post) => sum + post.comments, 0);
        const likesReceived =
          mappedPosts.reduce((sum, post) => sum + post.upvotes, 0) +
          userFlows.reduce((sum, flow) => sum + (flow.stats?.likes || 0), 0);
        const viewsTotal =
          mappedPosts.reduce((sum, post) => sum + (post.views || 0), 0) +
          userFlows.reduce((sum, flow) => sum + (flow.stats?.views || 0), 0);
        setStats({
          flowsCreated: userFlows.length,
          postsCreated: mappedPosts.length,
          commentsCount,
          likesReceived,
          viewsTotal,
        });
        console.log('Estatísticas calculadas:', {
          flowsCreated: userFlows.length,
          postsCreated: mappedPosts.length,
          commentsCount,
          likesReceived,
          viewsTotal,
        });
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        console.log('Status da resposta:', err.response?.status);
        console.log('Dados do erro:', err.response?.data);
        setError(err.response?.data?.erro || 'Erro ao carregar dados.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchFlows]);

  // Manipular votação
  const handleVote = (postId, type) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (type === 'up') {
            if (post.isUpvoted) {
              return { ...post, upvotes: post.upvotes - 1, isUpvoted: false };
            }
            return {
              ...post,
              upvotes: post.upvotes + 1,
              downvotes: post.isDownvoted ? post.downvotes - 1 : post.downvotes,
              isUpvoted: true,
              isDownvoted: false,
            };
          }
          if (post.isDownvoted) {
            return { ...post, downvotes: post.downvotes - 1, isDownvoted: false };
          }
          return {
            ...post,
            downvotes: post.downvotes + 1,
            upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes,
            isDownvoted: true,
            isUpvoted: false,
          };
        }
        return post;
      })
    );
  };

  // Manipular salvar
  const handleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post))
    );
    toast.success(posts.find((p) => p.id === postId)?.isSaved ? 'Post removido dos salvos!' : 'Post salvo!');
  };

  // Manipular edição de perfil
  const handleEditProfile = () => {
    toast.info('Funcionalidade de edição em desenvolvimento!');
  };

  // Manipular compartilhamento
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link do perfil copiado!');
  };

  if (error) {
    return (
      <S.ErrorMessage>
        {error}
        <br />
        <button onClick={() => window.location.assign('/login')}>
          Ir para Login
        </button>
      </S.ErrorMessage>
    );
  }

  if (isLoading || !user || loading) {
    return <S.LoadingMessage>Carregando...</S.LoadingMessage>;
  }

  // Filtrar flows por usuário para exibição
  const userFlows = flows.filter((flow) => flow.criado_por === user.id);
  console.log('Flows para renderização:', userFlows);

  return (
    <S.Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <S.Header>
        <S.HeaderContent>
          <S.LeftSection>
            <S.BackButton onClick={() => navigate(-1)}>
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

      <S.Main>
        <S.ProfileGrid>
          <S.Sidebar>
            <S.ProfileCard>
              <S.ProfileContent>
                <S.AvatarContainer>
                  <S.AvatarFallback>{getIniciais(user.nome)}</S.AvatarFallback>
                </S.AvatarContainer>
                <S.ProfileInfo>
                  <S.ProfileName>{user.nome}</S.ProfileName>
                  <S.ProfileEmail>{user.email}</S.ProfileEmail>
                  <S.ProfileDetails>
                    {user.cargo && (
                      <S.Detail>
                        <Users size={14} /> {user.cargo}
                      </S.Detail>
                    )}
                    {user.empresa && (
                      <S.Detail>
                        <Users size={14} /> {user.empresa}
                      </S.Detail>
                    )}
                    <S.Detail>
                      <Calendar size={14} /> Membro desde {formatTimeAgo(user.criado_em)}
                    </S.Detail>
                    {user.descricao && <S.Bio>{user.descricao}</S.Bio>}
                  </S.ProfileDetails>
                  <S.ProfileActions>
                    <S.EditButton onClick={handleEditProfile}>
                      <Edit size={16} /> Editar Perfil
                    </S.EditButton>
                    <S.ShareButton onClick={handleShare}>
                      <Share2 size={16} /> Compartilhar
                    </S.ShareButton>
                  </S.ProfileActions>
                </S.ProfileInfo>
              </S.ProfileContent>
            </S.ProfileCard>
            <S.StatsCard>
              <S.StatsHeader>Estatísticas</S.StatsHeader>
              <S.StatsGrid>
                <S.StatItem>
                  <S.StatValue>{stats.flowsCreated}</S.StatValue>
                  <S.StatLabel>Flows Criados</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatValue>{stats.postsCreated}</S.StatValue>
                  <S.StatLabel>Posts</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatValue>{stats.commentsCount}</S.StatValue>
                  <S.StatLabel>Comentários</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatValue>{stats.likesReceived}</S.StatValue>
                  <S.StatLabel>Likes Recebidos</S.StatLabel>
                </S.StatItem>
              </S.StatsGrid>
            </S.StatsCard>
          </S.Sidebar>

          <S.Content>
            <S.TabsContainer>
              <S.TabsList>
                <S.TabsTrigger $isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                  Visão Geral
                </S.TabsTrigger>
                <S.TabsTrigger $isActive={activeTab === 'flows'} onClick={() => setActiveTab('flows')}>
                  Flows ({stats.flowsCreated})
                </S.TabsTrigger>
                <S.TabsTrigger $isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
                  Posts ({stats.postsCreated})
                </S.TabsTrigger>
              </S.TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <S.TabsContent>
                    {activeTab === 'overview' && (
                      <>
                        <S.Section>
                          <S.SectionHeader>
                            <Zap size={18} /> Meus Flows
                          </S.SectionHeader>
                          {userFlows.length > 0 ? (
                            userFlows.slice(0, 2).map((flow) => {
                              console.log('Renderizando FlowCard com flow:', flow);
                              return <FlowCard key={flow.id} flow={flow} userID={user.id} />;
                            })
                          ) : (
                            <S.EmptyMessage>Nenhum flow criado ainda.</S.EmptyMessage>
                          )}
                        </S.Section>
                        <S.Section>
                          <S.SectionHeader>
                            <MessageCircle size={18} /> Meus Posts
                          </S.SectionHeader>
                          {posts.length > 0 ? (
                            posts.slice(0, 2).map((post) => (
                              <CommunityPost
                                key={post.id}
                                post={post}
                                onVote={handleVote}
                                onSave={handleSave}
                                currentUserId={user.id}
                              />
                            ))
                          ) : (
                            <S.EmptyMessage>Nenhum post criado ainda.</S.EmptyMessage>
                          )}
                        </S.Section>
                      </>
                    )}
                    {activeTab === 'flows' && (
                      <>
                        {userFlows.length > 0 ? (
                          userFlows.map((flow) => {
                            console.log('Renderizando FlowCard com flow:', flow);
                            return (
                              <motion.div
                                key={flow.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FlowCard flow={flow} userID={user.id} />
                              </motion.div>
                            );
                          })
                        ) : (
                          <S.EmptyMessage>Nenhum flow criado ainda.</S.EmptyMessage>
                        )}
                      </>
                    )}
                    {activeTab === 'posts' && (
                      <>
                        {posts.length > 0 ? (
                          posts.map((post) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CommunityPost
                                post={post}
                                onVote={handleVote}
                                onSave={handleSave}
                                currentUserId={user.id}
                              />
                            </motion.div>
                          ))
                        ) : (
                          <S.EmptyMessage>Nenhum post criado ainda.</S.EmptyMessage>
                        )}
                      </>
                    )}
                  </S.TabsContent>
                </motion.div>
              </AnimatePresence>
            </S.TabsContainer>
          </S.Content>
        </S.ProfileGrid>
      </S.Main>
    </S.Container>
  );
};

export default Profile;