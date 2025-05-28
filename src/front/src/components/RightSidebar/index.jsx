import React from "react";
import {
  SidebarContainer,
  DetailsHeader,
  Section,
  DetailItem,
  Label,
  Value,
  TagList,
  TagItem,
} from "./style";

const RightSidebar = ({ flowData }) => {
  return (
    <SidebarContainer>
      <DetailsHeader>Detalhes do Flow</DetailsHeader>
      <Section>
        <DetailItem>
          <Label>Título</Label>
          <Value>{flowData?.titulo || "Novo Flow"}</Value>
        </DetailItem>
        <DetailItem>
          <Label>Descrição</Label>
          <Value>{flowData?.descricao || "Sem descrição"}</Value>
        </DetailItem>
        <DetailItem>
          <Label>Categorias</Label>
          <TagList>
            {flowData?.categorias?.map((cat, index) => (
              <TagItem key={index}>{cat}</TagItem>
            )) || <Value>Nenhuma categoria</Value>}
          </TagList>
        </DetailItem>
        <DetailItem>
          <Label>Tags</Label>
          <TagList>
            {flowData?.tags?.map((tag, index) => (
              <TagItem key={index}>#{tag}</TagItem>
            )) || <Value>Sem tags</Value>}
          </TagList>
        </DetailItem>
      </Section>
    </SidebarContainer>
  );
};

export default RightSidebar;