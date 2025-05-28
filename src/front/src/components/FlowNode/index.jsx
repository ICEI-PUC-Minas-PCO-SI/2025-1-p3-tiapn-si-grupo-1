import React from "react";
import { Handle, Position } from "reactflow";
import { FileText, HelpCircle, Image, Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";

import {
  NodeContainer,
  NodeHeader,
  NodeLabel,
  NodeActions,
  NodeIcon,
  HandleStyle,
} from "./style";

const FlowNode = ({ id, data }) => {
  const icons = {
    texto: <FileText size={16} />,
    decisao: <HelpCircle size={16} />,
    multimidia: <Image size={16} />,
  };

  return (
    <NodeContainer>
      <Handle
        type="target"
        position={Position.Left}
        style={{ ...HandleStyle, top: "50%", left: 3, transform: "translateY(-50%)" }} // Edite 'left' aqui para ajustar a posição
      />
      {data.tipo === "decisao" && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="yes"
            style={{ ...HandleStyle, top: "40%", right: -65 }} // Edite 'right' aqui para ajustar a posição
          />
          <Handle
            type="source"
            position={Position.Right}
            id="no"
            style={{ ...HandleStyle, top: "60%", right: -65 }} // Edite 'right' aqui para ajustar a posição
          />
        </>
      )}
      <NodeHeader>
        <NodeIcon>{icons[data.tipo] || <FileText size={16} />}</NodeIcon>
        <NodeLabel
          data-tooltip-id={`tooltip-${id}`}
          data-tooltip-content={data.content?.description || ""}
        >
          {data.label}
        </NodeLabel>
        <NodeActions>
          <button onClick={() => data.onEdit?.(id)}><Pencil size={14} /></button>
          <button onClick={() => data.onDelete?.(id)}><Trash2 size={14} /></button>
        </NodeActions>
      </NodeHeader>
      {data.tipo !== "decisao" && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ ...HandleStyle, top: "50%", right: -65, transform: "translateY(-50%)" }} // Edite 'right' aqui para ajustar a posição
        />
      )}
      <Tooltip id={`tooltip-${id}`} />
    </NodeContainer>
  );
};

export default FlowNode;