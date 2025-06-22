import React, { useState, useEffect } from 'react';
import * as S from './style';
import { X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postTypes, categories } from '../../data/mockPosts';

// Componente de formulário para criar ou editar um post
export const CreatePostForm = ({ onClose, onPostCreated, onPostUpdated, postToEdit, isEditing, currentUserId }) => {
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pré-preencher os campos no modo de edição
  useEffect(() => {
    if (isEditing && postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setType(postToEdit.type);
      setCategory(postToEdit.category);
      setTags(postToEdit.tags.join(', '));
    }
  }, [isEditing, postToEdit]);

  // Função para criar as iniciais do nome do usuário
  const getIniciais = (nome) => {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();
  };

  // Função para obter o nome do usuário (usado apenas na criação)
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
      setError('Usuário não autenticado. Faça login para criar ou editar um post.');
      setIsSubmitting(false);
      return;
    }

    // Formatar tags (separadas por vírgula)
    const formattedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    // Payload da requisição
    const payload = {
      titulo: title,
      conteudo: content,
      tipo: type || 'Discussão',
      categoria: category || 'Geral',
      tags: formattedTags,
      usuario_id: currentUserId, // Usar currentUserId passado como prop
    };

    try {
      if (isEditing && postToEdit) {
        // Editar post existente
        const response = await axios.put(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade/${postToEdit.id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const updatedPost = {
          ...postToEdit,
          title: response.data.titulo,
          content: response.data.conteudo,
          type: response.data.tipo || 'Discussão',
          category: response.data.categoria || 'Geral',
          tags: response.data.tags || [],
          author: postToEdit.author, // Manter o autor original
          createdAt: postToEdit.createdAt, // Manter a data original
          createdAtRaw: postToEdit.createdAtRaw,
          upvotes: postToEdit.upvotes,
          downvotes: postToEdit.downvotes,
          comments: postToEdit.comments,
          hasFlow: response.data.tipo === 'Flow Compartilhado' || response.data.tipo === 'Showcase',
          flowId: postToEdit.id,
          isUpvoted: postToEdit.isUpvoted,
          isDownvoted: postToEdit.isDownvoted,
          isSaved: postToEdit.isSaved,
        };
        onPostUpdated(updatedPost);
        toast.success('Post atualizado com sucesso!');
      } else {
        // Criar novo post
        const userData = await fetchUserData(token);
        const { nome: userName } = userData;

        const response = await axios.post(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade',
          { ...payload, criado_por: currentUserId, criado_em: new Date().toISOString() },
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
            initials: getIniciais(userName),
            role: 'Membro',
            reputation: 0,
            id: currentUserId,
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
          createdAtRaw: response.data.criado_em,
          hasFlow: response.data.tipo === 'Flow Compartilhado' || response.data.tipo === 'Showcase',
          flowId: response.data.id,
          isUpvoted: false,
          isDownvoted: false,
          isSaved: false,
        };

        onPostCreated(newPost);
        toast.success('Post criado com sucesso!');
      }

      // Fechar o modal após sucesso
      onClose();
    } catch (err) {
      console.error('Erro ao salvar post:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        payloadSent: payload,
      });

      const errorMessage =
        err.response?.data?.erro ||
        err.response?.data?.message ||
        err.message ||
        'Erro ao salvar o post. Verifique os dados e tente novamente.';

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
          <h2>{isEditing ? 'Editar Post' : 'Criar Novo Post'}</h2>
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
            {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Publicar'}
          </S.Button>
        </S.ModalFooter>
      </S.Modal>
    </S.ModalOverlay>
  );
};