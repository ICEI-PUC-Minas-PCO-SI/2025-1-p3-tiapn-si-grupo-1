import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Save, ArrowLeft, Plus, Edit, Trash2, LinkIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import NodeEditor from '../../components/NodeEditor';
import {
  Container,
  Header,
  Title,
  FlowContainer,
  Button,
  ButtonGroup,
  NodeContainer,
  NodeHeader,
  NodeContent,
  EditorModal,
  EditorContainer,
  EditorHeader,
  EditorTitle,
  EditorContent,
  Toolbar,
  ToolbarButton,
  NodeTypeSelector,
  NodeTypeOption,
  NodeFormField,
  NodeFormLabel,
  NodeFormInput,
  SaveIndicator,
  InfoPanelBottom,
  InfoPanelBottomHeader,
  InfoContent,
  InfoSection,
  InfoSectionTitle,
  TagsContainer,
  Tag,
  PublishButton
} from './style';

// Componentes para os diferentes tipos de nós
const DefaultNode = ({ data }) => (
  <NodeContainer type="default">
    <NodeHeader>
      {data.label}
    </NodeHeader>
    <NodeContent dangerouslySetInnerHTML={{ __html: data.content }} />
  </NodeContainer>
);

const DecisionNode = ({ data }) => (
  <NodeContainer type="decision">
    <NodeHeader>
      {data.label}
    </NodeHeader>
    <NodeContent dangerouslySetInnerHTML={{ __html: data.content }} />
  </NodeContainer>
);

const ProcessNode = ({ data }) => (
  <NodeContainer type="process">
    <NodeHeader>
      {data.label}
    </NodeHeader>
    <NodeContent dangerouslySetInnerHTML={{ __html: data.content }} />
  </NodeContainer>
);

const DocumentNode = ({ data }) => (
  <NodeContainer type="document">
    <NodeHeader>
      {data.label}
    </NodeHeader>
    <NodeContent dangerouslySetInnerHTML={{ __html: data.content }} />
  </NodeContainer>
);

// Tipos de nós disponíveis
const nodeTypes = {
  default: DefaultNode,
  decision: DecisionNode,
  process: ProcessNode,
  document: DocumentNode,
};

const EditorFlow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNodeFormOpen, setIsNodeFormOpen] = useState(false);
  const [isConnectionMode, setIsConnectionMode] = useState(false);
  const [nodeFormData, setNodeFormData] = useState({
    label: '',
    type: 'default'
  });
  const [flowData, setFlowData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
  
  // Carregar dados do flow
  useEffect(() => {
    const flows = JSON.parse(localStorage.getItem('knowflow_flows') || '[]');
    const currentFlow = flows.find(flow => flow.id === id);
    
    if (currentFlow) {
      setFlowData(currentFlow);
      
      // Se já existirem nós e arestas, carregá-los
      if (currentFlow.nodes && currentFlow.nodes.length > 0) {
        setNodes(currentFlow.nodes);
      } else {
        // Caso contrário, criar um nó inicial
        const initialNode = {
          id: 'node-1',
          type: 'default',
          position: { x: 250, y: 250 },
          data: { 
            label: currentFlow.titulo || 'Flow inicial',
            content: '<p>Clique para editar o conteúdo...</p>'
          }
        };
        setNodes([initialNode]);
      }
      
      if (currentFlow.edges && currentFlow.edges.length > 0) {
        setEdges(currentFlow.edges);
      }
    }
  }, [id, setNodes, setEdges]);
  
  // Função para conectar nós
  const onConnect = useCallback((params) => {
    // Configurar a conexão com uma seta
    const connection = {
      ...params,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20
      },
      style: { strokeWidth: 2 }
    };
    
    setEdges((eds) => addEdge(connection, eds));
    
    // Desativar o modo de conexão após conectar
    setIsConnectionMode(false);
  }, [setEdges]);
  
  // Função para permitir soltar nós no canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Função para adicionar nó quando soltar no canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // Verificar se o tipo é válido
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { 
          label: 'Novo nó', 
          content: '<p>Clique para editar o conteúdo...</p>' 
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  
  // Função para abrir o editor quando clicar em um nó
  const onNodeClick = (event, node) => {
    // Se estiver no modo de conexão, não abrir o editor
    if (isConnectionMode) return;
    
    setSelectedNode(node);
    setIsEditorOpen(true);
  };
  
  // Função para salvar o conteúdo editado
  const handleEditorSave = (content) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              content,
            },
          };
        }
        return node;
      })
    );
    setIsEditorOpen(false);
    
    // Mostrar indicador de salvamento
    showSaveIndicator('Conteúdo do nó salvo!');
  };
  
  // Função para fechar o editor
  const handleEditorClose = () => {
    setIsEditorOpen(false);
    setSelectedNode(null);
  };
  
  // Função para salvar o flow completo
  const handleSaveFlow = () => {
    setIsSaving(true);
    
    // Atualizar o flow com os nós e arestas atuais
    const updatedFlow = {
      ...flowData,
      nodes,
      edges
    };
    
    // Atualizar no localStorage
    const flows = JSON.parse(localStorage.getItem('knowflow_flows') || '[]');
    const updatedFlows = flows.map(flow => 
      flow.id === id ? updatedFlow : flow
    );
    
    localStorage.setItem('knowflow_flows', JSON.stringify(updatedFlows));
    
    // Mostrar indicador de salvamento
    showSaveIndicator('Flow salvo com sucesso!');
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  // Função para mostrar o indicador de salvamento
  const showSaveIndicator = (message) => {
    setSaveMessage(message);
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };
  
  // Função para abrir o formulário de novo nó
  const handleOpenNodeForm = () => {
    setNodeFormData({
      label: '',
      type: 'default'
    });
    setIsNodeFormOpen(true);
  };
  
  // Função para adicionar um novo nó
  const handleAddNode = () => {
    const { label, type } = nodeFormData;
    
    if (!label.trim()) {
      alert('Por favor, insira um título para o nó');
      return;
    }
    
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 300 + 50 
      },
      data: { 
        label, 
        content: '<p>Clique para editar o conteúdo...</p>' 
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    setIsNodeFormOpen(false);
    
    // Mostrar indicador de salvamento
    showSaveIndicator('Novo nó adicionado!');
  };
  
  // Função para excluir o nó selecionado
  const handleDeleteNode = () => {
    if (!selectedNode) return;
    
    // Remover o nó
    setNodes((nds) => nds.filter(node => node.id !== selectedNode.id));
    
    // Remover todas as arestas conectadas a este nó
    setEdges((eds) => eds.filter(
      edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    
    setIsEditorOpen(false);
    setSelectedNode(null);
    
    // Mostrar indicador de salvamento
    showSaveIndicator('Nó excluído!');
  };
  
  // Função para arrastar um tipo de nó para o canvas
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  // Função para alternar o modo de conexão
  const toggleConnectionMode = () => {
    setIsConnectionMode(!isConnectionMode);
    
    // Atualizar os nós para serem conectáveis ou não
    setNodes((nds) => 
      nds.map(node => ({
        ...node,
        connectable: !isConnectionMode
      }))
    );
    
    // Mostrar mensagem
    showSaveIndicator(isConnectionMode ? 'Modo de conexão desativado' : 'Modo de conexão ativado. Clique e arraste entre nós para conectá-los.');
  };
  
  // Função para alternar o painel inferior
  const toggleBottomPanel = () => {
    setIsBottomPanelOpen(!isBottomPanelOpen);
  };
  
  return (
    <Container>
      <Header>
        <ButtonGroup>
          <Button onClick={() => navigate('/criar-flow')}>
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Title>Editando: {flowData?.titulo || id}</Title>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={toggleConnectionMode} primary={isConnectionMode}>
            <LinkIcon size={16} />
            {isConnectionMode ? 'Desativar Conexão' : 'Conectar Nós'}
          </Button>
          <Button primary onClick={handleSaveFlow} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? 'Salvando...' : 'Salvar Flow'}
          </Button>
        </ButtonGroup>
      </Header>
      
      <FlowContainer>
        <ReactFlowProvider>
          <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              deleteKeyCode="Delete"
              connectOnClick={isConnectionMode}
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
              
              <Panel position="top-left">
                <Toolbar>
                  <ToolbarButton onClick={handleOpenNodeForm}>
                    <Plus size={16} />
                    Adicionar Nó
                  </ToolbarButton>
                  
                  <NodeTypeSelector>
                    <NodeTypeOption
                      draggable
                      onDragStart={(event) => onDragStart(event, 'default')}
                    >
                      Nó Padrão
                    </NodeTypeOption>
                    <NodeTypeOption
                      draggable
                      onDragStart={(event) => onDragStart(event, 'decision')}
                    >
                      Decisão
                    </NodeTypeOption>
                    <NodeTypeOption
                      draggable
                      onDragStart={(event) => onDragStart(event, 'process')}
                    >
                      Processo
                    </NodeTypeOption>
                    <NodeTypeOption
                      draggable
                      onDragStart={(event) => onDragStart(event, 'document')}
                    >
                      Documento
                    </NodeTypeOption>
                  </NodeTypeSelector>
                </Toolbar>
              </Panel>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </FlowContainer>
      
      {/* Modal para editar o conteúdo do nó */}
      {isEditorOpen && selectedNode && (
        <EditorModal>
          <EditorContainer>
            <EditorHeader>
              <EditorTitle>Editando: {selectedNode.data.label}</EditorTitle>
              <ButtonGroup>
                <Button onClick={handleDeleteNode} className="danger-button">
                  <Trash2 size={16} />
                  Excluir Nó
                </Button>
                <Button onClick={handleEditorClose}>Cancelar</Button>
                <Button primary onClick={() => handleEditorSave(document.getElementById('editor').innerHTML)}>
                  Salvar
                </Button>
              </ButtonGroup>
            </EditorHeader>
            <EditorContent>
              <NodeEditor 
                initialContent={selectedNode.data.content} 
                onSave={handleEditorSave}
              />
            </EditorContent>
          </EditorContainer>
        </EditorModal>
      )}
      
      {/* Modal para adicionar novo nó */}
      {isNodeFormOpen && (
        <EditorModal>
          <EditorContainer>
            <EditorHeader>
              <EditorTitle>Adicionar Novo Nó</EditorTitle>
              <ButtonGroup>
                <Button onClick={() => setIsNodeFormOpen(false)}>Cancelar</Button>
                <Button primary onClick={handleAddNode}>
                  Adicionar
                </Button>
              </ButtonGroup>
            </EditorHeader>
            <EditorContent>
              <NodeFormField>
                <NodeFormLabel>Título do Nó</NodeFormLabel>
                <NodeFormInput 
                  type="text" 
                  value={nodeFormData.label}
                  onChange={(e) => setNodeFormData({...nodeFormData, label: e.target.value})}
                  placeholder="Digite o título do nó"
                />
              </NodeFormField>
              
              <NodeFormField>
                <NodeFormLabel>Tipo de Nó</NodeFormLabel>
                <select 
                  value={nodeFormData.type}
                  onChange={(e) => setNodeFormData({...nodeFormData, type: e.target.value})}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    width: '100%'
                  }}
                >
                  <option value="default">Nó Padrão</option>
                  <option value="decision">Decisão</option>
                  <option value="process">Processo</option>
                  <option value="document">Documento</option>
                </select>
              </NodeFormField>
            </EditorContent>
          </EditorContainer>
        </EditorModal>
      )}
      
      {/* Indicador de salvamento */}
      {saveMessage && (
        <SaveIndicator>
          {saveMessage}
        </SaveIndicator>
      )}
      
      {/* Painel inferior de informações e comentários */}
      <InfoPanelBottom isOpen={isBottomPanelOpen}>
        <InfoPanelBottomHeader onClick={toggleBottomPanel}>
          Informações e Comentários
          {isBottomPanelOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </InfoPanelBottomHeader>
        {isBottomPanelOpen && (
          <InfoContent>
            <InfoSection>
              <InfoSectionTitle>Descrição</InfoSectionTitle>
              <p>{flowData?.descricao || 'Descrição digitada'}</p>
            </InfoSection>
            
            <InfoSection>
              <InfoSectionTitle>Categorias</InfoSectionTitle>
              <TagsContainer>
                {flowData?.categorias?.map((categoria, index) => (
                  <Tag key={index}>{categoria}</Tag>
                )) || (
                  <>
                    <Tag>Lorem ipsum</Tag>
                    <Tag>Sketch</Tag>
                    <Tag>Lorem ipsum</Tag>
                    <Tag>Sketch</Tag>
                    <Tag>XD</Tag>
                    <Tag>Sketch</Tag>
                  </>
                )}
              </TagsContainer>
            </InfoSection>
            
            <InfoSection>
              <InfoSectionTitle>Tags</InfoSectionTitle>
              <TagsContainer>
                {flowData?.tags?.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                )) || (
                  <>
                    <Tag>Figma</Tag>
                    <Tag>Prototyping</Tag>
                  </>
                )}
              </TagsContainer>
            </InfoSection>
            
            <PublishButton>
              Publique seu Flow para que as pessoas possam interagir com ele!
            </PublishButton>
          </InfoContent>
        )}
      </InfoPanelBottom>
    </Container>
  );
};

export default EditorFlow;