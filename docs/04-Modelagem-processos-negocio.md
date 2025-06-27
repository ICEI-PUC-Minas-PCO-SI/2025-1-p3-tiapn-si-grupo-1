# Modelagem dos processos de negócio

## Modelagem da situação atual (Modelagem AS IS)

### 1. Consultar Processos (AS-IS)

Atualmente, o processo de consulta a um processo interno na Philip Morris é executado de maneira manual e descentralizada. Quando um colaborador precisa consultar o status ou informação de um processo, ele inicia o contato com o setor responsável (normalmente via e-mail ou ligação telefônica). Esse setor, por sua vez, verifica manualmente os documentos físicos, documentos em pastas pessoais, em pastas compartilhadas em rede ou no SharePoint da empresa.

Frequentemente há necessidade de verificar diferentes sistemas ou solicitar apoio de outros departamentos, o que acarreta múltiplas idas e vindas. A resposta ao colaborador nem sempre é imediata, e há riscos de perda de informação, desencontro de dados e atraso nas decisões. Esse fluxo fragmentado gera retrabalho, principalmente quando as informações não estão atualizadas ou não são localizáveis facilmente.

**Principais Gargalos:**

- Alta dependência de comunicação interpessoal;
- Falta de centralização das informações;
- Ausência de histórico automatizado;
- Demora na resposta;
- Retrabalho por perda de dados.
  
  ![Consultar Processo AS_IS](images/bpmn_as_is_consultar_processo.png)
  
### 2. Documentar Processos (AS-IS)

O processo de documentação de processos internos também ocorre de forma manual. Quando uma área precisa registrar um processo, geralmente é feito via documentos do Word, planilhas ou até mesmo e-mails. Os arquivos são salvos localmente ou em pastas compartilhadas sem padrão de nomenclatura ou controle de versão.

Além disso, não existe um fluxo de validação bem definido. O responsável por documentar precisa entrar em contato com diversas áreas para levantar as informações, muitas vezes com base em lembranças ou registros informais. Após a criação da documentação, ela nem sempre passa por revisão ou é armazenada em local de fácil acesso.

**Principais Gargalos:**

- Falta de padronização;
- Dificuldade para encontrar processos documentados anteriormente;
- Ausência de validação formal;
- Registro redundante ou inconsistente;
- Ausência de controle de versão e centralização.

 ![Documentar Processos AS_IS](images/bpmn_as_is_documentar_processo.png)

## Descrição geral da proposta (Modelagem TO BE)

### 1. Consultar Processos (TO-BE)

A proposta de solução envolve a automação do processo de consulta via uma plataforma integrada de gestão de processos. O colaborador acessará um sistema web centralizado, onde poderá consultar o status de um processo específico através de um código ou palavra-chave.

O sistema será alimentado automaticamente a partir dos fluxos de entrada dos processos registrados. O setor responsável apenas alimentará uma vez o sistema e todas as áreas poderão consultar sem necessidade de intervenção direta. Haverá controle de permissões, rastreabilidade de consultas e histórico de atualizações.

**Oportunidades de melhoria:**

- Redução do tempo de resposta;
- Eliminação do retrabalho por falha de comunicação;
- Maior autonomia para os usuários;
- Dados atualizados em tempo real;
- Registro automático de histórico.

**Limites da solução:**

- Necessidade de adesão das áreas envolvidas;
- Curva de aprendizado inicial com a nova ferramenta;
- Investimento em treinamento e migração dos dados.

**Alinhamento com o negócio:**

- Melhora a eficiência operacional;
- Reduz riscos de perda de informações;
- Apoia a transparência e agilidade nas decisões.

  ![Consultar Processo TO-BE](images/bpmn_to_be_consultar_processo.png
)

### 2. Documentar Processos (TO-BE)

A nova proposta inclui a utilização de um sistema de gestão de processos baseado em BPMN, onde os responsáveis poderão criar, revisar e aprovar documentações dentro de um fluxo automatizado.

A documentação será feita dentro do próprio sistema, com campos padronizados, validação por etapas e armazenamento em repositório central com controle de versão. Os usuários poderão anexar arquivos, comentar e aprovar etapas com assinatura digital.

**Oportunidades de melhoria:**

- Eliminação de documentos soltos e não padronizados;
- Maior confiabilidade e acesso rápido à informação;
- Redução do retrabalho na manutenção de versões;
- Histórico de alterações e validações centralizado.

**Limites da solução:**

- Dependência da adoção do sistema por todos os envolvidos;
- Tempo de configuração e parametrização inicial.

**Alinhamento com o negócio:**

- Melhoria da governança de processos;
- Facilita auditorias e controles internos;
- Suporte ao crescimento e à escalabilidade do negócio.
![Documentar Processo TO-BE](images/bpmn_to_be_documentar_processo.png)

## Modelagem dos processos
- [PROCESSO 1 - AS IS - Consultar Processos](./processes//bpmn_as_is_consultar_processo.png.md "Detalhamento do processo de Consulta.")
- [PROCESSO 1 - TO BE - Consultar Processos](./processes/processo-to-be-consultar-processos.md "Detalhamento do processo de Consulta.")
- [PROCESSO 2 - AS IS - Documentar Processos](./processes/bpmn_as_is_documentar_processo.png.md "Detalhamento do processo de Consulta.")
- [PROCESSO 2 - TO BE - Documentar Processos](./processes/processo-to-be-documentar-processos.md "Detalhamento do processo de Documentar.")


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Engajamento de usuários ativos| Medir a participação dos colaboradores na plataforma           | Percentual de usuários que visualizaram, curtiram ou comentaram tutoriais nos últimos 30 dias| Tabela Usuários, Ações     | (nº usuários ativos no mês / nº total de usuários da empresa) * 100            |
| Índice de tutoriais validados | Monitorar a qualidade e formalização do conteúdo               | Proporção de tutoriais validados por usuários autorizados                                   | Tabela Tutoriais           | (nº de tutoriais validados / nº total de tutoriais criados) * 100              |
| Taxa de criação de conteúdos  | Avaliar a produção de conhecimento interno                     | Média de tutoriais criados por usuário dentro de um período                                 | Tabela Tutoriais           | nº total de tutoriais no mês / nº total de usuários                            |
| Taxa de acesso ao conteúdo    | Verificar a utilidade prática da base de conhecimento          | Média de visualizações por tutorial disponível                                               | Tabela Tutoriais, Acessos  | nº total de visualizações / nº total de tutoriais                              |
| Retorno sobre buscas realizadas| Medir a efetividade da barra de busca                         | Percentual de buscas que resultam em clique em algum conteúdo relevante                      | Tabela Pesquisas, Cliques  | (nº de buscas com clique / nº total de buscas realizadas) * 100                |
| Média de tempo para validação | Avaliar agilidade no fluxo de formalização dos conteúdos       | Tempo médio entre a criação e a validação de um tutorial                                     | Tabela Tutoriais           | Média(data validação - data criação)                                            |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
