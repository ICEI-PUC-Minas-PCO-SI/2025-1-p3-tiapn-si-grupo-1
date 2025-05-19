import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import {
  Container,
  Header,
  Title,
  FormSection,
  SectionTitle,
  Input,
  TextArea,
  TagsContainer,
  Tag,
  AddButton,
  NextButton,
  ErrorMessage
} from './style';

const NovoFlow = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState(['Prototyping', 'Figma']);
  const [tags, setTags] = useState(['Prototyping', 'Figma']);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaTag, setNovaTag] = useState('');
  const [errors, setErrors] = useState({});

  // Validação do formulário
  const validarFormulario = () => {
    const novosErros = {};

    if (!titulo.trim()) {
      novosErros.titulo = 'O título é obrigatório';
    }

    if (!descricao.trim()) {
      novosErros.descricao = 'A descrição é obrigatória';
    }

    if (categorias.length === 0) {
      novosErros.categorias = 'Selecione pelo menos uma categoria';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Criar objeto com os dados do flow
    const novoFlow = {
      id: `flow-${Date.now()}`,
      titulo,
      descricao,
      categorias,
      tags,
      dataCriacao: new Date().toISOString(),
      nodes: [],
      edges: []
    };

    // Em um cenário real, você salvaria isso em um banco de dados
    // Por enquanto, vamos apenas salvar no localStorage para simular persistência
    const flows = JSON.parse(localStorage.getItem('knowflow_flows') || '[]');
    flows.push(novoFlow);
    localStorage.setItem('knowflow_flows', JSON.stringify(flows));

    // Navegar para a página de edição com o ID do novo flow
    navigate(`/flow/${novoFlow.id}/editar`);
  };

  const toggleCategoria = (categoria) => {
    if (categorias.includes(categoria)) {
      setCategorias(categorias.filter(c => c !== categoria));
    } else {
      setCategorias([...categorias, categoria]);
    }
  };

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const adicionarCategoria = () => {
    if (novaCategoria.trim() && !categorias.includes(novaCategoria)) {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria('');
    }
  };

  const adicionarTag = () => {
    if (novaTag.trim() && !tags.includes(novaTag)) {
      setTags([...tags, novaTag]);
      setNovaTag('');
    }
  };

  const removerCategoria = (categoria) => {
    setCategorias(categorias.filter(c => c !== categoria));
  };

  const removerTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Lista de categorias e tags pré-definidas
  const categoriasDisponiveis = ['Lorem ipsum', 'Sketch', 'Prototyping', 'Figma', 'XD', 'Design', 'UX', 'UI'];
  const tagsDisponiveis = ['Lorem ipsum', 'Sketch', 'Prototyping', 'Figma', 'XD', 'Design', 'UX', 'UI'];

  return (
    <Container>
      <Header>
        <Title>Adicionar novo fluxo</Title>
      </Header>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Escolha um título para o seu Flow</SectionTitle>
          <Input
            type="text"
            placeholder="Digite seu título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            error={errors.titulo}
          />
          {errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <SectionTitle>Crie uma descrição para o seu Flow</SectionTitle>
          <TextArea
            placeholder="Digite sua descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            error={errors.descricao}
          />
          {errors.descricao && <ErrorMessage>{errors.descricao}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <SectionTitle>Escolha as categorias do seu Flow</SectionTitle>
          <TagsContainer>
            {categorias.map((categoria) => (
              <Tag
                key={categoria}
                active={true}
                onClick={() => removerCategoria(categoria)}
              >
                {categoria}
                <X size={14} />
              </Tag>
            ))}

            {categoriasDisponiveis
              .filter(c => !categorias.includes(c))
              .map((categoria) => (
                <Tag
                  key={categoria}
                  active={false}
                  onClick={() => toggleCategoria(categoria)}
                >
                  {categoria}
                </Tag>
              ))
            }
          </TagsContainer>
          {errors.categorias && <ErrorMessage>{errors.categorias}</ErrorMessage>}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Input
              placeholder="Digite uma categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              style={{ flex: 1 }}
            />
            <AddButton type="button" onClick={adicionarCategoria}>
              Add Nova +
            </AddButton>
          </div>
        </FormSection>

        <FormSection>
          <SectionTitle>Escolha as #tags do seu Flow</SectionTitle>
          <TagsContainer>
            {tags.map((tag) => (
              <Tag
                key={tag}
                active={true}
                onClick={() => removerTag(tag)}
              >
                {tag}
                <X size={14} />
              </Tag>
            ))}

            {tagsDisponiveis
              .filter(t => !tags.includes(t))
              .map((tag) => (
                <Tag
                  key={tag}
                  active={false}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Tag>
              ))
            }
          </TagsContainer>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Input
              placeholder="Digite uma tag"
              value={novaTag}
              onChange={(e) => setNovaTag(e.target.value)}
              style={{ flex: 1 }}
            />
            <AddButton type="button" onClick={adicionarTag}>
              Add Nova +
            </AddButton>
          </div>
        </FormSection>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <NextButton type="submit">
            Próximo
            <ChevronRight size={20} />
          </NextButton>
        </div>
      </form>
    </Container>
  );
};

export default NovoFlow;