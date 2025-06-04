import { Heart, Bookmark, MessageCircle } from "lucide-react";
import LikeButton from "./Actions/LikeButton";
import CommentButton from "./Actions/CommentButton";
import SaveButton from "./Actions/SaveButton";
import {
  FlowWrapper,
  FlowHat,
  FlowHeader,
  Avatar,
  FlowAuthor,
  FlowCategory,
  DaysPublished,
  ActionButton,
  ActionIcon,
  FlowPreviewWrapper,
  FlowFooter,
} from "./style";

export default function FlowCard({ flow }) {
  //Função temporária para criar dinamicamente um "avatar" para o usuário
  const getIniciais = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (
      partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase()
    );
  };

  const getDaysAgo = (publishDate) => {
    const today = new Date();
    const date = new Date(publishDate);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 0
      ? "Hoje"
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
    <FlowWrapper>
      <FlowHat />
      <FlowHeader>
        <Avatar>{getIniciais(flow.usuario?.nome)}</Avatar>
        <FlowAuthor>{flow.usuario.nome} /</FlowAuthor>
        <FlowCategory>{`${" "} #${flow.categoria}`}</FlowCategory>
        <span
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#565656",
            borderRadius: "50%",
          }}
        />
        <DaysPublished>{getDaysAgo(flow.criado_em)}</DaysPublished>
        <ActionButton>
          <ActionIcon />
        </ActionButton>
      </FlowHeader>

      <FlowPreviewWrapper>
        <h2>{flow.titulo}</h2>
        <p>{flow.descricao ? flow.descricao : "teste"}</p>
      </FlowPreviewWrapper>

      <FlowFooter>
        <LikeButton />
        <CommentButton />
        <SaveButton />
      </FlowFooter>
    </FlowWrapper>
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
