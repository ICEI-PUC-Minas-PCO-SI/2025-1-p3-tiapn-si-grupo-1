import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Save,
  ArrowLeft,
  Type,
  GitBranch,
  ImageIcon,
  ChevronRight,
  ChevronLeft,
  Play,
  X,
  Plus,
  Upload,
  File,
  Sparkles,
  Zap,
  Target,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';
import TextNode from '../../components/TextNode';
import DecisionNode from '../../components/DecisionNode';
import MediaNode from '../../components/MediaNode';
import * as S from './style';

console.log('🧪 Componentes de estilo carregados:', Object.keys(S));

const nodeTypes = {
  textNode: TextNode,
  decisionNode: DecisionNode,
  mediaNode: MediaNode,
};

const initialNodes = [];
const initialEdges = [];

const editorSteps = [
  { id: 1, title: 'Configuração', description: 'Defina título e metadados', icon: Target },
  { id: 2, title: 'Construção', description: 'Crie o flow visual', icon: Zap },
  { id: 3, title: 'Publicação', description: 'Revise e publique', icon: CheckCircle },
];

const FlowEditor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [flowData, setFlowData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
  });
  const [nodeData, setNodeData] = useState({
    title: '',
    content: '',
    question: '',
    options: ['Opção 1', 'Opção 2'],
    mediaFile: null,
    mediaUrl: '',
  });
  const [isPublic, setIsPublic] = useState(true);
  const reactFlowWrapper = useRef(null);
  const fileInputRef = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((eds) => {
        const newEdges = eds.filter((e) => e.id !== oldEdge.id);
        return addEdge({ ...newConnection, animated: true }, newEdges);
      }),
    [setEdges]
  );

  const addNode = useCallback(
    (type) => {
      const positions = [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 500, y: 100 },
        { x: 100, y: 300 },
        { x: 300, y: 300 },
        { x: 500, y: 300 },
      ];
      const position = positions[nodes.length % positions.length] || { x: 100, y: 100 };
      const newNode = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        position,
        data: {
          title: '',
          content: type === 'textNode' ? '' : undefined,
          question: type === 'decisionNode' ? '' : undefined,
          options: type === 'decisionNode' ? ['Opção 1', 'Opção 2'] : undefined,
          mediaUrl: type === 'mediaNode' ? '' : undefined,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setNodeData({
      title: node.data.title || '',
      content: node.data.content || '',
      question: node.data.question || '',
      options: node.data.options && node.data.options.length ? node.data.options : ['Opção 1', 'Opção 2'],
      mediaFile: null,
      mediaUrl: node.data.mediaUrl || '',
    });
    setIsNodeModalOpen(true);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isImage) {
      toast.error('Por favor, selecione um arquivo de imagem válido (PNG, JPG, SVG).');
      return;
    }

    if (!isValidSize) {
      toast.error('A imagem deve ter no máximo 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (typeof result === 'string') {
        setNodeData((prev) => ({
          ...prev,
          mediaFile: file,
          mediaUrl: result,
        }));
      } else {
        toast.error('Erro ao processar a imagem.');
      }
    };
    reader.onerror = () => {
      toast.error('Falha ao carregar a imagem. Tente novamente.');
    };
    reader.readAsDataURL(file);
  };

  const saveNodeData = () => {
    if (!selectedNode) return;

    console.log('📤 Salvando nó com mediaUrl:', nodeData.mediaUrl);
    console.log('🧠 Tipo de mediaUrl:', typeof nodeData.mediaUrl);
    console.log('📦 nodeData completo:', nodeData);

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? {
            ...node,
            data: {
              title: nodeData.title,
              content: nodeData.content || undefined,
              question: nodeData.question || undefined,
              options: nodeData.options?.filter((opt) => opt.trim()).slice(0, 3) || ['Opção 1', 'Opção 2'],
              mediaUrl: nodeData.mediaUrl || undefined,
            },
          }
          : node
      )
    );
    setIsNodeModalOpen(false);
    toast.success('Alterações no nó salvas com sucesso!');
  };

  const deleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
    );
    setIsNodeModalOpen(false);
    toast.success('Nó excluído com sucesso!');
  };

  const publishFlow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Você precisa estar autenticado para publicar um flow.');
        return;
      }

      if (!flowData.title || !flowData.description || !flowData.category) {
        toast.error('Título, descrição e categoria são obrigatórios.');
        return;
      }

      const tagsArray = flowData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const response = await axios.post(
        'http://localhost:3000/api/flow',
        {
          titulo: flowData.title,
          descricao: flowData.description,
          conteudo_nos: nodes,
          conteudo_conexoes: edges,
          categoria: flowData.category,
          tags: tagsArray,
          status: isPublic ? 'publicado' : 'rascunho',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Flow publicado com sucesso!');
      console.log('Flow criado:', response.data);
      setFlowData({ title: '', description: '', category: '', tags: '' });
      setNodes([]);
      setEdges([]);
      setCurrentStep(1);
    } catch (error) {
      console.error('Erro ao publicar flow:', error);
      const errorMessage = error.response?.data?.erro || 'Erro ao publicar flow. Tente novamente.';
      toast.error(errorMessage);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / 3) * 100;

  return (
    <S.Container>
      <S.ToastOverride>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          style={{ top: '75px' }}
          newestOnTop={false}
          closeOnClick
          priority={false}
          pauseOnHover
          theme="light"
        />
      </S.ToastOverride>
      <S.Header>
        <S.HeaderContent>
          <S.LeftSection>
            <S.BackButton onClick={() => (window.location.href = '/feed')}>
              <ArrowLeft size={12} />
              Voltar
            </S.BackButton>
            <S.TitleWrapper>
              <S.Title>{flowData.title || 'Novo Flow'}</S.Title>
              <S.Subtitle>
                Etapa {currentStep}: {editorSteps[currentStep - 1].description}
              </S.Subtitle>
            </S.TitleWrapper>
          </S.LeftSection>
          <S.StepsWrapper>
            {editorSteps.map((step, index) => (
              <S.Step key={step.id}>
                <S.StepIcon $active={currentStep >= step.id}>
                  <step.icon size={12} />
                </S.StepIcon>
                <S.StepTitle $active={currentStep >= step.id}>{step.title}</S.StepTitle>
                {index < editorSteps.length - 1 && (
                  <S.StepConnector $active={currentStep > step.id} />
                )}
              </S.Step>
            ))}
          </S.StepsWrapper>
          <S.HeaderActions>
            <S.ProgressWrapper>
              <S.ProgressBar value={progress} max={100} />
              <S.ProgressText>{Math.round(progress)}%</S.ProgressText>
            </S.ProgressWrapper>
            <S.SaveButton>
              <Save size={12} />
              Salvar
            </S.SaveButton>
          </S.HeaderActions>
        </S.HeaderContent>
      </S.Header>

      <S.Content>
        {currentStep === 1 && (
          <S.ConfigSection>
            <S.Card>
              <S.CardHeader>
                <S.CardTitle>
                  <Target size={20} color="#233DFF" />
                  Configuração do Flow
                </S.CardTitle>
                <S.CardDescription>Configure os detalhes básicos do seu flow</S.CardDescription>
              </S.CardHeader>
              <S.CardContent>
                <S.FormGroup>
                  <S.Label>Título do Flow *</S.Label>
                  <S.Input
                    value={flowData.title}
                    onChange={(e) => setFlowData({ ...flowData, title: e.target.value })}
                    placeholder="Ex: Sistema de Design Completo"
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label>Descrição *</S.Label>
                  <S.Textarea
                    value={flowData.description}
                    onChange={(e) => setFlowData({ ...flowData, description: e.target.value })}
                    placeholder="Descreva o objetivo e conteúdo do seu flow..."
                    rows={3}
                  />
                </S.FormGroup>
                <S.FormRow>
                  <S.FormGroup>
                    <S.Label>Categoria *</S.Label>
                    <S.Select
                      value={flowData.category}
                      onChange={(e) => setFlowData({ ...flowData, category: e.target.value })}
                    >
                      <option value="">Selecione</option>
                      <option value="desenvolvimento">Desenvolvimento</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="vendas">Vendas</option>
                      <option value="produto">Produto</option>
                    </S.Select>
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>Tags</S.Label>
                    <S.Input
                      value={flowData.tags}
                      onChange={(e) => setFlowData({ ...flowData, tags: e.target.value })}
                      placeholder="design, figma, react"
                    />
                  </S.FormGroup>
                </S.FormRow>
                <S.ButtonWrapper>
                  <S.NextButton onClick={nextStep}>
                    Próxima Etapa
                    <ChevronRight size={16} />
                  </S.NextButton>
                </S.ButtonWrapper>
              </S.CardContent>
            </S.Card>
          </S.ConfigSection>
        )}

        {currentStep === 2 && (
          <S.EditorSection>
            <S.Sidebar>
              <S.SidebarSection>
                <S.SidebarTitle>
                  <Sparkles size={16} color="#233DFF" />
                  Adicionar Nós
                </S.SidebarTitle>
                <S.NodeButton onClick={() => addNode('textNode')}>
                  <S.NodeIcon color="#233DFF">
                    <Type size={16} color="#fff" />
                  </S.NodeIcon>
                  <div>
                    <S.NodeTitle>Conteúdo</S.NodeTitle>
                    <S.NodeDescription>Texto</S.NodeDescription>
                  </div>
                </S.NodeButton>
                <S.NodeButton onClick={() => addNode('decisionNode')}>
                  <S.NodeIcon color="#6366F1">
                    <GitBranch size={16} color="#fff" />
                  </S.NodeIcon>
                  <div>
                    <S.NodeTitle>Decisão</S.NodeTitle>
                    <S.NodeDescription>Ramificações</S.NodeDescription>
                  </div>
                </S.NodeButton>
                <S.NodeButton onClick={() => addNode('mediaNode')}>
                  <S.NodeIcon color="#8B5CF6">
                    <ImageIcon size={16} color="#fff" />
                  </S.NodeIcon>
                  <div>
                    <S.NodeTitle>Imagem</S.NodeTitle>
                    <S.NodeDescription>Imagens PNG/JPG/SVG</S.NodeDescription>
                  </div>
                </S.NodeButton>
              </S.SidebarSection>
              <S.SidebarSection>
                <S.SidebarTitle>Estatísticas</S.SidebarTitle>
                <S.StatsCard>
                  <S.Stat>
                    <S.StatValue color="#233DFF">{nodes.length}</S.StatValue>
                    <S.StatLabel>Nós</S.StatLabel>
                  </S.Stat>
                  <S.Stat>
                    <S.StatValue color="#6366F1">{edges.length}</S.StatValue>
                    <S.StatLabel>Conexões</S.StatLabel>
                  </S.Stat>
                </S.StatsCard>
              </S.SidebarSection>
            </S.Sidebar>
            <S.Canvas ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="top-right"
                edgesUpdatable
              >
                <MiniMap nodeColor="#233DFF" zoomable pannable />
                <Controls />
                <Background variant="dots" gap={12} size={1} />
              </ReactFlow>
            </S.Canvas>
          </S.EditorSection>
        )}

        {currentStep === 3 && (
          <S.PublishSection>
            <S.Card>
              <S.CardHeader>
                <S.CardTitle>
                  <CheckCircle size={20} color="#233DFF" />
                  Revisão e Publicação
                </S.CardTitle>
                <S.CardDescription>Revise seu flow e configure as opções de publicação</S.CardDescription>
              </S.CardHeader>
              <S.CardContent>
                <S.SummaryCard>
                  <S.SummaryTitle>Resumo do Flow</S.SummaryTitle>
                  <S.SummaryGrid>
                    <div>
                      <S.SummaryLabel>Título:</S.SummaryLabel>
                      <S.SummaryValue>{flowData.title || 'Não definido'}</S.SummaryValue>
                    </div>
                    <div>
                      <S.SummaryLabel>Categoria:</S.SummaryLabel>
                      <S.SummaryValue>{flowData.category || 'Não definida'}</S.SummaryValue>
                    </div>
                    <div>
                      <S.SummaryLabel>Nós criados:</S.SummaryLabel>
                      <S.SummaryValue>{nodes.length}</S.SummaryValue>
                    </div>
                    <div>
                      <S.SummaryLabel>Conexões:</S.SummaryLabel>
                      <S.SummaryValue>{edges.length}</S.SummaryValue>
                    </div>
                  </S.SummaryGrid>
                </S.SummaryCard>
                <S.PublishOptions>
                  <S.PublishTitle>Configurações de Publicação</S.PublishTitle>
                  <S.CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <div>
                      <S.CheckboxTitle>Tornar público</S.CheckboxTitle>
                      <S.CheckboxDescription>Visível para toda a comunidade</S.CheckboxDescription>
                    </div>
                  </S.CheckboxLabel>
                  <S.CheckboxLabel>
                    <input type="checkbox" defaultChecked />
                    <div>
                      <S.CheckboxTitle>Permitir comentários</S.CheckboxTitle>
                      <S.CheckboxDescription>Usuários podem comentar e dar feedback</S.CheckboxDescription>
                    </div>
                  </S.CheckboxLabel>
                </S.PublishOptions>
                <S.ButtonWrapper>
                  <S.PrevButton onClick={prevStep}>
                    <ChevronLeft size={16} />
                    Voltar
                  </S.PrevButton>
                  <S.ButtonGroup>
                    <S.DraftButton>Salvar Rascunho</S.DraftButton>
                    <S.PublishButton onClick={publishFlow}>
                      <Play size={16} />
                      Publicar Flow
                    </S.PublishButton>
                  </S.ButtonGroup>
                </S.ButtonWrapper>
              </S.CardContent>
            </S.Card>
          </S.PublishSection>
        )}
      </S.Content>

      {currentStep === 2 && (
        <S.Footer>
          <S.PrevButton onClick={prevStep}>
            <ChevronLeft size={16} />
            Configuração
          </S.PrevButton>
          <S.NextButton onClick={nextStep}>
            Revisar e Publicar
            <ChevronRight size={16} />
          </S.NextButton>
        </S.Footer>
      )}

      {isNodeModalOpen && (
        <S.Modal>
          <S.ModalContent>
            <S.ModalHeader>
              <S.ModalTitle>
                {selectedNode?.type === 'textNode' && <Type size={20} color="#233DFF" />}
                {selectedNode?.type === 'decisionNode' && <GitBranch size={20} color="#6366F1" />}
                {selectedNode?.type === 'mediaNode' && <ImageIcon size={20} color="#8B5CF6" />}
                Editar{' '}
                {selectedNode?.type === 'textNode'
                  ? 'Nó de Conteúdo'
                  : selectedNode?.type === 'decisionNode'
                    ? 'Nó de Decisão'
                    : 'Nó de Imagem'}
              </S.ModalTitle>
              <S.ModalDescription>Configure o conteúdo e comportamento do nó</S.ModalDescription>
            </S.ModalHeader>
            <S.ModalBody>
              {selectedNode?.type === 'textNode' && (
                <>
                  <S.FormGroup>
                    <S.Label>Título do Conteúdo</S.Label>
                    <S.Input
                      value={nodeData.title}
                      onChange={(e) => setNodeData({ ...nodeData, title: e.target.value })}
                      placeholder="Ex: Introdução ao Design System"
                    />
                    <S.FormHint>Um título claro e descritivo para este conteúdo</S.FormHint>
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>Conteúdo</S.Label>
                    <S.Textarea
                      value={nodeData.content}
                      onChange={(e) => setNodeData({ ...nodeData, content: e.target.value })}
                      placeholder="Digite o conteúdo que será exibido neste nó..."
                      rows={8}
                    />
                    <S.FormHint>Suporte a markdown básico: **negrito**, *itálico*, `código`</S.FormHint>
                  </S.FormGroup>
                </>
              )}
              {selectedNode?.type === 'decisionNode' && (
                <>
                  <S.FormGroup>
                    <S.Label>Pergunta ou Decisão</S.Label>
                    <S.Input
                      value={nodeData.question}
                      onChange={(e) => setNodeData({ ...nodeData, question: e.target.value })}
                      placeholder="Ex: Qual é seu nível de experiência com DS?"
                    />
                    <S.FormHint>Formule uma pergunta clara que levará a diferentes caminhos</S.FormHint>
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>Opções de Resposta (máximo 3)</S.Label>
                    {nodeData.options.map((option, index) => (
                      <S.OptionRow key={index}>
                        <S.OptionNumber>{index + 1}</S.OptionNumber>
                        <S.Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...nodeData.options];
                            newOptions[index] = e.target.value;
                            setNodeData({ ...nodeData, options: newOptions });
                          }}
                          placeholder={`Opção ${index + 1}`}
                        />
                        {nodeData.options.length > 1 && (
                          <S.RemoveOptionButton
                            onClick={() => {
                              const newOptions = nodeData.options.filter((_, i) => i !== index);
                              setNodeData({ ...nodeData, options: newOptions });
                            }}
                          >
                            <X size={16} />
                          </S.RemoveOptionButton>
                        )}
                      </S.OptionRow>
                    ))}
                    {nodeData.options.length < 3 && (
                      <S.AddOptionButton
                        onClick={() => setNodeData({ ...nodeData, options: [...nodeData.options, ''] })}
                      >
                        <Plus size={16} />
                        Adicionar Nova Opção
                      </S.AddOptionButton>
                    )}
                    <S.FormHint>Cada opção criará um caminho diferente. Mínimo 1, máximo 3.</S.FormHint>
                  </S.FormGroup>
                </>
              )}
              {selectedNode?.type === 'mediaNode' && (
                <>
                  <S.FormGroup>
                    <S.Label>Título da Imagem</S.Label>
                    <S.Input
                      value={nodeData.title}
                      onChange={(e) => setNodeData({ ...nodeData, title: e.target.value })}
                      placeholder="Ex: Diagrama do Sistema"
                    />
                    <S.FormHint>Nome descritivo para a imagem</S.FormHint>
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>Upload de Imagem</S.Label>
                    <S.UploadArea>
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                      {nodeData.mediaUrl ? (
                        <S.UploadContent>
                          <S.FileIcon>
                            <img
                              src={nodeData.mediaUrl}
                              alt="Preview"
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                          </S.FileIcon>
                          <div>
                            <S.FileName>{nodeData.mediaFile?.name || 'Imagem selecionada'}</S.FileName>
                            {nodeData.mediaFile && (
                              <S.FileSize>
                                {(nodeData.mediaFile.size / 1024 / 1024).toFixed(2)} MB
                              </S.FileSize>
                            )}
                          </div>
                          <S.UploadButtons>
                            <S.UploadButton onClick={() => fileInputRef.current?.click()}>
                              <Upload size={16} />
                              Trocar Imagem
                            </S.UploadButton>
                            <S.RemoveFileButton
                              onClick={() => setNodeData({ ...nodeData, mediaFile: null, mediaUrl: '' })}
                            >
                              <X size={16} />
                              Remover
                            </S.RemoveFileButton>
                          </S.UploadButtons>
                        </S.UploadContent>
                      ) : (
                        <S.UploadContent>
                          <S.UploadIcon>
                            <Upload size={24} color="#64748B" />
                          </S.UploadIcon>
                          <div>
                            <S.UploadText>Clique para fazer upload ou arraste a imagem aqui</S.UploadText>
                            <S.UploadHint>Suporte para PNG, JPG, SVG até 10MB</S.UploadHint>
                          </div>
                          <S.UploadButton onClick={() => fileInputRef.current?.click()}>
                            <Upload size={16} />
                            Selecionar Imagem
                          </S.UploadButton>
                        </S.UploadContent>
                      )}
                    </S.UploadArea>
                  </S.FormGroup>
                </>
              )}
            </S.ModalBody>
            <S.ModalFooter>
              <S.DeleteButton onClick={deleteNode}>
                <X size={16} />
                Excluir Nó
              </S.DeleteButton>
              <S.ButtonGroup>
                <S.CancelButton onClick={() => setIsNodeModalOpen(false)}>Cancelar</S.CancelButton>
                <S.SaveButton onClick={saveNodeData}>
                  <CheckCircle size={16} />
                  Salvar Alterações
                </S.SaveButton>
              </S.ButtonGroup>
            </S.ModalFooter>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};

export default FlowEditor;