# Plano de Testes de Software 

##  Cenários de Teste: 

| Nº | Funcionalidade Testada          | Requisitos Associados       | Grupo de Usuários           | Ferramentas Utilizadas         |
|----|----------------------------------|------------------------------|------------------------------|---------------------------------|
| 1  | Cadastro de usuário              | RF-001, RNF-001, RNF-002     | Funcionários convidados      | Navegador, Postman             |
| 2  | Login com e-mail e senha         | RF-002, RNF-001              | Funcionários cadastrados     | Navegador, Postman |
| 3  | Redefinir senha via e-mail       | RF-003                       | Usuários já registrados      | Navegador, Plataforma de e-mail |
| 4  | Criar Flow interativo            | RF-004, RF-005               | Usuários autenticados        | Navegador                       |
| 5  | Interagir com Flows              | RF-006, RF-011               | Todos os usuários            | Navegador                       |
| 6  | Pesquisar e filtrar Flows        | RF-007, RF-008               | Todos os usuários            | Navegador                       |
| 7  | Publicar e derivar da Comunidade | RF-009, RF-010               | Todos os usuários            | Navegador                       |
| 8  | Editar e excluir conteúdos       | RF-012, RNF-004              | Usuários autenticados        | Navegador                       |

---

##  Casos de Teste

### CT-001 – Cadastro de Usuário
- **Requisitos Associados:** RF-001, RNF-001, RNF-002  
- **Objetivo:** Verificar se um novo usuário pode se cadastrar com sucesso.  
- **Passos:**
  - Acessar a URL da plataforma
  - Clicar em “Criar conta”
  - Preencher nome, e-mail e senha
  - Aceitar os termos
  -  Clicar em “Registrar”
- **Critério de Êxito:** Usuário é redirecionado ao feed com mensagem de sucesso. Dados são armazenados com segurança.

---

### CT-002 – Login com e-mail e senha
- **Requisitos Associados:** RF-002, RNF-001  
- **Objetivo:** Garantir que o login funcione corretamente.
- **Passos:**
  - Acessar a página inicial
  - Clicar em "Entrar"
  - Informar e-mail e senha válidos
  - Clicar em "Login"
- **Critério de Êxito:** Login realizado com sucesso e redirecionamento ao dashboard.


---

###  CT-003 – Redefinição de Senha
- **Requisitos Associados:** RF-003  
- **Objetivo:** Testar a funcionalidade de recuperação de senha.
- **Passos:**
  - Acessar a tela de login
  - Clicar em “Esqueci minha senha”
  - Informar o e-mail cadastrado
  - Clicar no link enviado por e-mail
     Definir nova senha
- **Critério de Êxito:** Nova senha registrada com sucesso e login possível.

---

### CT-004 – Criar Flow com Blocos
- **Requisitos Associados:** RF-004, RF-005  
- **Objetivo:** Criar um Flow com blocos variados (texto, decisão, multimídia).
- **Passos:**
  - Fazer login
  - Acessar “Meus Flows”
  - Criar novo Flow
  - Inserir os três tipos de bloco
  -  Salvar Flow
- **Critério de Êxito:** Flow salvo com todos os blocos e modais de edição funcionando.

---

### CT-005 – Interações com Flows
- **Requisitos Associados:** RF-006, RF-011  
- **Objetivo:** Curtir, comentar e salvar Flows.
- **Passos:**
  - Acessar feed de Flows
  - Curtir, comentar e salvar um Flow
  - Verificar as interações na interface
- **Critério de Êxito:** Ações funcionam e refletem na interface.


---

### CT-006 – Pesquisa e Filtros
- **Requisitos Associados:** RF-007, RF-008  
- **Objetivo:** Pesquisar e filtrar Flows com base em critérios.
- **Passos:**
  - Acessar o feed
  - Inserir uma palavra-chave
  - Aplicar filtros de categoria e criador
- **Critério de Êxito:** Resultados exibidos corretamente.

---

### CT-007 – Postar na Comunidade e Criar Flow
- **Requisitos Associados:** RF-009, RF-010  
- **Objetivo:** Publicar na comunidade e iniciar Flow com base no post.
- **Passos:**
  - Publicar uma dúvida na Comunidade
  - Clicar em "Criar Flow baseado nesta postagem"
  - Confirmar abertura de Flow pré-preenchido
- **Critério de Êxito:** Flow criado com dados baseados no post.


---

### CT-008 – Editar e Excluir Conteúdos
- **Requisitos Associados:** RF-012, RNF-004  
- **Objetivo:** Editar e excluir Flows e comentários próprios.
- **Passos:**
  - Acessar "Meus Flows"
  - Editar um Flow
  - Excluir um comentário
- **Critério de Êxito:** Ações realizadas com feedback visual claro.

---

## Restrições

| ID   | Descrição                                                                 |
|------|---------------------------------------------------------------------------|
| 001  | Plataforma acessível apenas para funcionários cadastrados                 |
| 002  | Empresas podem moderar conteúdos                                          |
| 003  | Possíveis limitações de desempenho devido à infraestrutura                |
| 004  | Acesso restrito a conteúdos privados apenas para usuários autorizados     |
| 005  | Dados sensíveis devem seguir boas práticas de segurança (criptografia, etc.) |

---

