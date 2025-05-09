CREATE TABLE usuario (
  id UUID PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE status_flow AS ENUM ('rascunho');

CREATE TABLE flow (
  id UUID PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT,
  conteudo_nos JSONB NOT NULL,
  conteudo_conexoes JSONB NOT NULL,
  criado_por UUID REFERENCES usuario(id),
  tags TEXT[] DEFAULT '{}',
  categoria VARCHAR(100),
  status status_flow NOT NULL DEFAULT 'rascunho',
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE comentario (
  id UUID PRIMARY KEY,
  usuario_id UUID REFERENCES usuario(id),
  flow_id UUID REFERENCES flow(id),
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE curtida (
  usuario_id UUID REFERENCES usuario(id),
  flow_id UUID REFERENCES flow(id),
  PRIMARY KEY (usuario_id, flow_id)
);
CREATE TABLE flow_salvo (
  usuario_id UUID REFERENCES usuario(id),
  flow_id UUID REFERENCES flow(id),
  PRIMARY KEY (usuario_id, flow_id)
);
CREATE TABLE postagem_comunidade (
  id UUID PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  conteudo TEXT NOT NULL,
  criado_por UUID REFERENCES usuario(id),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE comentario_postagem (
  id UUID PRIMARY KEY,
  postagem_id UUID REFERENCES postagem_comunidade(id),
  usuario_id UUID REFERENCES usuario(id),
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);