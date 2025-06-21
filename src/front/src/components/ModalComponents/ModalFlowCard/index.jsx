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

export default function ModalFlowCard({ flow }) {
  console.log("ESSE É O FLOW DO MODAL:", JSON.stringify(flow, null, 2));

  //Função temporária para criar dinamicamente um "avatar" para o usuário
  const getIniciais = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (
      partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase()
    );
  };

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
            {flow.stats}
          </Info>
          <Info>
            <HeartIcon size={14} />
            27
          </Info>
          <Info>
            <CommentIcon size={14} />
            14
          </Info>
        </FlowInfo>
        <OpenFlowButton flowID={flow.id} />
      </FlowFooter>
    </FlowWrapper>
  );
}
