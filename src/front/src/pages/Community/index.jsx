import React, { useState, useEffect } from 'react';
import * as S from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { CommunityPost } from '../../components/CommunityPost';
import { CreatePostForm } from '../../components/CreatePostForm';
import { postTypes, categories } from '../../data/mockPosts';
import { TrendingUp, Clock, MessageCircle, Plus, Filter, X, FilterIcon, AlertCircle } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

// Página principal da comunidade
export const Community = () => {
  // Estados para controle da interface
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('hot');
  const [posts, setPosts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Carregar posts da API ao montar o componente
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade'
        );
        // Mapear posts da API para o formato esperado
        const mappedPosts = response.data.map((post) => ({
          id: post.id,
          title: post.titulo,
          content: post.conteudo,
          author: {
            name: post.author?.name || 'Usuário Desconhecido',
            avatar: post.author?.avatar || '/placeholder.svg?height=40&width=40',
            role: post.author?.role || 'Membro',
            reputation: post.author?.reputation || 0,
          },
          type: post.tipo || 'Discussão',
          category: post.categoria || 'Geral',
          tags: post.tags || [],
          upvotes: post.upvotes || 0,
          downvotes: post.downvotes || 0,
          comments: post.comments || 0,
          createdAt: new Date(post.criado_em).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          hasFlow: post.tipo === 'Flow Compartilhado' || post.tipo === 'Showcase',
          flowId: post.id,
          isUpvoted: false,
          isDownvoted: false,
          isSaved: false,
        }));
        setPosts(mappedPosts);
      } catch (err) {
        setError('Erro ao carregar os posts. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Função para adicionar um novo post à lista
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Função para manipular votação (upvote/downvote)
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
      }),
    );
  };

  // Função para salvar/desalvar post
  const handleSave = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)));
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setSelectedType('Todos');
    setSelectedCategory('Todos');
  };

  // Verifica se há filtros ativos
  const hasActiveFilters = selectedType !== 'Todos' || selectedCategory !== 'Todos';

  // Filtra posts com base no tipo e categoria selecionados
  const filteredPosts = posts.filter((post) => {
    const matchesType = selectedType === 'Todos' || post.type === selectedType;
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  // Ordena posts com base no critério selecionado
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'new':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
                {(selectedType !== 'Todos' ? 1 : 0) + (selectedCategory !== 'Todos' ? 1 : 0)}
              </S.Badge>
            )}
          </S.FilterButton>
          <S.CreatePostButton onClick={() => setShowCreatePost(true)}>
            <Plus size={16} />
            Criar Post
          </S.CreatePostButton>
        </S.ButtonGroup>
      </S.CommunityHeader>
      <SearchBar />
      <S.ContentRow>
        <S.MainContent>
          <S.ContentWrapper>
            {/* Painel de filtros */}
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
                        {postTypes.map((type) => (
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
                        {categories.map((category) => (
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

            {/* Estado de carregamento ou erro */}
            {isLoading && <S.Loading>Carregando posts...</S.Loading>}
            {error && (
              <S.ErrorMessage>
                <AlertCircle size={16} />
                {error}
              </S.ErrorMessage>
            )}

            {!isLoading && !error && (
              <>
                {/* Ordenação */}
                <S.SortSection>
                  <S.Tabs>
                    <S.TabButton active={sortBy === 'hot'} onClick={() => setSortBy('hot')}>
                      <TrendingUp size={16} />
                      Em Alta
                    </S.TabButton>
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

                {/* Lista de posts */}
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
                        <CommunityPost post={post} onVote={handleVote} onSave={handleSave} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </S.PostList>

                {/* Mensagem para quando não há posts */}
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
          <S.FilterHeaderCommunity>
            <S.FilterTitleCommunity>
              <FilterIcon />
              Filtros
            </S.FilterTitleCommunity>
          </S.FilterHeaderCommunity>
        </S.CommunityFilters>
      </S.ContentRow>
      {/* Modal de criar post */}
      {showCreatePost && (
        <CreatePostForm
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </S.Container>
  );
};