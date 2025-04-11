# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas
_**Persona 1**: Asaphe Silva tem 35 anos, é Líder de Distribuição e busca garantir a autonomia de seus assistentes. No entanto, sua pouca disponibilidade para treiná-los e acompanhá-los o frustra._

_**Persona 2**: Roberta Borges tem 38 anos, é Supervisora de Distribuição e quer aumentar a sincronia da equipe, além de diminuir a polarização de processos. Porém, enfrenta dificuldades na adaptação de processos e percebe uma perda de autonomia dentro do time._

_**Persona 3**: Vinicios Santiago tem 24 anos, é Assistente Administrativo de Distribuição e deseja conquistar maior independência e espaço dentro da operação. No entanto, sente-se frustrado por depender de colegas e líderes para compreender novas atividades._



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


## Requisitos

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
| RF-001   | O sistema deve permitir que o usuário realize o cadastro informando nome, e-mail e senha | 🔴 Alta    |
| RF-002   | O sistema deve permitir que o usuário faça login utilizando e-mail e senha cadastrados   | 🔴 Alta    |
| RF-003   | O sistema deve permitir que o usuário redefina sua senha via e-mail caso a esqueça       | 🟡 Média   |
| RF-004   | O sistema deve garantir que o usuário seja capaz de criar seu guia de processo           | 🔴 Alta    |
| RF-005   | O sistema deve permitir o upload de documentos e tutoriais                               | 🔴 Alta    |
| RF-006   | O sistema deve permitir que usuários logados visualizem tutoriais disponíveis            | 🔴 Alta    |
| RF-007   | O sistema deve permitir comentar, curtir e salvar tutoriais                              | 🔴 Alta    |
| RF-008   | O sistema deve permitir a organização dos conteúdos em pastas                            | 🟡 Média   |
| RF-009   | O sistema deve permitir validação de tutoriais por usuários autorizados (validadores)    | 🔴 Alta    |
| RF-010   | O sistema deve permitir busca avançada com palavras-chave e filtros                      | 🔴 Alta    |
| RF-011   | O sistema deve restringir visualizações com base nos grupos aos quais o usuário pertence | 🔴 Alta    |
| RF-012   | O sistema deve permitir vincular tutoriais a múltiplos grupos                            | 🔴 Alta    |
| RF-013   | O sistema deve registrar o histórico de versões de tutoriais                             | 🟡 Média   |

### Requisitos não funcionais

| ID       | Tipo                        | Descrição do Requisito                                                                 | Prioridade |
|----------|-----------------------------|----------------------------------------------------------------------------------------|------------|
| RNF-001  | Segurança| O sistema deve ser capaz de operar para diferentes empresas| 🔴 Alta|
| RNF-002  | Segurança| O sistema deve garantir o acesso à plataforma apenas para usuários identificados pelo email corporativo | 🔴 Alta       |
| RNF-003  | Segurança| O sistema deve garantir restrições para processos que possuem limitações de acesso| 🔴 Alta       |
| RNF-004  | Regulamentação e Normas| Atender à LGPD e PCI-DSS| 🟡 Média|
| RNF-005  | Usabilidade| O sistema deve ser capaz de registrar e armazenar todas as interações do usuário na plataforma| 🟡 Média      |
| RNF-006  | Usabilidade| O sistema deve ser capaz de atualizar os elementos da pesquisa de acordo com os filtros estabelecidos| 🟡 Média      |
| RNF-007  | Usabilidade| O sistema deve informar ao usuário o resultado de toda operação realizada por ele, seja ela um sucesso ou uma falha do processo| 🟢 Baixa      |
| RNF-008  | Confiabilidade e Disponibilidade| É necessário que o sistema sempre informe qual o motivo de um eventual erro e então quais passos seguir| 🟢 Baixa      |
| RNF-009  | Regulamentação e Normas| O sistema deve ser capaz de garantir que os processos registrados sigam as regras de negócio existentes da empresa| 🟢 Baixa      |
| RNF-010  | Usabilidade| O sistema deve fornecer maneiras de interação entre usuários| 🟡 Média      |
| RNF-011  | Usabilidade| O sistema deve permitir a criação e manutenção de estruturas de equipes dentro da companhia, garantindo a organização hierárquica e a atribuição de funções| 🟡 Média      |
| RNF-012  | Interoperabilidade| O sistema deverá ter integração com APIs que facilitem a criação dos processos dentro da plataforma| 🔴 Alta       |


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


## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| A plataforma será acessível apenas para funcionários cadastrados |
|002| Empresas poderão moderar conteúdos para manter a qualidade das informações |
|003| Restrições de desempenho podem surgir devido a limitações na infraestrutura utilizada |
|004| Apenas usuários autorizados podem acessar determinados conteúdos|
|005| A proteção de dados pessoais, como senha e e-mails dos usuários devem seguir boas praticas de segurança|

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

![image](https://github.com/user-attachments/assets/922612b8-878c-438a-bf7f-b050c00fc89a)


## Participantes do Processo de Negócio

### Usuários Finais

#### Funcionários Operacionais
Colaboradores que criam, acessam e utilizam tutoriais e documentação para executar suas atividades diárias. Eles buscam maior autonomia e eficiência, utilizando a plataforma para minimizar erros e otimizar processos.

#### Gestores
Supervisores responsáveis por monitorar o engajamento da equipe e a eficácia dos tutoriais. Eles revisam e aprovam os conteúdos criados pelos funcionários operacionais, assegurando que as informações atendam às necessidades operacionais. Além disso, são responsáveis pela análise dos processos e pela validação da conformidade dos tutoriais com as diretrizes organizacionais.

### Equipe de Desenvolvimento e Suporte
Técnicos encarregados de garantir a funcionalidade da plataforma. Eles implementam novas características, corrigem falhas e oferecem suporte técnico aos usuários, assegurando que a experiência na plataforma seja satisfatória e eficiente.

### Administração e Diretoria
Gestores que supervisionam a implementação e o desempenho do KnowFlow. Eles avaliam o impacto da plataforma nas operações da empresa, apoiando melhorias estratégicas e promovendo uma cultura de compartilhamento de conhecimento entre os colaboradores.



