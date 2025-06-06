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
} from 'lucide-react';
import TextNode from '../../components/TextNode';
import DecisionNode from '../../components/DecisionNode';
import MediaNode from '../../components/MediaNode';
import * as S from './style';

const FlowViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flow, setFlow] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesState] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [stats, setStats] = useState({ likes: 0, comments: 0, saves: 0, views: 0 });
    const [comments, setComments] = useState([]);

    const nodeTypes = useMemo(() => ({
        textNode: TextNode,
        decisionNode: DecisionNode,
        mediaNode: MediaNode,
    }), []);

    useEffect(() => {
        const fetchFlow = async () => {
            try {
                const response = await axios.get(`https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow/${id}`);
                const flowData = response.data;
                setFlow(flowData);
                setNodes(flowData.conteudo_nos || []);
                setEdges(flowData.conteudo_conexoes || []);
                setStats({
                    likes: flowData.stats?.likes || 0,
                    comments: flowData.stats?.comments || 0,
                    saves: flowData.stats?.saves || 0,
                    views: flowData.stats?.views || 0,
                });
                setComments(flowData.comments || []);
                setIsLiked(flowData.isLiked || false);
                setIsSaved(flowData.isSaved || false);
            } catch (error) {
                console.error('Erro ao buscar flow:', error);
                toast.error('Erro ao carregar o flow. Tente novamente.');
            }
        };
        fetchFlow();
    }, [id]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
        setIsNodeModalOpen(true);
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setStats((prev) => ({
            ...prev,
            likes: isLiked ? prev.likes - 1 : prev.likes + 1,
        }));
        toast.success(isLiked ? 'Like removido!' : 'Flow curtido!');
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        setStats((prev) => ({
            ...prev,
            saves: isSaved ? prev.saves - 1 : prev.saves + 1,
        }));
        toast.success(isSaved ? 'Removido dos salvos!' : 'Flow salvo!');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiado para a área de transferência!');
    };

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

    const handleAddComment = () => {
        if (!newComment.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }

        const comment = {
            id: Date.now(),
            author: 'Você',
            username: 'usuario.atual',
            avatar: '/placeholder.svg',
            role: 'Usuário',
            company: '',
            verified: false,
            content: newComment,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: 0,
            isLiked: false,
            isHelpful: false,
        };

        setComments([comment, ...comments]);
        setNewComment('');
        setStats((prev) => ({ ...prev, comments: prev.comments + 1 }));
        toast.success('Comentário adicionado!');
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
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
                    style={{ top: '60px' }}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
            </S.ToastOverride>

            <S.Header>
                <S.HeaderContent>
                    <S.BackButton onClick={() => navigate('/')}>
                        <ArrowLeft size={16} />
                        Voltar ao Feed
                    </S.BackButton>
                    <S.TitleWrapper>
                        <S.Title>{flow.titulo}</S.Title>
                        <S.Subtitle>
                            por {flow.autor?.nome} • {flow.autor?.empresa} • {formatTimeAgo(flow.createdAt)} •{' '}
                            {formatNumber(stats.views)} visualizações
                        </S.Subtitle>
                    </S.TitleWrapper>
                    <S.HeaderActions>
                        <S.ActionButton
                            $active={isLiked}
                            onClick={handleLike}
                            $variant="like"
                        >
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
                        <S.ActionButton
                            $active={isSaved}
                            onClick={handleSave}
                            $variant="save"
                        >
                            <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                            {isSaved ? 'Salvo' : 'Salvar'}
                        </S.ActionButton>
                        <S.ActionButton
                            onClick={handleShare}
                            $variant="share"
                        >
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
                                    onEdgesChange={onEdgesState}
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
                                                <img src={comment.avatar} alt={comment.author} />
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
                                                <S.CommentText>{comment.content}</S.CommentText>
                                                <S.CommentActions>
                                                    <S.ActionButton
                                                        $variant="commentLike"
                                                        $active={comment.isLiked}
                                                        onClick={() => handleCommentLike(comment.id)}
                                                    >
                                                        <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                                                        {comment.likes}
                                                    </S.ActionButton>
                                                    <S.ActionButton $variant="commentReply">
                                                        <MessageCircle size={14} />
                                                        {comment.replies} respostas
                                                    </S.ActionButton>
                                                    <S.ActionButton $variant="commentFlag">
                                                        <Flag size={14} />
                                                    </S.ActionButton>
                                                </S.CommentActions>
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
                                    <img src={flow.autor?.avatar || '/placeholder.png'} alt={flow.autor?.nome} />
                                    {flow.autor?.verificado && <S.VerifiedBadge>✓</S.VerifiedBadge>}
                                </S.Avatar>
                                <S.AuthorInfo>
                                    <S.AuthorName>{flow.autor?.nome}</S.AuthorName>
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
                            <S.Button>Duplicar Flow</S.Button>
                        </S.CardContent>
                    </S.Card>
                </S.Sidebar>
            </S.Main>

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
                                                key={index}
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
                                            <ImageIcon size={24} color="#fff" />
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