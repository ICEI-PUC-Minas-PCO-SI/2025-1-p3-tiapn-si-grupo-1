import React, { useState, useEffect } from 'react';
import * as S from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { CommunityPost } from '../../components/CommunityPost';
import { CreatePostForm } from '../../components/CreatePostForm';
import { SearchBarCommunity } from '../../components/SearchBarCommunity';
import { postTypes, categories } from '../../data/mockPosts';
import { 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Plus, 
  Filter, 
  X, 
  AlertCircle 
} from 'lucide-react';
import axios from 'axios';
import { FiltrosComunidade } from '../../components/FiltrosComunidade';

// Página principal da comunidade
export const Community = () => {
  // Estados para controle da interface
  const [mostrarCriarPostagem, setMostrarCriarPostagem] = useState(false);
  const [selectedType, setSelectedType] = useState(''); // Ajustado para '' em vez de 'Todos'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [posts, setPosts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userNamesCache, setUserNamesCache] = useState({});
  const [postToEdit, setPostToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Função para obter as iniciais do nome
  const getIniciais = (nome) => {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();
  };

  // Obter ID do usuário autenticado e lista de usuários
  useEffect(() => {
    const fetchUserDataAndUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Usuário não autenticado. Faça login.');
        setIsLoading(false);
        return;
      }

      try {
        const userResponse = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario/me',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCurrentUserId(userResponse.data.id);

        const usersResponse = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userNamesMap = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.nome || 'Usuário Desconhecido';
          return acc;
        }, {});
        setUserNamesCache(userNamesMap);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao carregar dados do usuário ou lista de usuários.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDataAndUsers();
  }, []);

  // Função para buscar o nome do usuário pelo ID (usando cache)
  const fetchUserName = (userId) => {
    if (!userId) return 'Usuário Desconhecido';
    return userNamesCache[userId] || 'Usuário Desconhecido';
  };

  // Função para mapear posts da API para o formato do front-end
  const mapPostFromApi = async (post) => {
    const userName = fetchUserName(post.criado_por);
    let mappedType = post.tipo || 'Discussão';
    if (!['Discussão', 'Solicitação', 'Dúvida'].includes(post.tipo)) {
      mappedType = 'Dúvida';
    }
    return {
      id: post.id,
      title: post.titulo,
      content: post.conteudo,
      author: {
        name: userName,
        initials: getIniciais(userName),
        role: post.author?.role || 'Membro',
        reputation: post.author?.reputation || 0,
        id: post.criado_por || null,
      },
      type: mappedType,
      category: post.categoria || 'Geral',
      tags: post.tags || [],
      upvotes: post.upvotes || 0,
      downvotes: post.downvotes || 0,
      comments: post.comentarios?.length || 0,
      createdAt: new Date(post.criado_em).toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      createdAtRaw: post.criado_em,
      hasFlow: mappedType === 'Solicitação' || mappedType === 'Dúvida',
      flowId: post.id,
      isUpvoted: false,
      isDownvoted: false,
      isSaved: false,
    };
  };

  // Carregar posts da API
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade'
        );
        const mappedPosts = await Promise.all(response.data.map(mapPostFromApi));
        setPosts(mappedPosts);
      } catch (err) {
        setError('Erro ao carregar os posts. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [userNamesCache]);

  // Funções de manipulação de posts
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const handleVote = (postId, type) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (type === 'up') {
            if (post.isUpvoted) {
              return { ...post, upvotes: post.upvotes - 1, isUpvoted: false };
            } else {
              return {
                ...post,
                upvotes: post.upvotes + 1,
                downvotes: post.isDownvoted ? post.downvotes - 1 : post.downvotes,
                isUpvoted: true,
                isDownvoted: false,
              };
            }
          } else {
            if (post.isDownvoted) {
              return { ...post, downvotes: post.downvotes - 1, isDownvoted: false };
            } else {
              return {
                ...post,
                downvotes: post.downvotes + 1,
                upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes,
                isDownvoted: true,
                isUpvoted: false,
              };
            }
          }
        }
        return post;
      })
    );
  };

  const handleSave = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)));
  };

  const handleDeletePost = async (postId, authorId) => {
    if (authorId !== currentUserId) {
      setError('Você só pode deletar seus próprios posts.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado. Faça login para deletar o post.');
      return;
    }
    try {
      await axios.delete(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError('Erro ao deletar o post. Verifique sua permissão ou tente novamente.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        setError('Sessão expirada. Faça login novamente.');
      }
    }
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setIsEditing(true);
    setMostrarCriarPostagem(true);
  };

  const clearFilters = () => {
    setSelectedType('');
    setSelectedCategory('');
  };

  const hasActiveFilters = selectedType !== '' || selectedCategory !== '';

  const filteredPosts = posts.filter((post) => {
    const matchesType = selectedType === '' || post.type === selectedType;
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    const matchesSearch = searchTerm
      ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'new':
        return new Date(b.createdAtRaw).getTime() - new Date(a.createdAtRaw).getTime();
      case 'top':
        return b.comments - a.comments;
      case 'hot':
      default:
        const scoreA = a.upvotes - a.downvotes + a.comments * 0.5;
        const scoreB = b.upvotes - b.downvotes + b.comments * 0.5;
        return scoreB - scoreA;
    }
  });

  return (
    <S.Container>
      <S.CommunityHeader>
        <div>
          <S.Title>Comunidade KnowFlow</S.Title>
          <S.Subtitle>Compartilhe conhecimento, tire dúvidas e colabore com a comunidade</S.Subtitle>
          <SearchBarCommunity searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <S.ButtonGroup>
          <S.FilterButton
            active={hasActiveFilters || showFilters}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filtros
            {hasActiveFilters && (
              <S.Badge>
                {(selectedType !== '' ? 1 : 0) + (selectedCategory !== '' ? 1 : 0)}
              </S.Badge>
            )}
          </S.FilterButton>
          <S.CreatePostButton onClick={() => setMostrarCriarPostagem(true)}>
            <Plus size={16} />
            Criar Post
          </S.CreatePostButton>
        </S.ButtonGroup>
      </S.CommunityHeader>
      <S.ContentRow>
        <S.MainContent>
          <S.ContentWrapper>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <S.FilterCard>
                    <S.FilterHeader>
                      <h3>Filtrar Posts</h3>
                      {hasActiveFilters && (
                        <S.ClearFiltersButton onClick={clearFilters}>
                          <X size={16} />
                          Limpar Filtros
                        </S.ClearFiltersButton>
                      )}
                    </S.FilterHeader>
                    <S.FilterSection>
                      <S.FilterLabel>Tipo de Post</S.FilterLabel>
                      <S.FilterOptions>
                        <S.FilterBadge
                          key="Todos"
                          active={selectedType === ''}
                          onClick={() => setSelectedType('')}
                        >
                          Todos
                        </S.FilterBadge>
                        {postTypes.slice(1).map((type) => (
                          <S.FilterBadge
                            key={type}
                            active={selectedType === type}
                            onClick={() => setSelectedType(type)}
                          >
                            {type}
                          </S.FilterBadge>
                        ))}
                      </S.FilterOptions>
                    </S.FilterSection>
                    <S.FilterSection>
                      <S.FilterLabel>Categoria</S.FilterLabel>
                      <S.FilterOptions>
                        <S.FilterBadge
                          key="Todos"
                          active={selectedCategory === ''}
                          onClick={() => setSelectedCategory('')}
                        >
                          Todos
                        </S.FilterBadge>
                        {categories.slice(1).map((category) => (
                          <S.FilterBadge
                            key={category}
                            active={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </S.FilterBadge>
                        ))}
                      </S.FilterOptions>
                    </S.FilterSection>
                  </S.FilterCard>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && <S.Loading>Carregando posts...</S.Loading>}
            {error && (
              <S.ErrorMessage>
                <AlertCircle size={16} />
                {error}
              </S.ErrorMessage>
            )}

            {!isLoading && !error && (
              <>
                <S.SortSection>
                  <S.Tabs>
                    <S.TabButton active={sortBy === 'new'} onClick={() => setSortBy('new')}>
                      <Clock size={16} />
                      Mais Recentes
                    </S.TabButton>
                    <S.TabButton active={sortBy === 'top'} onClick={() => setSortBy('top')}>
                      <MessageCircle size={16} />
                      Mais Comentados
                    </S.TabButton>
                  </S.Tabs>
                  <S.PostCount>
                    {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}
                    {hasActiveFilters && ' (filtrado)'}
                  </S.PostCount>
                </S.SortSection>

                <S.PostList>
                  <AnimatePresence mode="popLayout">
                    {sortedPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CommunityPost
                          post={post}
                          onVote={handleVote}
                          onSave={handleSave}
                          onDelete={() => handleDeletePost(post.id, post.author.id)}
                          onEdit={handleEditPost}
                          currentUserId={currentUserId}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </S.PostList>

                {sortedPosts.length === 0 && (
                  <S.EmptyState>
                    <S.EmptyIconWrapper>
                      <MessageCircle size={32} />
                    </S.EmptyIconWrapper>
                    <S.EmptyTitle>Nenhum post encontrado</S.EmptyTitle>
                    <S.EmptyText>
                      {hasActiveFilters
                        ? 'Tente ajustar seus filtros ou seja o primeiro a postar nesta categoria!'
                        : 'Seja o primeiro a iniciar uma discussão!'}
                    </S.EmptyText>
                    {hasActiveFilters && (
                      <S.ClearFiltersButton onClick={clearFilters}>
                        <X size={16} />
                        Limpar Filtros
                      </S.ClearFiltersButton>
                    )}
                  </S.EmptyState>
                )}
              </>
            )}
          </S.ContentWrapper>
        </S.MainContent>
        <S.CommunityFilters>
          <FiltrosComunidade />
        </S.CommunityFilters>
      </S.ContentRow>
      {mostrarCriarPostagem && (
        <CreatePostForm
          onClose={() => {
            setMostrarCriarPostagem(false);
            setIsEditing(false);
            setPostToEdit(null);
          }}
          onPostCreated={handlePostCreated}
          onPostUpdated={handlePostUpdated}
          postToEdit={postToEdit}
          isEditing={isEditing}
          currentUserId={currentUserId}
        />
      )}
    </S.Container>
  );
};

export default Community;