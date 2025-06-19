import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as S from './style';
import { ArrowLeft, ChevronUp, ChevronDown, MessageCircle, Bookmark, Share2, Send, Edit, Trash2 } from 'lucide-react';
import { FiltrosComunidade } from '../../components/FiltrosComunidade';

// Função para obter iniciais do nome
const getIniciais = (nome) => {
  if (!nome) return '??';
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

export const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userNamesCache, setUserNamesCache] = useState({});

  // Configurar axios com token
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

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
        // Buscar dados do usuário logado
        const userResponse = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario/me'
        );
        setCurrentUserId(userResponse.data.id);

        // Buscar lista de todos os usuários
        const usersResponse = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario'
        );
        // Criar mapa de IDs para nomes
        const userNamesMap = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.nome || 'Usuário Desconhecido';
          return acc;
        }, {});
        setUserNamesCache(userNamesMap);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Erro ao buscar dados do usuário ou lista de usuários:', err);
        }
        setError('Erro ao carregar dados do usuário.');
      }
    };
    fetchUserDataAndUsers();
  }, []);

  // Função para buscar o nome do usuário pelo ID (usando cache)
  const fetchUserName = (userId) => {
    if (!userId) return 'Usuário Desconhecido';
    return userNamesCache[userId] || 'Usuário Desconhecido';
  };

  // Mapear post da API
  const mapPostFromApi = async (post) => {
    const userName = fetchUserName(post.criado_por);
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
      type: post.tipo || 'Discussão',
      category: post.categoria || 'Geral',
      tags: post.tags || [],
      upvotes: post.upvotes || 0,
      downvotes: post.downvotes || 0,
      comments: post.comments || 0,
      views: post.views || 0,
      createdAt: new Date(post.criado_em).toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      hasFlow: post.tipo === 'Flow Compartilhado' || post.tipo === 'Showcase',
      flowId: post.id,
      isUpvoted: false,
      isDownvoted: false,
      isSaved: false,
    };
  };

  // Mapear comentário da API
  const mapCommentFromApi = async (comment) => {
    const userName = fetchUserName(comment.usuario_id);
    return {
      id: comment.id,
      content: comment.mensagem,
      author: {
        name: userName,
        initials: getIniciais(userName),
        role: comment.usuario?.cargo || 'Membro',
        reputation: comment.usuario?.reputation || 0,
        id: comment.usuario_id,
      },
      createdAt: new Date(comment.criado_em).toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      upvotes: comment.upvotes || 0,
      downvotes: comment.downvotes || 0,
      isUpvoted: false,
      isDownvoted: false,
    };
  };

  // Carregar post e comentários
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Buscar post
        const postResponse = await axios.get(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${id}`
        );
        const mappedPost = await mapPostFromApi(postResponse.data);
        setPost(mappedPost);

        // Buscar comentários
        try {
          const commentsResponse = await axios.get(
            `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${id}/comentarios`
          );
          const mappedComments = await Promise.all(
            commentsResponse.data.map(mapCommentFromApi)
          );
          setComments(mappedComments);
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Erro ao buscar comentários:', err);
          }
          setComments([]);
        }
      } catch (err) {
        setError('Erro ao carregar o post.');
        toast.error('Erro ao carregar dados.');
        if (process.env.NODE_ENV !== 'production') {
          console.error('Erro ao carregar post:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id, userNamesCache]);

  // Manipular votação
  const handleVote = (type) => {
    setPost((prev) => {
      if (type === 'up') {
        if (prev.isUpvoted) {
          return { ...prev, upvotes: prev.upvotes - 1, isUpvoted: false };
        }
        return {
          ...prev,
          upvotes: prev.upvotes + 1,
          downvotes: prev.isDownvoted ? prev.downvotes - 1 : prev.downvotes,
          isUpvoted: true,
          isDownvoted: false,
        };
      }
      if (prev.isDownvoted) {
        return { ...prev, downvotes: prev.downvotes - 1, isDownvoted: false };
      }
      return {
        ...prev,
        downvotes: prev.downvotes + 1,
        upvotes: prev.isUpvoted ? prev.upvotes - 1 : prev.upvotes,
        isDownvoted: true,
        isUpvoted: false,
      };
    });
  };

  // Manipular salvar
  const handleSave = () => {
    setPost((prev) => ({ ...prev, isSaved: !prev.isSaved }));
    toast.success(post?.isSaved ? 'Post removido dos salvos!' : 'Post salvo!');
  };

  // Manipular compartilhar
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado!');
  };

  // Adicionar comentário
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }
    if (!currentUserId) {
      toast.error('Faça login para comentar.');
      return;
    }
    try {
      const response = await axios.post(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${id}/comentarios`,
        {
          mensagem: newComment,
          usuario_id: currentUserId,
        }
      );
      const newCommentData = response.data;
      const mappedComment = await mapCommentFromApi({
        ...newCommentData,
        usuario_id: currentUserId,
      });
      setComments([mappedComment, ...comments]);
      setNewComment('');
      setPost((prev) => ({ ...prev, comments: prev.comments + 1 }));
      toast.success('Comentário adicionado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao adicionar comentário.');
      if (process.env.NODE_ENV !== 'production') {
        console.error('Erro ao adicionar comentário:', err);
      }
    }
  };

  // Editar comentário
  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }
    try {
      await axios.put(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentarioPostagem/${commentId}`,
        { mensagem: editedComment }
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, content: editedComment } : c))
      );
      setEditingCommentId(null);
      setEditedComment('');
      toast.success('Comentário atualizado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao editar comentário.');
      if (process.env.NODE_ENV !== 'production') {
        console.error('Erro ao editar comentário:', err);
      }
    }
  };

  // Deletar comentário
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentarioPostagem/${commentId}`
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setPost((prev) => ({ ...prev, comments: prev.comments - 1 }));
      toast.success('Comentário deletado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao deletar comentário.');
      if (process.env.NODE_ENV !== 'production') {
        console.error('Erro ao deletar comentário:', err);
      }
    }
  };

  // Iniciar edição
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.content);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  if (isLoading) return <S.Loading>Carregando...</S.Loading>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;
  if (!post) return <S.ErrorMessage>Post não encontrado.</S.ErrorMessage>;

  return (
    <S.ContainerGeral>
    <S.Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <S.Breadcrumb>
        <S.BackButton onClick={() => navigate('/comunidade')}>
          <ArrowLeft size={16} />
          Voltar para Comunidade
        </S.BackButton>
      </S.Breadcrumb>
      <S.PostCard>
        <S.VoteSection>
          <S.VoteButton active={post.isUpvoted} onClick={() => handleVote('up')}>
            <ChevronUp size={20} />
          </S.VoteButton>
          <S.VoteScore>{post.upvotes - post.downvotes}</S.VoteScore>
          <S.VoteButton active={post.isDownvoted} onClick={() => handleVote('down')}>
            <ChevronDown size={20} />
          </S.VoteButton>
          <S.SaveButton active={post.isSaved} onClick={handleSave}>
            <Bookmark size={16} />
          </S.SaveButton>
        </S.VoteSection>
        <S.PostContent>
          <S.PostHeader>
            <S.AuthorAvatar title={post.author.name}>
              {post.author.initials}
            </S.AuthorAvatar>
            <S.AuthorInfo>
              <S.AuthorName>{post.author.name}</S.AuthorName>
              <S.AuthorMeta>
                {post.author.role} • {post.createdAt} • {post.views} visualizações
              </S.AuthorMeta>
            </S.AuthorInfo>
          </S.PostHeader>
          <S.Badges>
            <S.TypeBadge type={post.type}>{post.type}</S.TypeBadge>
            <S.CategoryBadge>{post.category}</S.CategoryBadge>
            {post.hasFlow && <S.FlowBadge>Flow Anexado</S.FlowBadge>}
          </S.Badges>
          <S.PostTitle>{post.title}</S.PostTitle>
          <S.Tags>
            {post.tags.map((tag) => (
              <S.Tag key={tag}>#{tag}</S.Tag>
            ))}
          </S.Tags>
          <S.PostBody>{post.content}</S.PostBody>
          <S.PostActions>
            <S.ActionButton>
              <MessageCircle size={16} />
              {post.comments} comentários
            </S.ActionButton>
            <S.ActionButton onClick={handleShare}>
              <Share2 size={16} />
              Compartilhar
            </S.ActionButton>
          </S.PostActions>
        </S.PostContent>
      </S.PostCard>
      <S.CommentSection>
        <S.CommentForm>
          <S.AuthorAvatar title="Você">{getIniciais(fetchUserName(currentUserId))}</S.AuthorAvatar>
          <S.Textarea
            placeholder="Adicione um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <S.SubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
            <Send size={16} />
            Comentar
          </S.SubmitButton>
        </S.CommentForm>
        <S.CommentList>
          {comments.map((comment) => (
            <S.Comment key={comment.id}>
              <S.AuthorAvatar title={comment.author.name}>
                {comment.author.initials}
              </S.AuthorAvatar>
              <S.CommentContent>
                <S.CommentHeader>
                  <S.AuthorName>{comment.author.name}</S.AuthorName>
                  <S.CommentMeta>
                    {comment.author.role} • {comment.createdAt}
                  </S.CommentMeta>
                </S.CommentHeader>
                {editingCommentId === comment.id ? (
                  <S.EditForm>
                    <S.Textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <S.EditActions>
                      <S.SubmitButton
                        onClick={() => handleEditComment(comment.id)}
                        disabled={!editedComment.trim()}
                      >
                        Salvar
                      </S.SubmitButton>
                      <S.CancelButton onClick={handleCancelEdit}>Cancelar</S.CancelButton>
                    </S.EditActions>
                  </S.EditForm>
                ) : (
                  <S.CommentText>{comment.content}</S.CommentText>
                )}
                {comment.author.id === currentUserId && editingCommentId !== comment.id && (
                  <S.CommentActions>
                    <S.ActionButton onClick={() => handleStartEdit(comment)}>
                      <Edit size={14} />
                    </S.ActionButton>
                    <S.ActionButton onClick={() => handleDeleteComment(comment.id)}>
                      <Trash2 size={14} />
                    </S.ActionButton>
                  </S.CommentActions>
                )}
              </S.CommentContent>
            </S.Comment>
          ))}
        </S.CommentList>
      </S.CommentSection>
    </S.Container>
      <S.PostFilters>
        <FiltrosComunidade/>
      </S.PostFilters>
    </S.ContainerGeral>
  );
};