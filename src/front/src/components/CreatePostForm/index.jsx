import React, { useState } from 'react';
import * as S from './style';
import { X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { postTypes, categories } from '../../data/mockPosts';

// Componente de formulário para criar um novo post
export const CreatePostForm = ({ onClose, onPostCreated }) => {
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para criar as iniciais do nome do usuário
  const getIniciais = (nome) => {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();
  };

  // Função para obter o ID e nome do usuário
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return {
        id: response.data.id,
        nome: response.data.nome,
      };
    } catch (err) {
      throw new Error(err.response?.data?.erro || 'Erro ao buscar dados do usuário.');
    }
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validação básica
    if (!title.trim() || !content.trim()) {
      setError('Por favor, preencha o título e o conteúdo.');
      setIsSubmitting(false);
      return;
    }

    // Obter token de autenticação
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado. Faça login para criar um post.');
      setIsSubmitting(false);
      return;
    }

    // Formatar tags (separadas por vírgula)
    const formattedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    try {
      // Obter ID e nome do usuário
      const userData = await fetchUserData(token);
      const { id: userId, nome: userName } = userData;

      // Gerar data de criação no formato ISO 8601
      const createdAt = new Date().toISOString();

      // Payload da requisição
      const payload = {
        titulo: title,
        conteudo: content,
        criado_por: userId,
        criado_em: createdAt,
        tipo: type || 'Discussão',
        categoria: category || 'Geral',
        tags: formattedTags,
      };

      // Enviar requisição para criar o post
      const response = await axios.post(
        'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Mapear resposta da API para o formato esperado pelo front-end
      const newPost = {
        id: response.data.id,
        title: response.data.titulo,
        content: response.data.conteudo,
        author: {
          name: userName,
          avatar: getIniciais(userName),
          role: 'Membro',
          reputation: 0,
          id: userId,
        },
        type: response.data.tipo || 'Discussão',
        category: response.data.categoria || 'Geral',
        tags: response.data.tags || [],
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        createdAt: new Date(response.data.criado_em).toLocaleString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        hasFlow: response.data.tipo === 'Flow Compartilhado' || response.data.tipo === 'Showcase',
        flowId: response.data.id,
        isUpvoted: false,
        isDownvoted: false,
        isSaved: false,
      };

      // Notificar o componente pai sobre o novo post
      onPostCreated(newPost);

      // Fechar o modal após sucesso
      onClose();
    } catch (err) {
      console.error('Erro ao criar post:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        payloadSent: payload,
      });

      const errorMessage =
        err.response?.data?.erro ||
        err.response?.data?.message ||
        err.message ||
        'Erro ao criar o post. Verifique os dados e tente novamente.';

      setError(errorMessage);

      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        setError('Sessão expirada. Faça login novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.ModalOverlay>
      <S.Modal>
        {/* Cabeçalho do modal */}
        <S.ModalHeader>
          <h2>Criar Novo Post</h2>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.ModalHeader>
        {/* Corpo do formulário */}
        <S.ModalBody>
          {error && (
            <S.ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </S.ErrorMessage>
          )}
          <S.Input
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          <S.TextArea
            placeholder="Conteúdo do post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          <S.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Tipo de Post</option>
            {postTypes.slice(1).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </S.Select>
          <S.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Categoria</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </S.Select>
          <S.Input
            placeholder="Tags (separadas por vírgula)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={isSubmitting}
          />
        </S.ModalBody>
        {/* Rodapé com botões de ação */}
        <S.ModalFooter>
          <S.Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </S.Button>
          <S.Button
            primary
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </S.Button>
        </S.ModalFooter>
      </S.Modal>
    </S.ModalOverlay>
  );
};