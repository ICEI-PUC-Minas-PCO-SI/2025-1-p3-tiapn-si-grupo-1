import OpenFlowButton from "../../FlowCard/Actions/OpenFlowButton";
import {
  FlowHeader,
  FlowWrapper,
  AuthorInfo,
  Avatar,
  FlowAuthor,
  FlowCategory,
  FlowBody,
  FlowTitle,
  FlowDescription,
  FlowTags,
  Tag,
  FlowFooter,
  FlowInfo,
  Info,
  NodeIcon,
  EyeIcon,
  HeartIcon,
  CommentIcon,
} from "./style";

import { useFlowStore } from "../../../store/flowStore";
import { useEffect, useState } from "react";

export default function ModalFlowCard({ flow }) {
  const fetchFlowsStats = useFlowStore((state) => state.fetchFlows);
  const [flows, setFlows] = useState([]);
  const IDFlow = flow.id;

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchFlowsStats();
      setFlows(response);
    };

    fetch();
  }, []);

  //Função temporária para criar dinamicamente um "avatar" para o usuário
  const getIniciais = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (
      partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase()
    );
  };

  console.log("ESSE É UM FLOW CARD DO MODAL: ", flows);

  return (
    <FlowWrapper>
      <FlowHeader>
        <AuthorInfo>
          <Avatar>{getIniciais(flow.usuario?.nome)}</Avatar>
          <FlowAuthor>{flow.usuario?.nome}</FlowAuthor>
        </AuthorInfo>
        <FlowCategory>{flow.categoria}</FlowCategory>
      </FlowHeader>
      <FlowBody>
        <FlowTitle>{flow.titulo}</FlowTitle>
        <FlowDescription>{flow.descricao}</FlowDescription>
        <FlowTags>
          {Array.isArray(flow.tags) && flow.tags.length > 0
            ? flow.tags.map((tag, index) => <Tag key={index}>#{tag}</Tag>)
            : ""}
        </FlowTags>
      </FlowBody>

      <FlowFooter>
        <FlowInfo>
          <Info>
            <NodeIcon size={14} />
            {flow.conteudo_nos?.length || 0}
            {(flow.conteudo_nos?.length || 0) !== 1 ? " nós" : " nó"}
          </Info>

          <Info>
            <EyeIcon size={14} />
            1921
          </Info>
          <Info>
            <HeartIcon size={14} />
            {flows.find((f) => f.id === IDFlow)?.stats?.likes || 0}
          </Info>
          <Info>
            <CommentIcon size={14} />
            {flows.find((f) => f.id === IDFlow)?.stats?.comments || 0}
          </Info>
        </FlowInfo>
        <OpenFlowButton flowID={flow.id} />
      </FlowFooter>
    </FlowWrapper>
  );
}
