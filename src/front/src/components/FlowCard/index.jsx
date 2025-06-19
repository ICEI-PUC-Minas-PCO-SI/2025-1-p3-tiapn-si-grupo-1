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
          <LikeButton likes={flow.stats?.likes || 0} />
          <CommentButton comments={flow.stats?.comments || 0} />
          <SaveButton saves={flow.stats?.saves || 0} />
          <ShareButton />
          <OpenFlowButton flowID={flow.id} />
        </FlowFooter>
      </FlowWrapper>
    </FlowCardContainer>
  );
}