
# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>


O projeto é apartir de interfaces planejadas para interação com usuario de forma intuitiva, dispondos em telas para funções voltada ao flow e aos conhecimentos do usuario. A utiliadde do sistema é um frontend para criacao de fluxos que fazem o conhecimento ter um inicio e fim definidos para o processo especifico e tudo criado de forma fácil pelo proprio usuario.



 Apresente as principais interfaces da plataforma. Discuta como ela foi elaborada de forma a atender os requisitos funcionais, não funcionais e histórias de usuário abordados na <a href="02-Especificacao.md"> Especificação do projeto</a></span>.

 ## User flow

_LINK DO BOARD DE FLUXO DE USUÁRIO: [User flow | Knowflow Process](https://miro.com/app/board/uXjVI82qtag=/?share_link_id=687504854472)_ 

![Exemplo de user flow](https://github.com/user-attachments/assets/119e4a80-1972-4424-bb6b-babf75eba080)

### Diagrama de fluxo

O diagrama apresenta o estudo do fluxo de interação do usuário com o sistema interativo, muitas vezes sem a necessidade de desenhar o design das telas da interface. Isso permite que o design das interações seja bem planejado e tenha impacto na qualidade do design do wireframe interativo que será desenvolvido logo em seguida.

O diagrama de fluxo pode ser desenvolvido com “boxes” que possuem, internamente, a indicação dos principais elementos de interface — tais como menus e acessos — e funcionalidades, como editar, pesquisar, filtrar e configurar, além da conexão entre esses boxes a partir do processo de interação.


![Diagrama de fluxo - Frame 1](https://github.com/user-attachments/assets/1637f7f9-3967-46d8-aea4-59908dadaa8e)

## Wireframes

São protótipos usados no design de interface para sugerir a estrutura de um site web e seu relacionamento entre suas páginas. Um wireframe web é uma ilustração que mostra o layout dos elementos fundamentais na interface.

Feed de Flows: O Feed exibe os flows publicados pela comunidade. O usuário pode buscar por título, tags ou autor, e aplicar filtros por categoria, tag ou autor. Cada card mostra o nome do flow, autor, data, descrição e botões de curtir, comentar e salvar. 

![Wireframe 1](images/Wireframe-1.png)

Visualização de Flow: O Flow publicado pode ser visualizado por outros usuários conforme as permissões que o criador disponibiliza, sendo assim também consegue fazer a interação dentro deste Flow por meio do próximo item.

![Wireframe 2](images/Wireframe-2.png)

Interação com o Flow: Além da visualização o usuário consegue interagir dentro do Flow com comentários, curtidas e salvando o mesmo para visualizar mais tarde.

![Wireframe 3](images/Wireframe-3.png)

Etapa 1 - Criação de Flow (Configuração): A criação de um novo flow é feita em três etapas. A primeira é a configuração, onde o usuário define o título, descrição, categoria e tags do flow. Essa etapa é essencial para contextualizar o conteúdo antes da construção visual.

![Wireframe 4](images/Wireframe-4.png)

Etapa 2 - Construção Visual: Na segunda etapa, o usuário constrói o flow utilizando uma interface visual baseada no React Flow. Pode adicionar nós de conteúdo, decisão e mídia, 

![Wireframe 5](images/Wireframe-5.png)

Feed da comunidade: Esta é uma tela fundamental do projeto, onde os usuários podem interagir com a comunidade. Nela, é possível criar discussões para tirar dúvidas relacionadas ao seu contexto profissional ou solicitar que outros usuários criem um Flow com base na solicitação feita. Outros membros da comunidade poderão visualizar esses posts, responder dúvidas ou iniciar a criação de um Flow diretamente a partir da publicação.

![Wireframe 7](images/Wireframe-7.png)

Criação de Post na comunidade: Além de navegar pelo feed, você também pode acessar a seção de criação de postagens para a comunidade. Nela, é possível escolher o tipo de post que deseja publicar e definir o nível de visibilidade desejado.

![Wireframe 8](images/Wireframe-8.png)

Post da comunidade: Ao clicar em um post da comunidade, você poderá visualizá-lo por completo, acompanhando a discussão em detalhes, incluindo os comentários, curtidas e demais interações realizadas pelos usuários.

![Wireframe 9](images/Wireframe-9.png)
 


## Interface do sistema

A interface do sistema foi desenvolvida para oferecer uma navegação simples, intuitiva e eficiente. Utilizando tecnologias modernas, como React e Material UI, o layout prioriza a usabilidade e a experiência do usuário.

### Tela principal do sistema

A tela principal do KnowFlow é o hub central de conhecimento da plataforma, onde os usuários têm acesso ao feed de documentações interativas — chamadas de flows. Cada card representa um flow criado por um membro da comunidade, exibindo título, autor, categorias e uma prévia do conteúdo.

Ao clicar em um card, o usuário é direcionado para a visualização completa do flow, com seus nós conectados via React Flow e conteúdos editáveis no Editor.js (caso seja o autor). A tela também permite interações como curtir, comentar e salvar, promovendo engajamento e compartilhamento de conhecimento.

![Wireframe 1](images/Wireframe-1.png)


###  Telas do processo 1

Ao interagir com um card, o sistema renderiza o conteúdo completo do flow correspondente. Esse conteúdo inclui a visualização do flow estruturado com React Flow, com nós personalizados que integram instâncias do Editor.js para edição de conteúdo diretamente dentro de cada nó. Além da navegação pelo grafo interativo, é possível acessar uma aba localizada no canto inferior da página, onde são exibidas informações complementares sobre o flow, como descrição, categorias, tags e a seção de comentários. Usuários que não são donos do flow não podem editar nem dispor os nós de forma diferente.


![Wireframe 2](images/Wireframe-2.png)


### Telas do processo 2

Ao clicar no botão localizado no menu lateral esquerdo, o usuário é direcionado para a tela de criação de fluxo. A primeira etapa consiste em um formulário onde são inseridos os dados do flow: título, descrição, categorias e tags. Após avançar, o usuário acessa a interface de construção visual do flow, baseada em React Flow, com um nó inicial já exibido e integrado a uma instância do Editor.js. Esse nó inicial serve como ponto de partida, permitindo a criação de novos nós conectados a ele. Cada novo nó criado também conterá uma instância independente do Editor.js, sendo posicionado à direita do nó anterior. Durante a criação, a interface também exibe, de forma fixa, uma seção informativa, permitindo ao usuário visualizar em tempo real os dados informados na etapa anterior. O botão "Etapa Anterior" permite retornar ao formulário de dados do flow. Ao clicar em "Publicar", o flow é salvo e o usuário é automaticamente redirecionado para a tela principal com os flows publicados.


![Wireframe 4](images/Wireframe-4.png)

