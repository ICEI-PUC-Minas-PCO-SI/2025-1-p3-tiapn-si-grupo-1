import ComponentDivider from "../ComponentDivider/Index";
import LikeButton from "./Actions/LikeButton";
import CommentButton from "./Actions/CommentButton";
import SaveButton from "./Actions/SaveButton";
import ShareButton from "./Actions/ShareButton";
import OpenFlowButton from "./Actions/OpenFlowButton";

import {
  FlowCardContainer,
  FlowWrapper,
  FlowHat,
  FlowHeader,
  Avatar,
  FlowAuthor,
  FlowCategory,
  AuthorRole,
  DaysPublished,
  ActionButton,
  ActionIcon,
  FlowPreviewWrapper,
  FlowFooter,
  AuthorInfo,
  FlowDetails,
  Dot,
  FlowDescription,
  FlowTitle,
  FlowTags,
  Tag,
  FlowNodes,
  NodeIcon,
  FlowViews,
  FlowMacro,
  ViewIcon,
} from "./style";

export default function FlowCard({ flow, userID }) {
  //Usuario
  const user = userID;
  console.log("USER ID FLOWCARD: " + user);

  //Função temporária para criar dinamicamente um "avatar" para o usuário
  const getIniciais = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (
      partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase()
    );
  };

  const getHoursAgo = (publishDate) => {
    const now = new Date();
    const date = new Date(publishDate);
    const diffMs = Math.abs(now - date);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 1) {
      return "Agora mesmo";
    } else if (diffMinutes < 60) {
      return diffMinutes === 1
        ? "1minuto atrás"
        : `${diffMinutes} minutos atrás`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? "1 hora atrás" : `${diffHours} horas atrás`;
    } else {
      return "Há mais de 24 horas";
    }
  };

  const getDaysAgo = (publishDate) => {
    const today = new Date();
    const date = new Date(publishDate);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);

    return diffDays === 0
      ? getHoursAgo(publishDate)
      : diffDays === 1
      ? `Há 1 dia`
      : diffDays < 7
      ? `${diffDays} dias atrás`
      : diffDays < 30
      ? `${Math.floor(diffDays / 7)} semana(s) atrás`
      : diffDays < 365
      ? `${Math.floor(diffDays / 30)} mês(es) atrás`
      : `${Math.floor(diffDays / 365)} ano(s) atrás`;
  };

  return (
    <FlowCardContainer>
      <FlowWrapper>
        <FlowHat>{flow.categoria}</FlowHat>
        <FlowHeader>
          <Avatar>{getIniciais(flow.usuario?.nome)}</Avatar>
          <AuthorInfo>
            <FlowAuthor>{flow.usuario?.nome}</FlowAuthor>
            <FlowDetails>
              <AuthorRole>Sales Director</AuthorRole>
              <Dot />
              <DaysPublished>{getDaysAgo(flow.criado_em)}</DaysPublished>
            </FlowDetails>
          </AuthorInfo>

          <ActionButton>
            <ActionIcon />
          </ActionButton>
        </FlowHeader>

        <FlowPreviewWrapper>
          <FlowTitle>{flow.titulo}</FlowTitle>
          <FlowDescription>
            {flow.descricao ? flow.descricao : "teste"}
          </FlowDescription>
          <FlowTags>
            {Array.isArray(flow.tags) && flow.tags.length > 0
              ? flow.tags.map((tag, index) => <Tag key={index}>#{tag}</Tag>)
              : ""}
          </FlowTags>
          <ComponentDivider />
          <FlowMacro>
            <FlowNodes>
              <NodeIcon />
              {flow.conteudo_nos.length}
              {flow.conteudo_nos.length > 1 ? " nós" : " nó"}
            </FlowNodes>
            <FlowViews>
              <ViewIcon></ViewIcon>
              {"1921"}
            </FlowViews>
          </FlowMacro>
        </FlowPreviewWrapper>
        <FlowFooter>
          <LikeButton />
          <CommentButton />
          <SaveButton />
          <ShareButton />
          <OpenFlowButton flowID={flow.id} />
        </FlowFooter>
      </FlowWrapper>
    </FlowCardContainer>
  );
}
/*
 {
    "id": "9ee8cd23-e726-4701-9d5b-0fa164264c0c",
    "titulo": "Relatórios de Resultados Mensais",
    "descricao": "Consolidação e divulgação dos resultados mensais.",
    "conteudo_nos": [
      {
        "id": "18",
        "data": "Exemplo de conteúdo"
      }
    ],
    "conteudo_conexoes": [],
    "tags": [
      "relatório",
      "resultados",
      "financeiro",
      "análise",
      "mensal"
    ],
    "categoria": "Financeiro",
    "status": "rascunho",
    "criado_em": "2025-06-01T19:54:59.878Z",
    "criado_por": "1bd732c8-b167-4c50-95d4-2f0fe153e790",
    "usuario": {
      "id": "1bd732c8-b167-4c50-95d4-2f0fe153e790",
      "nome": "Patrícia Lima"
    }
  }
*/
