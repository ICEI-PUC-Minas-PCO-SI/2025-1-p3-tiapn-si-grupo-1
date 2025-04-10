# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

Apresente uma descrição textual de como os sistemas atuais resolvem o problema que seu projeto se propõe a resolver. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

Com o tema do projeto definido, escolham alguns processos no contexto de negócios. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. Colem aqui os modelos dos processos atuais (modelo AS-IS), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.

## Descrição geral da proposta (Modelagem TO BE)

Tendo identificado os gargalos dos modelos AS-IS, apresentem uma descrição da proposta de solução, buscando maior eficiência com a introdução da tecnologia. Abordem também os limites dessa solução e seu alinhamento com as estratégias e objetivos do contexto de negócio escolhido.

Cole aqui os modelos da solução proposta (modelo TO-BE), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina. Cada processo identificado deve ter seu modelo TO-BE específico. Descrevam as oportunidades de melhoria de cada processo da solução proposta.

Apresente aqui uma descrição da sua proposta, abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente também as oportunidades de melhoria.

## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")


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
