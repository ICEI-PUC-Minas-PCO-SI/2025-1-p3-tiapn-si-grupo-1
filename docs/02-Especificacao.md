# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas
_**Persona 1**: Asaphe Silva tem 35 anos, é Líder de Distribuição e busca garantir a autonomia de seus assistentes. No entanto, sua pouca disponibilidade para treiná-los e acompanhá-los o frustra._

_**Persona 2**: Roberta Borges tem 38 anos, é Supervisora de Distribuição e quer aumentar a sincronia da equipe, além de diminuir a polarização de processos. Porém, enfrenta dificuldades na adaptação de processos e percebe uma perda de autonomia dentro do time._

_**Persona 3**: Vinicios Santiago tem 24 anos, é Assistente Administrativo de Distribuição e deseja conquistar maior independência e espaço dentro da operação. No entanto, sente-se frustrado por depender de colegas e líderes para compreender novas atividades._

> **Links úteis**:
> - [Rock content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Líder do meu time  (Administrador)| validar os processos enviados pela equipe           | garantir que os processos criados sigam os padrões estipulados pela equipe de controladoria             |
|Analista de processos (Administrador)| certificar de que as atividades possam ter algum nível de segurança                  | limite o acesso de colaboradores ou equipe não autorizada |
|Funcionário novo (Usuário)| buscar as atividades criadas por colegas da minha equipe | sanar eventuais dúvidas que eu possa ter|
|Supervisora (Administrador)| acompanhar o engajamento da minha equipe com a plataforma | reconhecer o desempenho de todos|
|Funcionário (Usuário)| indicar minha satisfação com o processo que me ajudou |trazer reconhecimento pra ele|
|Funcionário (Usuário)| ter diferentes opções de registrar a minha atividade na plataforma | acompanhar as particularidades de algumas atividades|
|Funcionário (Usuário)|ter o contato com o dono da publicação|tirar minha dúvida sobre um determinado momento do processo|
|Autor de uma publicação (Usuário)|editar e até mesmo excluir processos incorretos|garantir a conformidade do processo|
|funcionário (Usuário)|salvar o estado atual do meu processo enquanto faço|que eu possa finalizá-lo depois|

> **Links úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (user stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 common user story mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001|O sistema deve permitir que o usuário realize o cadastro informando nome, e-mail  e senha| Alta | 
|RF-002|O sistema deve permitir que o usuário faça login utilizando e-mail e senha cadastrados| Alta |
|RF-003|O sistema deve permitir que o usuário redefina sua senha via e-mail caso a esqueça| Média | 
|RF-004|O sistema deve garantir que usuário seja capaz de criar seu guia para um processo após identificado na plataforma| Alta |
|RF-005|O sistema deve garantir que usuário seja capaz de realizar o upload dos seus "treinamentos"dentro da plataforma| Alta | 
|RF-006|O sistema deve assegurar de que os usuários logados na plataforma sejam capazes de visualizar os processos disponíveis| Alta |

### Requisitos não funcionais

| ID       | Tipo                        | Descrição do Requisito                                                                 | Prioridade |
|----------|-----------------------------|----------------------------------------------------------------------------------------|------------|
| RNF-001  | Segurança| O sistema deve ser capaz de operar para diferentes empresas| Alta|
| RNF-002  | Segurança| O sistema deve garantir o acesso à plataforma apenas para usuários identificados pelo email corporativo | Alta       |
| RNF-003  | Segurança| O sistema deve garantir restrições para processos que possuem limitações de acesso| Alta       |
| RNF-004  | Regulamentação e Normas| Atender à LGPD e PCI-DSS| Média|
| RNF-005  | Usabilidade| O sistema deve ser capaz de registrar e armazenar todas as interações do usuário na plataforma| Média      |
| RNF-006  | Usabilidade| O sistema deve ser capaz de atualizar os elementos da pesquisa de acordo com os filtros estabelecidos| Média      |
| RNF-007  | Usabilidade| O sistema deve informar ao usuário o resultado de toda operação realizada por ele, seja ela um sucesso ou uma falha do processo| Baixa      |
| RNF-008  | Confiabilidade e Disponibilidade| É necessário que o sistema sempre informe qual o motivo de um eventual erro e então quais passos seguir| Baixa      |
| RNF-009  | Regulamentação e Normas| O sistema deve ser capaz de garantir que os processos registrados sigam as regras de negócio existentes da empresa| Baixa      |
| RNF-010  | Usabilidade| O sistema deve fornecer maneiras de interação entre usuários| Média      |
| RNF-011  | Usabilidade| O sistema deve permitir a criação e manutenção de estruturas de equipes dentro da companhia, garantindo a organização hierárquica e a atribuição de funções| Média      |
| RNF-012  | Interoperabilidade| O sistema deverá ter integração com APIs que facilitem a criação dos processos dentro da plataforma| Alta       |


Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

## Participantes do Processo de Negócio

## Usuários Finais

### Funcionários Operacionais
Colaboradores que criam, acessam e utilizam tutoriais e documentação para executar suas atividades diárias. Eles buscam maior autonomia e eficiência, utilizando a plataforma para minimizar erros e otimizar processos.

### Gestores
Supervisores responsáveis por monitorar o engajamento da equipe e a eficácia dos tutoriais. Eles revisam e aprovam os conteúdos criados pelos funcionários operacionais, assegurando que as informações atendam às necessidades operacionais. Além disso, são responsáveis pela análise dos processos e pela validação da conformidade dos tutoriais com as diretrizes organizacionais.

## Equipe de Desenvolvimento e Suporte
Técnicos encarregados de garantir a funcionalidade da plataforma. Eles implementam novas características, corrigem falhas e oferecem suporte técnico aos usuários, assegurando que a experiência na plataforma seja satisfatória e eficiente.

## Administração e Diretoria
Gestores que supervisionam a implementação e o desempenho do KnowFlow. Eles avaliam o impacto da plataforma nas operações da empresa, apoiando melhorias estratégicas e promovendo uma cultura de compartilhamento de conhecimento entre os colaboradores.


As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
