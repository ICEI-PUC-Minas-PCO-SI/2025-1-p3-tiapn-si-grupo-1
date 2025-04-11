### 3.3.2 Processo 2 – Documentar Processos

O processo de **Documentar Processos** tem como objetivo garantir o correto registro e formalização dos processos executados dentro da organização, promovendo padronização, rastreabilidade e fácil consulta.  

**Oportunidades de melhoria identificadas:**
- Estruturação padronizada da documentação.
- Centralização das informações em ferramenta de fácil acesso.
- Redução de retrabalho e falhas por documentação incompleta.
- Automatização da validação e publicação dos documentos.

#### Modelo BPMN do DOCUMENTAR PROCESSOS

![Modelo BPMN - Documentar Processos](/docs/images/bpmn_to_be_documentar_processo.png)

---

### Detalhamento das atividades

#### Nome da atividade: Iniciar documentação de processo

| Campo          | Tipo         | Restrições              | Valor default |
|----------------|--------------|--------------------------|---------------|
| títuloProcesso | Caixa de texto | obrigatório               |               |
| áreaResponsável| Seleção única | lista de áreas da empresa|               |
| dataInicio     | Data         | obrigatório               | data atual    |
| descrição      | Área de texto | mínimo 100 caracteres     |               |

**Comandos**

| Nome do botão     | Atividade/processo de destino | Tipo     |
|-------------------|-------------------------------|----------|
| salvarRascunho    | Iniciar documentação de processo | default |
| avançarParaRevisão| Revisar documentação           |          |

---

#### Nome da atividade: Revisar documentação

| Campo              | Tipo          | Restrições                   | Valor default |
|--------------------|---------------|-------------------------------|---------------|
| comentáriosRevisor | Área de texto | mínimo 20 caracteres          |               |
| statusRevisão      | Seleção única | Aprovado, Correções necessárias |               |
| anexoRevisado      | Arquivo       | obrigatório se Correções      |               |

**Comandos**

| Nome do botão   | Atividade/processo de destino | Tipo     |
|-----------------|-------------------------------|----------|
| solicitarCorreção | Iniciar documentação de processo | cancel |
| aprovarDocumento  | Publicar documentação         | default |

---

#### Nome da atividade: Publicar documentação

| Campo           | Tipo     | Restrições        | Valor default |
|-----------------|----------|-------------------|---------------|
| dataPublicação  | Data     | obrigatório       | data atual    |
| linkDocumento   | Link     | válido (URL)      |               |

**Comandos**

| Nome do botão | Atividade/processo de destino | Tipo   |
|---------------|-------------------------------|--------|
| finalizar     | Fim do Processo               | default |
