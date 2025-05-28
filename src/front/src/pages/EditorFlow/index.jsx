import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ReactFlowProvider,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import FlowNode from "../../components/FlowNode";
import EditorModal from "../../components/EditorModal";
import Header from "../../components/HeaderNodeEditor";
import RightSidebar from "../../components/RightSidebar";
import DecisionModal from "../../components/DecisionModal";
import MediaModal from "../../components/MediaModal";

import { Container } from "./style";

const nodeTypes = {
  default: FlowNode,
};

const EditorFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flowData = location.state?.flowData;

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "default",
      position: { x: 100, y: 200 },
      data: {
        label: "Início",
        tipo: "texto",
      },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [nodeId, setNodeId] = useState(2);
  const [showSidebar, setShowSidebar] = useState(false);

  const onConnect = useCallback(
    (connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      let label = "";
      if (sourceNode.data.tipo === "decisao") {
        const option = sourceNode.data.content?.options?.find(
          (opt) => opt.id === connection.sourceHandle
        );
        label = option?.label || connection.sourceHandle;
      }
      setEdges((eds) =>
        addEdge({ ...connection, type: "smoothstep", label }, eds)
      );
    },
    [nodes, setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      setEdges((eds) => {
        const newEdges = eds.filter((e) => e.id !== oldEdge.id);
        const sourceNode = nodes.find((n) => n.id === newConnection.source);
        let label = "";
        if (sourceNode.data.tipo === "decisao") {
          const option = sourceNode.data.content?.options?.find(
            (opt) => opt.id === newConnection.sourceHandle
          );
          label = option?.label || newConnection.sourceHandle;
        }
        return addEdge({ ...newConnection, type: "smoothstep", label }, newEdges);
      });
    },
    [nodes, setEdges]
  );

  const onEdgesDelete = useCallback(
    (edgesToDelete) => {
      setEdges((eds) => eds.filter((e) => !edgesToDelete.some((ed) => ed.id === e.id)));
    },
    [setEdges]
  );

  const addNode = (tipo) => {
    const lastNode = nodes[nodes.length - 1];
    const id = `${nodeId}`;
    const newNode = {
      id,
      type: "default",
      position: { x: lastNode.position.x + 280, y: lastNode.position.y },
      data: {
        label: `Etapa ${id}`,
        tipo,
        onEdit: handleEdit,
        onDelete: handleDelete,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e-${lastNode.id}-${id}`,
        source: lastNode.id,
        target: id,
        type: "smoothstep",
      },
    ]);
    setNodeId((prev) => prev + 1);
  };

  const handleEdit = (id) => {
    const node = nodes.find((n) => n.id === id);
    if (node) {
      setActiveNode(node);
    }
  };

  const handleDelete = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  const handleNodeClick = (_, node) => {
    setActiveNode(node);
  };

  const closeModal = () => {
    setActiveNode(null);
  };

  const saveNodeContent = (id, content) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                content,
                label: content.label || node.data.label,
                onEdit: handleEdit,
                onDelete: handleDelete,
              },
            }
          : node
      )
    );
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode?.id === id && sourceNode.data.tipo === "decisao") {
          const option = content.options?.find(
            (opt) => opt.id === edge.sourceHandle
          );
          return { ...edge, label: option?.label || edge.sourceHandle };
        }
        return edge;
      })
    );
    setActiveNode(null);
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <ReactFlowProvider>
      <Container>
        <Header
          flowData={activeNode ? { titulo: activeNode.data.label } : flowData}
          onAddNode={addNode}
          onBack={
            activeNode
              ? () => saveNodeContent(activeNode.id, activeNode.data.content || {})
              : () => navigate("/criar-flow")
          }
          onToggleSidebar={toggleSidebar}
          isModalOpen={!!activeNode}
        />

        {!activeNode && (
          <div style={{ flex: 1, position: "relative" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeUpdate={onEdgeUpdate}
              onEdgesDelete={onEdgesDelete}
              onNodeClick={handleNodeClick}
              nodeTypes={nodeTypes}
              fitView
              defaultEdgeOptions={{
                type: "smoothstep",
                animated: true,
                style: { stroke: "#888", strokeWidth: 2 },
                labelStyle: { fill: "#333", fontSize: 12 },
                labelBgStyle: { fill: "#fff", fillOpacity: 0.8, padding: 5 },
              }}
            >
              <Background gap={20} />
              <Controls />
            </ReactFlow>
          </div>
        )}

        {showSidebar && <RightSidebar flowData={flowData} />}
        {activeNode && activeNode.data.tipo === "texto" && (
          <EditorModal
            node={activeNode}
            onClose={closeModal}
            onSave={saveNodeContent}
            showSidebar={showSidebar}
          />
        )}
        {activeNode && activeNode.data.tipo === "decisao" && (
          <DecisionModal
            node={activeNode}
            onClose={closeModal}
            onSave={saveNodeContent}
          />
        )}
        {activeNode && activeNode.data.tipo === "multimidia" && (
          <MediaModal
            node={activeNode}
            onClose={closeModal}
            onSave={saveNodeContent}
          />
        )}
      </Container>
    </ReactFlowProvider>
  );
};

export default EditorFlow;