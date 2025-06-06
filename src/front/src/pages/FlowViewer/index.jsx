import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
} from 'reactflow';
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
    ThumbsUp,
    Play,
    X,
    Send,
    Flag,
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
import { getIniciais, InitialsAvatar } from '../../services/avatarService'; // Novo import
import * as S from './style';

// Configura o axios para incluir o token de autenticação
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Componente principal para visualização de um flow
const FlowViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flow, setFlow] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [stats, setStats] = useState({ likes: 0, comments: 0, saves: 0, views: 0 });
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const usuarioId = localStorage.getItem('usuarioId'); // ID do usuário logado

    // Memoização dos tipos de nós
    const nodeTypes = useMemo(() => ({
        textNode: TextNode,
        decisionNode: DecisionNode,
        mediaNode: MediaNode,
    }), []);

    // Busca o flow e mapeia os comentários incluídos no response
    useEffect(() => {
        const fetchFlow = async () => {
            try {
                // Busca o flow pelo ID, que inclui os comentários em flow.comentarios
                const flowResponse = await axios.get(`https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow/${id}`);
                const flowData = flowResponse.data;
                const mappedFlow = {
                    ...flowData,
                    createdAt: flowData.criado_em,
                    autor: {
                        ...flowData.usuario,
                        empresa: flowData.usuario.empresa || 'Sem empresa',
                        cargo: flowData.usuario.cargo || 'Sem cargo',
                        avatar: flowData.usuario.avatar || null, // null para usar iniciais
                        verificado: flowData.usuario.verificado || false,
                        username: flowData.usuario.username || flowData.usuario.email.split('@')[0],
                        seguidores: flowData.usuario.seguidores || [],
                    },
                };
                setFlow(mappedFlow);
                setNodes(flowData.conteudo_nos || []);
                setEdges(flowData.conteudo_conexoes || []);
                setStats({
                    likes: flowData.stats?.likes || 0,
                    comments: flowData.comentarios?.length || 0,
                    saves: flowData.stats?.saves || 0,
                    views: flowData.stats?.views || 0,
                });

                // Mapeia os comentários do flow.comentarios
                const mappedComments = flowData.comentarios?.map((comment) => ({
                    id: comment.id,
                    author: comment.usuario?.nome || 'Usuário desconhecido',
                    username: comment.usuario?.email?.split('@')[0] || 'usuário',
                    avatar: comment.usuario?.avatar || null, // null para usar iniciais
                    role: comment.usuario?.cargo || 'Usuário',
                    company: comment.usuario?.empresa || '',
                    verified: comment.usuario?.verificado || false,
                    content: comment.mensagem,
                    createdAt: comment.criado_em || new Date().toISOString(),
                    likes: comment.likes || 0,
                    replies: comment.replies || 0,
                    isLiked: comment.isLiked || false,
                    isHelpful: comment.isHelpful || false,
                    usuario_id: comment.usuario_id,
                })) || [];
                setComments(mappedComments);
            } catch (error) {
                console.error('Erro ao buscar flow:', error);
                toast.error('Erro ao carregar o flow.');
            }
        };
        fetchFlow();
    }, [id]);

    // Handler para clique em um nó
    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
        setIsNodeModalOpen(true);
    }, []);

    // Handler para curtir o flow
    const handleLike = () => {
        setIsLiked(!isLiked);
        setStats((prev) => ({
            ...prev,
            likes: isLiked ? prev.likes - 1 : prev.likes + 1,
        }));
        toast.success(isLiked ? 'Like removido!' : 'Flow curtido!');
    };

    // Handler para salvar o flow
    const handleSave = () => {
        setIsSaved(!isSaved);
        setStats((prev) => ({
            ...prev,
            saves: isSaved ? prev.saves - 1 : prev.saves + 1,
        }));
        toast.success(isSaved ? 'Removido dos salvos!' : 'Flow salvo!');
    };

    // Handler para compartilhar o link
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiado!');
    };

    // Handler para curtir um comentário
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

    // Handler para adicionar um comentário
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }

        try {
            const response = await axios.post('https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario', {
                mensagem: newComment,
                flow_id: id,
            });
            const newCommentData = response.data;
            const mappedComment = {
                id: newCommentData.id,
                author: newCommentData.usuario?.nome || 'Você',
                username: newCommentData.usuario?.email?.split('@')[0] || 'usuario.atual',
                avatar: newCommentData.usuario?.avatar || null, // null para iniciais
                role: newCommentData.usuario?.cargo || 'Usuário',
                company: newCommentData.usuario?.empresa || '',
                verified: newCommentData.usuario?.verificado || false,
                content: newCommentData.mensagem,
                createdAt: newCommentData.criado_em || new Date().toISOString(),
                likes: 0,
                replies: 0,
                isLiked: false,
                isHelpful: false,
                usuario_id: newCommentData.usuario_id,
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

    // Handler para iniciar a edição de um comentário
    const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditedComment(comment.content);
    };

    // Handler para salvar a edição de um comentário
    const handleEditComment = async (commentId) => {
        if (!editedComment.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }

        try {
            await axios.put(`https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario/${commentId}`, {
                mensagem: editedComment,
            });
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

    // Handler para cancelar a edição
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedComment('');
    };

    // Handler para deletar um comentário
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario/${commentId}`);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
            setStats((prev) => ({ ...prev, comments: prev.comments - 1 }));
            toast.success('Comentário deletado!');
        } catch (error) {
            console.error('Erro ao deletar comentário:', error);
            toast.error(error.response?.data?.erro || 'Erro ao deletar comentário.');
        }
    };

    // Formata a data para exibição relativa
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

    // Formata números
    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Exibe loading enquanto o flow não é carregado
    if (!flow) return <S.Loading>Carregando...</S.Loading>;

    // Renderização principal
    return (
        <S.Container>
            {/* Notificações */}
            <S.ToastOverride>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    style={{ top: '60px' }}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
            </S.ToastOverride>

            {/* Cabeçalho */}
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
                        <S.ActionButton
                            onClick={() => setShowComments(!showComments)}
                            $variant="comment"
                        >
                            <MessageCircle size={16} />
                            {formatNumber(stats.comments)}
                        </S.ActionButton>
                        <S.ActionButton $active={isSaved} onClick={handleSave} $variant="save">
                            <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                            {isSaved ? 'Salvo' : 'Salvar'}
                        </S.ActionButton>
                        <S.ActionButton onClick={handleShare} $variant="share">
                            <Share2 size={16} />
                            Compartilhar
                        </S.ActionButton>
                    </S.HeaderActions>
                </S.HeaderContent>
            </S.Header>

            {/* Conteúdo principal */}
            <S.Main>
                <S.FlowSection>
                    {/* Flow interativo */}
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Play size={20} color="#233DFF" />
                                Flow Interativo
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
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
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

                    {/* Seção de comentários */}
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
                                        <S.SubmitButton
                                            onClick={handleAddComment}
                                            disabled={!newComment.trim()}
                                        >
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
                                                        <S.CommentActions>
                                                            <S.Button
                                                                onClick={() => handleEditComment(comment.id)}
                                                                disabled={!editedComment.trim()}
                                                            >
                                                                Salvar
                                                            </S.Button>
                                                            <S.Button
                                                                $variant="outline"
                                                                onClick={handleCancelEdit}
                                                            >
                                                                Cancelar
                                                            </S.Button>
                                                        </S.CommentActions>
                                                    </div>
                                                ) : (
                                                    <S.CommentText>{comment.content}</S.CommentText>
                                                )}
                                                <S.CommentActions>
                                                    <S.ActionButton
                                                        $variant="commentLike"
                                                        $active={comment.isLiked}
                                                        onClick={() => handleCommentLike(comment.id)}
                                                        $compact
                                                    >
                                                        <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                                                        {comment.likes}
                                                    </S.ActionButton>
                                                    <S.ActionButton
                                                        $variant="commentReply"
                                                        $compact
                                                    >
                                                        <MessageCircle size={14} />
                                                        {comment.replies} respostas
                                                    </S.ActionButton>
                                                    <S.ActionButton
                                                        $variant="commentFlag"
                                                        $compact
                                                    >
                                                        <Flag size={14} />
                                                    </S.ActionButton>
                                                    {comment.usuario_id === usuarioId && (
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
                                                </S.CommentActions>
                                            </S.CommentContent>
                                        </S.Comment>
                                    ))}
                                </S.CommentList>
                            </S.CardContent>
                        </S.Card>
                    )}
                </S.FlowSection>

                {/* Sidebar */}
                <S.Sidebar>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>
                                <Eye size={20} color="#8B5CF6" />
                                Sobre este Flow
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
                            <S.Button onClick={() => navigate(`/perfil/${flow.autor?.username}`)}>
                                Ver Perfil Completo
                            </S.Button>
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
                            <S.Button onClick={() => toast.info('Duplicando flow...')}>
                                <Copy size={16} style={{ marginRight: '8px' }} />
                                Duplicar Flow
                            </S.Button>
                            {flow.criado_por === flow.autor?.id && (
                                <S.Button
                                    onClick={() => navigate(`/editar-flow/${id}`)}
                                    style={{ marginTop: '12px' }}
                                >
                                    <Edit size={16} style={{ marginRight: '8px' }} />
                                    Editar Flow
                                </S.Button>
                            )}
                            <S.Button
                                onClick={() => toast.info('Exportando flow...')}
                                style={{ marginTop: '12px' }}
                            >
                                <Download size={16} style={{ marginRight: '8px' }} />
                                Exportar Flow
                            </S.Button>
                        </S.CardContent>
                    </S.Card>
                </S.Sidebar>
            </S.Main>

            {/* Modal para nós */}
            {isNodeModalOpen && (
                <S.Modal>
                    <S.ModalContent>
                        <S.ModalHeader>
                            <S.ModalTitle>
                                {selectedNode?.data.title ||
                                    (selectedNode?.type === 'textNode'
                                        ? 'Conteúdo'
                                        : selectedNode?.type === 'decisionNode'
                                            ? 'Decisão'
                                            : 'Recurso')}
                            </S.ModalTitle>
                            <S.ModalDescription>
                                {selectedNode?.type === 'textNode' && 'Conteúdo educativo do flow'}
                                {selectedNode?.type === 'decisionNode' && 'Ponto de decisão interativo'}
                                {selectedNode?.type === 'mediaNode' && 'Recurso ou arquivo complementar'}
                            </S.ModalDescription>
                            <S.CloseButton onClick={() => setIsNodeModalOpen(false)}>
                                <X size={16} />
                            </S.CloseButton>
                        </S.ModalHeader>
                        <S.ModalBody>
                            {selectedNode?.type === 'textNode' && (
                                <S.TextContent>{selectedNode.data.content}</S.TextContent>
                            )}
                            {selectedNode?.type === 'decisionNode' && (
                                <S.DecisionContent>
                                    <S.DecisionQuestion>{selectedNode.data.question}</S.DecisionQuestion>
                                    <S.OptionList>
                                        {selectedNode.data.options?.map((option, index) => (
                                            <S.OptionButton
                                                key={option}
                                                onClick={() => {
                                                    console.log(`Opção selecionada: ${option}`);
                                                    setIsNodeModalOpen(false);
                                                }}
                                            >
                                                <S.OptionNumber>{index + 1}</S.OptionNumber>
                                                {option}
                                            </S.OptionButton>
                                        ))}
                                    </S.OptionList>
                                </S.DecisionContent>
                            )}
                            {selectedNode?.type === 'mediaNode' && (
                                <S.MediaContent>
                                    <S.MediaHeader>
                                        <S.MediaIcon>
                                            <ImageIcon size={24} color="#ffffff" />
                                        </S.MediaIcon>
                                        <div>
                                            <S.MediaTitle>{selectedNode.data.title}</S.MediaTitle>
                                            <S.MediaMeta>
                                                {selectedNode.data.type} • {selectedNode.data.filename}
                                            </S.MediaMeta>
                                        </div>
                                    </S.MediaHeader>
                                    {selectedNode.data.content && (
                                        <S.MediaDescription>{selectedNode.data.content}</S.MediaDescription>
                                    )}
                                    <S.MediaActions>
                                        <S.Button>Download Arquivo</S.Button>
                                        <S.Button $variant="outline">Abrir</S.Button>
                                    </S.MediaActions>
                                </S.MediaContent>
                            )}
                        </S.ModalBody>
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.Container>
    );
};

export default FlowViewer;