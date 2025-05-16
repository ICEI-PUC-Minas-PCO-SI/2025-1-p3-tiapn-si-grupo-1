import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CreateFlowForm from '../../components/CreateFlowForm';
import {
  PageContainer,
  ContentContainer,
  FormWrapper,
  StageTitle
} from './style';

const CreateFlow = () => {
  const [etapa, setEtapa] = useState(1);
  const [dadosFlow, setDadosFlow] = useState(null);

  const handleFormSubmit = (dados) => {
    setDadosFlow(dados);
    setEtapa(2);
  };

  const handleNextClick = () => {
    // Validação opcional aqui
    const form = document.querySelector("form");
    if (form) form.requestSubmit(); // dispara o onSubmit do formulário
  };

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Header
          title={etapa === 1 ? "Adicionar novo fluxo" : "Construção visual"}
          user="Victor Alves"
          onClick={etapa === 1 ? handleNextClick : null}
        />
        <FormWrapper>
          {etapa === 1 && (
            <>
              <CreateFlowForm onSubmit={handleFormSubmit} />
            </>
          )}
          {etapa === 2 && (
            <>
              <StageTitle>Etapa 2: Construção Visual do Flow</StageTitle>
              <p>🚧 Em breve: React Flow + Editor.js aqui! (dados: {JSON.stringify(dadosFlow)})</p>
            </>
          )}
        </FormWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

export default CreateFlow;
