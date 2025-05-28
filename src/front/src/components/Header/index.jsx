import React from "react";
import {
  HeaderContainer,
  TitleBlock,
  FlowTitle,
  Actions,
  AddNodeMenu,
  IconButton,
} from "./style";
import {
  ArrowLeft,
  FileText,
  HelpCircle,
  Image,
  MoreVertical,
} from "lucide-react";

const Header = ({
  flowData,
  onAddNode,
  onBack,
  onToggleSidebar,
  isModalOpen,
}) => {
  return (
    <HeaderContainer $isModalOpen={isModalOpen}>
      <TitleBlock>
        <p>{isModalOpen ? "Editando nó" : "Flow em edição"}</p>
        <FlowTitle>{flowData?.titulo || "Novo Flow"}</FlowTitle>
      </TitleBlock>

      <Actions>
        <IconButton title="Voltar e salvar" onClick={onBack}>
          <ArrowLeft />
        </IconButton>

        {!isModalOpen && (
          <AddNodeMenu>
            <IconButton title="Adicionar texto" onClick={() => onAddNode("texto")}>
              <FileText />
            </IconButton>
            <IconButton title="Adicionar decisão" onClick={() => onAddNode("decisao")}>
              <HelpCircle />
            </IconButton>
            <IconButton title="Adicionar multimídia" onClick={() => onAddNode("multimidia")}>
              <Image />
            </IconButton>
          </AddNodeMenu>
        )}

        <IconButton title="Detalhes" onClick={onToggleSidebar}>
          <MoreVertical />
        </IconButton>
      </Actions>
    </HeaderContainer>
  );
};

export default Header;