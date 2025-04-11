
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Descreva aqui a metodologia de trabalho do grupo para abordar o problema. Inclua definições sobre os ambientes de trabalho utilizados pela equipe para desenvolver o projeto. Isso abrange a relação dos ambientes utilizados, a estrutura para a gestão do código-fonte, além da definição do processo e das ferramentas por meio dos quais a equipe se organiza (gestão de equipes).

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Victor Alves
- Apresentação e ID Visual: Mateus Botelho
- Introdução (Documentação): Gabriella Paz
- Participantes do processo de Negócio (Documentação): Felipe Roque e Rogério Gabriel
- Especificações do projeto (Documentação): Victor Alves e Lucas Borges

#### Sprint 2
- _Scrum master_: Felipe Roque
- Apresentação e Design: Lucas Borges e Mateus Botelho
- Planejamento comercial: Gabriella Paz e Rogério Gabriel
- Modelagem de Processos de Negócios: Victor Alves e Felipe Roque

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 13/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Felipe Roque        | Participantes do processo de negócio | 07/03/2025     | 12/03/2025 | ✔️    |   09/03/2025    |
| Gabriella Paz        | Introdução    | 07/03/2025     | 12/03/2025 | ✔️   |   11/03/2025              |
| Lucas Borges        | Especificações do projeto | 07/03/2025     | 12/03/2025 | ✔️     |    12/03/2025             |
| Mateus Botelho        | Slides  |    07/03/2025        | 12/03/2025 | ✔️    |    12/03/2025   |  
| Rogério Gabriel     | Participantes do processo de negócio  |    07/03/2025        | 12/03/2025 | ✔️    |   09/03/2025    |
| Victor Alves       | Especificações do projeto  |    07/03/2025        | 12/03/2025 | ✔️    |   07/03/2025    |


#### Sprint 2

Atualizado em: 07/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Felipe Roque      | Modelagem BPMN  | 01/02/2024     | 10/04/2025 | ✔️    | 05/02/2024      |
| Gabriella Paz     |  Diferencial e Monetização  | 04/04/2025     | 10/04/2025 | ✔️    |  10/04/2025              |
| Lucas Borges      | Apresentação e Roteiro  | 07/04/2024     | 10/04/2025 | 📝     |                 |
| Mateus Botelho      | Apresentação e Roteiro  | 07/04/2024     | 10/04/2025 | ✔️     | 10/04/2025 |
| Rogério Gabriel     | Diferencial e Monetização  | 01/02/2024     | 10/04/2025 | 📝     |                 |
| Victor Alves      | Modelagem BPMN  |  04/04/2025    | 10/04/2025 | ✔️   |  06/04/2025      |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | <https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-1> |
| Documentos do projeto               | GitHub                             | <https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-1/edit/main/docs/> |
| Projeto de interface                | Figma                              | http://....                            |
| Gerenciamento do projeto            | GitHub Projects                    | <https://github.com/orgs/ICEI-PUC-Minas-PCO-SI/projects/124> |
| Hospedagem                          | Vercel                             | http://....                            |
| Apresentação                          | Canva                             | <https://www.canva.com/design/DAGhXcOBOm0/xqkdWNETaCVIJVsFPOb_RQ/view?utm_content=DAGhXcOBOm0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfd7f4740ee> |
| Orquestração de processos (BPM)     | Camunda Platform                   | https://camunda.com/download/modeler/                       |
