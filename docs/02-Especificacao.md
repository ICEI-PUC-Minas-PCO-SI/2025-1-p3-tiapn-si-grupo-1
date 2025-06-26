# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas

**Persona 1**: Asaphe Silva tem 35 anos, é Líder de Distribuição e busca garantir a autonomia de seus assistentes. No entanto, sua pouca disponibilidade para treiná-los e acompanhá-los o frustra.

**Persona 2**: Roberta Borges tem 38 anos, é Supervisora de Distribuição e quer aumentar a sincronia da equipe, além de diminuir a polarização de processos. Porém, enfrenta dificuldades na adaptação de processos e percebe uma perda de autonomia dentro do time.

**Persona 3**: Vinicios Santiago tem 24 anos, é Assistente Administrativo de Distribuição e deseja conquistar maior independência e espaço dentro da operação. No entanto, sente-se frustrado por depender de colegas e líderes para compreender novas atividades.

---

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`               | QUERO/PRECISO ... `FUNCIONALIDADE`                    | PARA ... `MOTIVO/VALOR`                                            |
|-----------------------------------|--------------------------------------------------------|---------------------------------------------------------------------|
| Líder do meu time (Administrador) | validar os processos enviados pela equipe              | garantir que os processos criados sigam os padrões estipulados     |
| Analista de processos (Administrador) | certificar de que as atividades possam ter algum nível de segurança | limitar o acesso de colaboradores ou equipe não autorizada         |
| Funcionário novo (Usuário)        | buscar as atividades criadas por colegas da minha equipe | sanar eventuais dúvidas que eu possa ter                          |
| Supervisora (Administrador)       | acompanhar o engajamento da minha equipe com a plataforma | reconhecer o desempenho de todos                                   |
| Funcionário (Usuário)             | indicar minha satisfação com o processo que me ajudou  | trazer reconhecimento pra ele                                      |
| Funcionário (Usuário)             | ter diferentes opções de registrar a minha atividade na plataforma | acompanhar as particularidades de algumas atividades              |
| Funcionário (Usuário)             | ter o contato com o dono da publicação                 | tirar minha dúvida sobre um determinado momento do processo       |
| Autor de uma publicação (Usuário) | editar e até mesmo excluir processos incorretos        | garantir a conformidade do processo                                |
| Funcionário (Usuário)             | salvar o estado atual do meu processo enquanto faço     | que eu possa finalizá-lo depois                                    |

## Requisitos

### Requisitos funcionais

| ID | Descrição do Requisito | Prioridade |
|----|------------------------|------------|
| **RF-001** | O sistema deve permitir que o usuário realize o cadastro informando nome, e-mail e senha | 🔴 Alta |
| **RF-002** | O sistema deve permitir que o usuário faça login utilizando e-mail e senha cadastrados | 🔴 Alta |
| **RF-003** | O sistema deve permitir que o usuário redefina sua senha via e-mail caso a esqueça | 🟡 Média |
| **RF-004** | O sistema deve permitir a criação de Flows interativos com blocos de conteúdo textual, decisão e multimídia | 🔴 Alta |
| **RF-005** | O sistema deve abrir um modal de edição específico para cada tipo de nó (texto, decisão, multimídia) dentro do Flow | 🔴 Alta |
| **RF-006** | O sistema deve permitir que o usuário visualize, comente, curta e salve Flows criados por outros usuários | 🔴 Alta |
| **RF-007** | O sistema deve permitir pesquisar e filtrar Flows no feed principal por nome, categoria, tag ou criador | 🔴 Alta |
| **RF-008** | O sistema deve permitir o usuário acessar um feed de Flows em destaque, recentes ou populares | 🟡 Média |
| **RF-009** | O sistema deve disponibilizar uma área de Comunidade onde usuários possam publicar dúvidas, sugestões ou solicitações de novos Flows | 🔴 Alta |
| **RF-010** | O sistema deve permitir que usuários criem novos Flows baseados em postagens da Comunidade | 🟡 Média |
| **RF-011** | O sistema deve permitir interação básica entre usuários (curtir, comentar, responder comentários) | 🟡 Média |
| **RF-012** | O sistema deve permitir que o usuário edite ou exclua seus próprios Flows e comentários | 🟡 Média |

### Requisitos não funcionais

| ID | Tipo | Descrição do Requisito | Prioridade |
|----|------|------------------------|------------|
| **RNF-001** | Segurança | O sistema deve garantir o acesso apenas a usuários autenticados por e-mail | 🔴 Alta |
| **RNF-002** | Segurança | O sistema deve proteger as credenciais dos usuários com criptografia de senha | 🔴 Alta |
| **RNF-003** | Usabilidade | O sistema deve ter interface moderna, responsiva e intuitiva, adequada para dispositivos desktop e mobile | 🔴 Alta |
| **RNF-004** | Usabilidade | O sistema deve exibir mensagens de feedback claras após cada ação (sucesso ou erro) | 🟡 Média |
| **RNF-005** | Desempenho | O sistema deve carregar Flows e postagens de forma rápida, mesmo com grande volume de conteúdo | 🟡 Média |
| **RNF-006** | Interoperabilidade | O sistema deve permitir integração futura com APIs externas para compartilhamento de conteúdo | 🟡 Média |
| **RNF-007** | Confiabilidade | O sistema deve registrar logs de erros para monitoramento e melhorias | 🟢 Baixa |
| **RNF-008** | Regulamentação | O sistema deve seguir normas de privacidade de dados como a LGPD | 🔴 Alta |


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

![Image](https://github.com/user-attachments/assets/c5fed08f-c39b-45d6-99a6-aa9262b45905)


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



