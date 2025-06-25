import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as S from './style';
import { ArrowLeft, ChevronUp, ChevronDown, MessageCircle, Share2, Send, Edit, Trash2 } from 'lucide-react';
import { FiltrosComunidade } from '../../components/FiltrosComunidade';
import { CreatePostForm } from '../../components/CreatePostForm';

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
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); // Estado para o modal de edição
  const [isEditing, setIsEditing] = useState(false); // Estado para modo de edição

  // Configurar axios com token
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Função para buscar dados do usuário autenticado
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado. Faça login.');
      setIsLoading(false);
      return null;
    }

    try {
      const response = await axios.get(
        'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario/me'
      );
      setCurrentUser(response.data);
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar usuário autenticado:', err);
      setError('Erro ao carregar dados do usuário.');
      return null;
    }
  };

  // Mapear post da API
  const mapPostFromApi = (post) => {
  const userName = post.usuario?.nome || 'Usuário Desconhecido';
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
      role: post.usuario?.cargo || 'Membro',
      reputation: post.usuario?.reputation || 0,
      id: post.criado_por || null,
    },
    type: mappedType,
    category: post.categoria || 'Geral',
    tags: post.tags || [],
    upvotes: post.upvotes || 0,
    downvotes: post.downvotes || 0,
    comments: post.comentarios?.length || 0,
    views: post.views || 0,
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

  // Mapear comentário da API
  const mapCommentFromApi = (comment) => {
    const userName = comment.usuario?.nome || 'Usuário Desconhecido';
    return {
      id: comment.id,
      content: comment.mensagem,
      author: {
        name: userName,
        initials: getIniciais(userName),
        role: comment.usuario?.cargo || 'Membro',
        reputation: comment.usuario?.reputation || 0,
        id: comment.usuario_id || comment.usuario?.id,
      },
      createdAt: new Date(comment.criado_em).toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      comentario_pai_id: comment.comentario_pai_id,
      upvotes: comment.upvotes || 0,
      downvotes: comment.downvotes || 0,
      isUpvoted: false,
      isDownvoted: false,
      replies: [],
    };
  };

  // Construir árvore de comentários
  const buildCommentTree = (comments) => {
    const commentMap = new Map();
    const tree = [];

    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    comments.forEach((comment) => {
      if (comment.comentario_pai_id) {
        const parent = commentMap.get(comment.comentario_pai_id);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        } else {
          tree.push(commentMap.get(comment.id));
        }
      } else {
        tree.push(commentMap.get(comment.id));
      }
    });

    const sortComments = (comments) => {
      return comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((comment) => {
        if (comment.replies.length > 0) {
          comment.replies = sortComments(comment.replies);
        }
        return comment;
      });
    };

    return sortComments(tree);
  };

  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const user = await fetchCurrentUser();
        if (!user) return;

        const postResponse = await axios.get(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${id}`
        );
        const postData = postResponse.data;
        console.log('Post response:', postData);
        const mappedPost = mapPostFromApi(postData);
        setPost(mappedPost);

        const mappedComments = postData.comentarios
          ? postData.comentarios.map(mapCommentFromApi)
          : [];
        console.log('Mapped comments:', mappedComments);
        const commentTree = buildCommentTree(mappedComments);
        setComments(commentTree);
      } catch (err) {
        setError('Erro ao carregar o post.');
        toast.error('Erro ao carregar dados.');
        console.error('Erro ao carregar:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

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

  // Manipular edição do post
  const handleEditPost = () => {
    setIsEditing(true);
    setShowEditForm(true);
  };

  // Manipular atualização do post
  const handlePostUpdated = (updatedPost) => {
    setPost(updatedPost);
    setShowEditForm(false);
    setIsEditing(false);
    toast.success('Post atualizado com sucesso!');
  };

  // Adicionar comentário ou resposta
  const handleAddComment = async (parentCommentId = null) => {
    const content = parentCommentId ? replyContent : newComment;
    if (!content.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }
    if (!currentUser?.id) {
      toast.error('Faça login para comentar.');
      return;
    }
    try {
      const response = await axios.post(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentariopostagem`,
        {
          mensagem: content,
          postagem_id: id,
          comentario_pai_id: parentCommentId,
          usuario_id: currentUser.id,
        }
      );
      const newCommentData = response.data;
      const mappedComment = mapCommentFromApi({
        ...newCommentData,
        usuario_id: currentUser.id,
        usuario: { id: currentUser.id, nome: currentUser.nome },
      });
      if (parentCommentId) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === parentCommentId
              ? { ...comment, replies: [mappedComment, ...comment.replies] }
              : comment
          )
        );
        setReplyContent('');
        setReplyingToCommentId(null);
      } else {
        setComments([mappedComment, ...comments]);
        setNewComment('');
        setPost((prev) => ({ ...prev, comments: prev.comments + 1 }));
      }
      toast.success('Comentário adicionado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao adicionar comentário.');
      console.error('Erro ao adicionar comentário:', err);
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
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentariopostagem/${commentId}`,
        { mensagem: editedComment }
      );
      const updateComment = (comments, commentId, newContent) => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: newContent };
          }
          if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies, commentId, newContent) };
          }
          return comment;
        });
      };
      setComments((prev) => updateComment(prev, commentId, editedComment));
      setEditingCommentId(null);
      setEditedComment('');
      toast.success('Comentário atualizado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao editar comentário.');
      console.error('Erro ao editar comentário:', err);
    }
  };

  // Deletar comentário
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentariopostagem/${commentId}`
      );
      const deleteComment = (comments, commentId) => {
        return comments
          .filter((comment) => comment.id !== commentId)
          .map((comment) => ({
            ...comment,
            replies: comment.replies ? deleteComment(comment.replies, commentId) : comment.replies,
          }));
      };
      setComments((prev) => deleteComment(prev, commentId));
      setPost((prev) => ({ ...prev, comments: prev.comments - 1 }));
      toast.success('Comentário deletado!');
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao deletar comentário.');
      console.error('Erro ao deletar comentário:', err);
    }
  };

  // Iniciar edição de comentário
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.content);
  };

  // Cancelar edição de comentário
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  // Iniciar resposta
  const handleStartReply = (commentId) => {
    setReplyingToCommentId(commentId);
    setReplyContent('');
  };

  // Cancelar resposta
  const handleCancelReply = () => {
    setReplyingToCommentId(null);
    setReplyContent('');
  };

  if (isLoading) return <S.Loading>Carregando...</S.Loading>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;
  if (!post) return <S.ErrorMessage>Post não encontrado.</S.ErrorMessage>;

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <S.Comment key={comment.id} $depth={depth}>
        <S.AuthorAvatar title={comment.author.name} $depth={depth}>
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
          <S.CommentActions>
            <S.ActionButton onClick={() => handleStartReply(comment.id)}>
              Responder
            </S.ActionButton>
            {comment.author.id === currentUser?.id && editingCommentId !== comment.id && (
              <>
                <S.ActionButton onClick={() => handleStartEdit(comment)}>
                  <Edit size={14} />
                </S.ActionButton>
                <S.ActionButton onClick={() => handleDeleteComment(comment.id)}>
                  <Trash2 size={14} />
                </S.ActionButton>
              </>
            )}
          </S.CommentActions>
          {replyingToCommentId === comment.id && (
            <S.ReplyForm>
              <S.Textarea
                placeholder="Digite sua resposta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <S.EditActions>
                <S.SubmitButton
                  onClick={() => handleAddComment(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  <Send size={16} />
                  Responder
                </S.SubmitButton>
                <S.CancelButton onClick={handleCancelReply}>Cancelar</S.CancelButton>
              </S.EditActions>
            </S.ReplyForm>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <S.ReplyList>
              {renderComments(comment.replies, depth + 1)}
            </S.ReplyList>
          )}
        </S.CommentContent>
      </S.Comment>
    ));
  };

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
          {/* Botão de edição no canto superior direito */}
          {currentUser?.id === post.author.id && (
            <S.EditButton
              onClick={handleEditPost}
              aria-label={`Editar post: ${post.title}`}
            >
              <Edit size={16} />
            </S.EditButton>
          )}
          <S.VoteSection>
            <S.VoteButton $active={post.isUpvoted} onClick={() => handleVote('up')}>
              <ChevronUp size={20} />
            </S.VoteButton>
            <S.VoteScore>{post.upvotes - post.downvotes}</S.VoteScore>
            <S.VoteButton $active={post.isDownvoted} onClick={() => handleVote('down')}>
              <ChevronDown size={20} />
            </S.VoteButton>
            <S.SaveButton $active={post.isSaved} onClick={handleSave}>
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
            <S.AuthorAvatar title={currentUser?.nome || 'Você'}>
              {getIniciais(currentUser?.nome || 'Você')}
            </S.AuthorAvatar>
            <S.Textarea
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <S.SubmitButton onClick={() => handleAddComment()} disabled={!newComment.trim()}>
              <Send size={16} />
              Comentar
            </S.SubmitButton>
          </S.CommentForm>
          <S.CommentList>
            {renderComments(comments)}
          </S.CommentList>
        </S.CommentSection>
      </S.Container>
      <S.PostFilters>
        <FiltrosComunidade />
      </S.PostFilters>
      {/* Modal de edição */}
      {showEditForm && (
        <CreatePostForm
          onClose={() => {
            setShowEditForm(false);
            setIsEditing(false);
          }}
          onPostCreated={() => {}} // Não usado na edição
          onPostUpdated={handlePostUpdated}
          postToEdit={post}
          isEditing={isEditing}
          currentUserId={currentUser?.id}
        />
      )}
    </S.ContainerGeral>
  );
};