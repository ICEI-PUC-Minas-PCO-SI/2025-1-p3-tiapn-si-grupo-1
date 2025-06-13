import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    Eye,
    Play,
    X,
    Send,
    Copy,
    Image as ImageIcon,
    Users,
    Edit,
    Download,
    Trash2,
} from 'lucide-react';
import TextNode from '../../components/TextNode';
import DecisionNode from '../../components/DecisionNode';
import MediaNode from '../../components/MediaNode';
import * as S from './style';

// Função para avatar iniciais
const getIniciais = (nome) => {
    if (!nome) return '??';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

const InitialsAvatar = ({ children }) => (
    <div
        style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#64748B',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
        }}
    >
        {children}
    </div>
);

// Configura o axios para incluir o token de autenticação
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const FlowViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flow, setFlow] = useState(null);
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [stats, setStats] = useState({ likes: 0, comments: 0, saves: 0, views: 0 });
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const usuarioId = localStorage.getItem('usuarioId');

    const nodeTypes = useMemo(
        () => ({
            textNode: TextNode,
            decisionNode: DecisionNode,
            mediaNode: MediaNode,
        }),
        []
    );

    useEffect(() => {
        const fetchFlow = async () => {
            try {
                const flowResponse = await axios.get(
                    `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow/${id}`
                );
                const flowData = flowResponse.data;
                const mappedFlow = {
                    ...flowData,
                    createdAt: flowData.criado_em,
                    autor: {
                        ...flowData.usuario,
                        empresa: flowData?.usuario?.empresa || 'Sem empresa',
                        cargo: flowData?.usuario?.cargo || 'Sem cargo',
                        avatar: flowData?.usuario?.avatar || null,
                        verificado: flowData?.usuario?.verificado || false,
                        username: flowData?.usuario?.username || flowData?.usuario?.email?.split('@')[0] || 'usuário',
                        seguidores: flowData?.usuario?.seguidores || [],
                    },
                };
                setFlow(mappedFlow);
                setNodes(flowData.conteudo_nos || []);
                setEdges(flowData.conteudo_conexoes || []);

                const mappedComments = flowData.comentarios?.map((comment) => ({
                    id: comment.id,
                    author: comment?.usuario?.nome || 'Usuário desconhecido',
                    username: comment?.usuario?.email?.split('@')[0] || 'usuário',
                    avatar: comment?.usuario?.avatar || null,
                    role: comment?.usuario?.cargo || 'Usuário',
                    company: comment?.usuario?.empresa || '',
                    verified: comment?.usuario?.verificado || false,
                    content: comment.mensagem,
                    createdAt: comment.criado_em || new Date().toISOString(),
                    likes: comment.likes || 0,
                    replies: comment.replies || 0,
                    isLiked: comment.isLiked || false,
                    isHelpful: comment.isHelpful || false,
                    usuario_id: comment.usuario_id,
                })) || [];
                setComments(mappedComments);

                setStats({
                    likes: flowData.stats?.likes || 0,
                    comments: flowData.comentarios?.length || 0,
                    saves: flowData.stats?.saves || 0,
                    views: flowData.stats?.views || 0,
                });

                // Buscar curtidas
                try {
                    const curtidasResponse = await axios.get(
                        'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas'
                    );
                    console.log('Curtidas iniciais:', curtidasResponse.data);
                    const userLiked = curtidasResponse.data.some(
                        (curtida) => String(curtida?.usuario_id) === String(usuarioId) && String(curtida?.flow_id) === String(id)
                    );
                    const likeCount = curtidasResponse.data.filter((curtida) => String(curtida?.flow_id) === String(id)).length;
                    setIsLiked(userLiked);
                    setStats((prev) => ({ ...prev, likes: likeCount }));
                } catch (curtidasError) {
                    console.error('Erro ao buscar curtidas:', curtidasError);
                    toast.error('Erro ao carregar curtidas.');
                }

                // Buscar fluxos salvos
                try {
                    const salvosResponse = await axios.get(
                        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos?usuario_id=${usuarioId}`
                    );
                    console.log('Fluxos salvos iniciais:', salvosResponse.data);
                    const userSaved = salvosResponse.data.some(
                        (salvo) => String(salvo?.usuario_id) === String(usuarioId) && String(salvo?.flow_id) === String(id)
                    );
                    const saveCount = salvosResponse.data.filter((salvo) => String(salvo?.flow_id) === String(id)).length;
                    setIsSaved(userSaved);
                    setStats((prev) => ({ ...prev, saves: saveCount }));
                } catch (salvosError) {
                    console.error('Erro ao buscar fluxos salvos:', salvosError);
                    toast.error('Erro ao carregar fluxos salvos.');
                }
            } catch (flowError) {
                console.error('Erro ao buscar fluxo:', flowError);
                toast.error('Erro ao carregar o fluxo.');
            }
        };
        fetchFlow();
    }, [id, usuarioId, setNodes, setEdges]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
        setIsNodeModalOpen(true);
    }, []);

    const handleLike = async () => {
        if (!usuarioId) {
            toast.error('Faça login para curtir o fluxo.');
            return;
        }
        try {
            if (isLiked) {
                try {
                    console.log('Descurtindo fluxo para usuarioId:', usuarioId, 'e flow_id:', id);
                    await axios.delete(
                        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas/${usuarioId}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setIsLiked(false);
                    setStats((prev) => ({ ...prev, likes: prev?.likes - 1 }));
                    toast.success('Curtida removida!');
                } catch (error) {
                    console.error('Erro ao remover curtida:', error.response?.data || error);
                    toast.error(error.response?.data?.erro || 'Erro ao remover a curtida.');
                }
            } else {
                console.log('Curtindo fluxo com flow_id:', id);
                await axios.post('https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas', {
                    flow_id: id,
                });
                setIsLiked(true);
                setStats((prev) => ({ ...prev, likes: prev?.likes + 1 }));
                toast.success('Fluxo curtido!');
            }
        } catch (error) {
            console.error('Erro ao processar curtida:', error.response?.data || error);
            toast.error(error.response?.data?.erro || 'Erro ao curtir o fluxo.');
        }
    };

    const handleSave = async () => {
        if (!usuarioId) {
            toast.error('Faça login para salvar o fluxo.');
            return;
        }
        try {
            if (isSaved) {
                try {
                    console.log('Removendo fluxo salvo para usuarioId:', usuarioId, 'e flow_id:', id);
                    await axios.delete(
                        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos/${usuarioId}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setIsSaved(false);
                    setStats((prev) => ({ ...prev, saves: prev?.saves - 1 }));
                    toast.success('Removido dos salvos!');
                } catch (error) {
                    console.error('Erro ao remover fluxo salvo:', error.response?.data || error);
                    toast.error(error.response?.data?.erro || 'Erro ao remover o fluxo salvo.');
                }
            } else {
                console.log('Salvando fluxo com flow_id:', id);
                await axios.post('https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos', {
                    usuarioId,
                    flowId: id,
                });
                setIsSaved(true);
                setStats((prev) => ({ ...prev, saves: prev?.saves + 1 }));
                toast.success('Fluxo salvo!');
            }
        } catch (error) {
            console.error('Erro ao processar fluxo salvo:', error.response?.data || error);
            toast.error(error.response?.data?.erro || 'Erro ao salvar o fluxo.');
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiado!');
    };

    const handleDeleteFlow = async () => {
        try {
            await axios.delete(`https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow/${id}`);
            toast.success('Fluxo deletado com sucesso!');
            setIsDeleteModalOpen(false);
            navigate('/feed');
        } catch (error) {
            console.error('Erro ao deletar fluxo:', error);
            toast.error(error.response?.data?.erro || 'Erro ao deletar o fluxo.');
            setIsDeleteModalOpen(false);
        }
    };

    /*
    const handleCommentLike = (commentId) => {
        setComments((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          isLiked: !comment.isLiked,
                          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                      }
                    : comment
            )
        );
        toast.success('Ação registrada!');
    };
    */

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }
        try {
            const response = await axios.post(
                'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario',
                {
                    mensagem: newComment,
                    flow_id: id,
                }
            );
            const newCommentData = response.data;
            const mappedComment = {
                id: newCommentData.id,
                author: newCommentData?.usuario?.nome || 'Você',
                username: newCommentData?.usuario?.email?.split('@')[0] || 'usuario.atual',
                avatar: newCommentData?.usuario?.avatar || null,
                role: newCommentData?.usuario?.cargo || 'Usuário',
                company: newCommentData?.usuario?.empresa || '',
                verified: newCommentData?.usuario?.verificado || false,
                content: newCommentData?.mensagem,
                createdAt: newCommentData?.criado_em || new Date().toISOString(),
                likes: 0,
                replies: 0,
                isLiked: false,
                isHelpful: false,
                usuario_id: newCommentData?.usuario_id,
            };
            setComments([mappedComment, ...comments]);
            setNewComment('');
            setStats((prev) => ({ ...prev, comments: prev.comments + 1 }));
            toast.success('Comentário adicionado!');
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            toast.error(error.response?.data?.erro || 'Erro ao adicionar comentário.');
        }
    };

    const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditedComment(comment.content);
    };

    const handleEditComment = async (commentId) => {
        if (!editedComment.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }
        try {
            await axios.put(
                `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario/${commentId}`,
                {
                    mensagem: editedComment,
                }
            );
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId ? { ...comment, content: editedComment } : comment
                )
            );
            setEditingCommentId(null);
            setEditedComment('');
            toast.success('Comentário atualizado!');
        } catch (error) {
            console.error('Erro ao editar comentário:', error);
            toast.error(error.response?.data?.erro || 'Erro ao editar comentário.');
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedComment('');
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(
                `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario/${commentId}`
            );
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
            setStats((prev) => ({ ...prev, comments: prev.comments - 1 }));
            toast.success('Comentário deletado!');
        } catch (error) {
            console.error('Erro ao deletar comentário:', error);
            toast.error(error.response?.data?.erro || 'Erro ao deletar comentário.');
        }
    };

    const formatTimeAgo = (dateString) => {
        if (!dateString) return 'Data inválida';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data inválida';
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        if (diffInHours < 1) return 'Agora';
        if (diffInHours < 24) return `${diffInHours}h`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d`;
        return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    if (!flow) return <S.Loading>Carregando...</S.Loading>;

    return (
        <S.Container>
            <S.ToastOverride>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    style={{ top: '75px' }}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
            </S.ToastOverride>
            <S.Header>
                <S.HeaderContent>
                    <S.BackButton onClick={() => navigate('/feed')}>
                        <ArrowLeft size={16} />
                        Voltar ao Feed
                    </S.BackButton>
                    <S.TitleWrapper>
                        <S.Title>{flow.titulo}</S.Title>
                        <S.Subtitle>
                            por {flow.autor?.nome || 'Autor desconhecido'} • {flow.autor?.empresa} •{' '}
                            {formatTimeAgo(flow.createdAt)} • {formatNumber(stats.views)} visualizações
                        </S.Subtitle>
                    </S.TitleWrapper>
                    <S.HeaderActions>
                        <S.ActionButton $active={isLiked} onClick={handleLike} $variant="like">
                            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                            {formatNumber(stats.likes)}
                        </S.ActionButton>
                        <S.ActionButton onClick={() => setShowComments(!showComments)} $variant="comment">
                            <MessageCircle size={16} />
                            {formatNumber(stats.comments)}
                        </S.ActionButton>
                        <S.ActionButton $active={isSaved} onClick={handleSave} $variant="save">
                            <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                            {isSaved ? 'Salvo' : 'Salvar'} ({formatNumber(stats.saves)})
                        </S.ActionButton>
                        <S.ActionButton onClick={handleShare} $variant="share">
                            <Share2 size={16} />
                            Compartilhar
                        </S.ActionButton>
                    </S.HeaderActions>
                </S.HeaderContent>
            </S.Header>
            <S.Main>
                <S.FlowSection>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Play size={20} color="#233DFF" />
                                Fluxo Interativo
                            </S.CardTitle>
                            <S.CardDescription>
                                Clique nos nós para explorar o conteúdo • Use os controles para navegar
                            </S.CardDescription>
                        </S.CardHeader>
                        <S.CardContent>
                            <S.Canvas>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodeClick={onNodeClick}
                                    nodeTypes={nodeTypes}
                                    fitView
                                    nodesDraggable={false}
                                    nodesConnectable={false}
                                    elementsSelectable
                                    minZoom={0.3}
                                    maxZoom={1.5}
                                    defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
                                >
                                    <Controls />
                                    <MiniMap nodeColor="#233DFF" />
                                    <Background variant="dots" gap={24} size={1} />
                                </ReactFlow>
                            </S.Canvas>
                        </S.CardContent>
                    </S.Card>
                    {showComments && (
                        <S.Card id="comments">
                            <S.CardHeader>
                                <S.CardTitle>
                                    <MessageCircle size={20} color="#6366F1" />
                                    Comentários ({stats.comments})
                                </S.CardTitle>
                            </S.CardHeader>
                            <S.CardContent>
                                <S.CommentForm>
                                    <S.Textarea
                                        placeholder="Compartilhe sua experiência, dúvidas ou sugestões..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        rows={3}
                                    />
                                    <S.CommentActions>
                                        <S.CommentHint>
                                            Seja construtivo e respeitoso. Sua contribuição ajuda a comunidade!
                                        </S.CommentHint>
                                        <S.SubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
                                            <Send size={16} />
                                            Comentar
                                        </S.SubmitButton>
                                    </S.CommentActions>
                                </S.CommentForm>
                                <S.CommentList>
                                    {comments.map((comment) => (
                                        <S.Comment key={comment.id}>
                                            <S.Avatar>
                                                {comment.avatar ? (
                                                    <img src={comment.avatar} alt={comment.author} />
                                                ) : (
                                                    <InitialsAvatar>{getIniciais(comment.author)}</InitialsAvatar>
                                                )}
                                                {comment.verified && <S.VerifiedBadge>✓</S.VerifiedBadge>}
                                            </S.Avatar>
                                            <S.CommentContent>
                                                <S.CommentHeader>
                                                    <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                                                    <S.CommentMeta>
                                                        {comment.role} {comment.company && `• ${comment.company}`}
                                                    </S.CommentMeta>
                                                    <S.CommentTime>{formatTimeAgo(comment.createdAt)}</S.CommentTime>
                                                </S.CommentHeader>
                                                {editingCommentId === comment.id ? (
                                                    <div>
                                                        <S.Textarea
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                            rows={3}
                                                        />
                                                        <S.CommentsActions>
                                                            <S.Button
                                                                onClick={() => handleEditComment(comment.id)}
                                                                disabled={!editedComment.trim()}
                                                            >
                                                                Salvar
                                                            </S.Button>
                                                            <S.Button $variant="outline" onClick={handleCancelEdit}>
                                                                Cancelar
                                                            </S.Button>
                                                        </S.CommentsActions>
                                                    </div>
                                                ) : (
                                                    <S.CommentText>{comment.content}</S.CommentText>
                                                )}
                                                <S.CommentsActions>
                                                    {/*
                                                    <S.ActionButton
                                                        $variant="commentLike"
                                                        $active={comment.isLiked}
                                                        onClick={() => handleCommentLike(comment.id)}
                                                        $compact
                                                    >
                                                        <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                                                        {comment.likes}
                                                    </S.ActionButton>
                                                    <S.ActionButton $variant="commentReply" $compact>
                                                        <MessageCircle size={14} />
                                                        {comment.replies} respostas
                                                    </S.ActionButton>
                                                    <S.ActionButton $variant="commentFlag" $compact>
                                                        <Flag size={14} />
                                                    </S.ActionButton>
                                                    */}
                                                    {String(comment?.usuario_id) === String(usuarioId) && (
                                                        <>
                                                            <S.ActionButton
                                                                $variant="commentEdit"
                                                                onClick={() => handleStartEdit(comment)}
                                                                $compact
                                                            >
                                                                <Edit size={14} />
                                                            </S.ActionButton>
                                                            <S.ActionButton
                                                                $variant="commentDelete"
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                $compact
                                                            >
                                                                <Trash2 size={14} />
                                                            </S.ActionButton>
                                                        </>
                                                    )}
                                                </S.CommentsActions>
                                            </S.CommentContent>
                                        </S.Comment>
                                    ))}
                                </S.CommentList>
                            </S.CardContent>
                        </S.Card>
                    )}
                </S.FlowSection>
                <S.Sidebar>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Eye size={20} color="#8B5CF6" />
                                Sobre este Fluxo
                            </S.CardTitle>
                        </S.CardHeader>
                        <S.CardContent>
                            <S.Description>{flow.descricao}</S.Description>
                            <S.InfoList>
                                <S.InfoItem>
                                    <Eye size={16} />
                                    Visualizações: <strong>{formatNumber(stats.views)}</strong>
                                </S.InfoItem>
                            </S.InfoList>
                            <S.Tags>
                                <S.Tag isCategory>{flow.categoria}</S.Tag>
                                {flow.tags?.map((tag) => (
                                    <S.Tag key={tag}>#{tag}</S.Tag>
                                ))}
                            </S.Tags>
                        </S.CardContent>
                    </S.Card>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Users size={20} color="#10B981" />
                                Autor
                            </S.CardTitle>
                        </S.CardHeader>
                        <S.CardContent>
                            <S.AuthorCard>
                                <S.Avatar>
                                    {flow.autor?.avatar ? (
                                        <img src={flow.autor.avatar} alt={flow.autor?.nome || 'Autor'} />
                                    ) : (
                                        <InitialsAvatar>{getIniciais(flow.autor?.nome)}</InitialsAvatar>
                                    )}
                                    {flow.autor?.verificado && <S.VerifiedBadge>✓</S.VerifiedBadge>}
                                </S.Avatar>
                                <S.AuthorInfo>
                                    <S.AuthorName>{flow.autor?.nome || 'Autor desconhecido'}</S.AuthorName>
                                    <S.AuthorRole>{flow.autor?.cargo}</S.AuthorRole>
                                    <S.AuthorCompany>{flow.autor?.empresa}</S.AuthorCompany>
                                    <S.AuthorFollowers>
                                        {formatNumber(flow.autor?.seguidores?.length || 0)} seguidores
                                    </S.AuthorFollowers>
                                </S.AuthorInfo>
                            </S.AuthorCard>
                            {/*
                            <S.Button onClick={() => navigate(`/perfil/${flow.autor?.username}`)}>
                                Ver Perfil Completo
                            </S.Button>
                            */}
                        </S.CardContent>
                    </S.Card>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Copy size={20} color="#4B5563" />
                                Ações Rápidas
                            </S.CardTitle>
                        </S.CardHeader>
                        <S.CardContent>
                            <S.Button onClick={() => toast.info('Duplicando fluxo...')}>
                                <Copy size={16} style={{ marginRight: '8px' }} />
                                Duplicar Fluxo
                            </S.Button>
                            {String(flow.criado_por) === String(usuarioId) && (
                                <>
                                    <S.Button onClick={() => navigate(`/editar-flow/${id}`)} style={{ marginTop: '12px' }}>
                                        <Edit size={16} style={{ marginRight: '8px' }} />
                                        Editar Fluxo
                                    </S.Button>
                                    <S.Button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        $variant="delete"
                                        style={{ marginTop: '12px' }}
                                    >
                                        <Trash2 size={16} style={{ marginRight: '8px' }} />
                                        Deletar Fluxo
                                    </S.Button>
                                </>
                            )}
                            <S.Button onClick={() => toast.info('Exportando fluxo...')} style={{ marginTop: '12px' }}>
                                <Download size={16} style={{ marginRight: '8px' }} />
                                Exportar Fluxo
                            </S.Button>
                        </S.CardContent>
                    </S.Card>
                </S.Sidebar>
            </S.Main>
            {isNodeModalOpen && (
                <S.Modal>
                    <S.ModalContent>
                        <S.ModalHeader>
                            <S.ModalTitle>
                                {selectedNode?.data?.title ||
                                    (selectedNode?.data?.type === 'textNode'
                                        ? 'Conteúdo'
                                        : selectedNode?.data?.type === 'decisionNode'
                                            ? 'Decisão'
                                            : 'Imagem')}
                            </S.ModalTitle>
                            <S.ModalDescription>
                                {selectedNode?.data?.type === 'textNode' && 'Visualize o conteúdo do nó de texto'}
                                {selectedNode?.data?.type === 'decisionNode' && 'Explore as opções de decisão'}
                                {selectedNode?.data?.type === 'mediaNode' && 'Visualize a imagem associada'}
                            </S.ModalDescription>
                            <S.CloseButton onClick={() => setIsNodeModalOpen(false)}>
                                <X size={16} />
                            </S.CloseButton>
                        </S.ModalHeader>
                        <S.ModalBody>
                            {selectedNode?.data?.type === 'textNode' && (
                                <S.TextContent>{selectedNode.data?.content}</S.TextContent>
                            )}
                            {selectedNode?.data?.type === 'decisionNode' && (
                                <S.DecisionContent>
                                    <S.DecisionQuestion>{selectedNode.data?.question}</S.DecisionQuestion>
                                    <S.OptionList>
                                        {selectedNode?.data?.options?.map((option, index) => (
                                            <S.OptionButton key={option} onClick={() => setIsNodeModalOpen(false)}>
                                                <S.OptionNumber>{index + 1}</S.OptionNumber>
                                                {option}
                                            </S.OptionButton>
                                        ))}
                                    </S.OptionList>
                                </S.DecisionContent>
                            )}
                            {selectedNode?.data?.type === 'mediaNode' && (
                                <S.MediaContent>
                                    <S.MediaHeader>
                                        <S.MediaIcon>
                                            <ImageIcon size={24} color="#ffffff" />
                                        </S.MediaIcon>
                                        <div>
                                            <S.MediaTitle>{selectedNode.data?.title}</S.MediaTitle>
                                        </div>
                                    </S.MediaHeader>
                                    {selectedNode.data?.mediaUrl && (
                                        <img
                                            src={selectedNode.data?.mediaUrl}
                                            alt={selectedNode.data?.title}
                                            style={{ maxWidth: '100%', borderRadius: '8px' }}
                                        />
                                    )}
                                    <S.MediaActions>
                                        <S.Button>Download Imagem</S.Button>
                                        <S.Button $variant="outline">Abrir</S.Button>
                                    </S.MediaActions>
                                </S.MediaContent>
                            )}
                        </S.ModalBody>
                    </S.ModalContent>
                </S.Modal>
            )}
            {isDeleteModalOpen && (
                <S.Modal>
                    <S.ModalContent>
                        <S.ModalHeader>
                            <S.ModalTitle>Deletar Fluxo</S.ModalTitle>
                            <S.CloseButton onClick={() => setIsDeleteModalOpen(false)}>
                                <X size={16} />
                            </S.CloseButton>
                        </S.ModalHeader>
                        <S.ModalBody>
                            <p>Tem certeza que deseja deletar o fluxo "{flow.titulo}"? Esta ação não pode ser desfeita.</p>
                        </S.ModalBody>
                        <S.ModalFooter>
                            <S.Button $variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancelar
                            </S.Button>
                            <S.Button $variant="delete" onClick={handleDeleteFlow}>
                                Deletar
                            </S.Button>
                        </S.ModalFooter>
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.Container>
    );
};

export default FlowViewer;