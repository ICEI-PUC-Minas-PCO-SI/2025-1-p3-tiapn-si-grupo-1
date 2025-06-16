import React from 'react';
import * as S from './style';
import { X, Trash2 } from 'lucide-react';

// Componente para exibir os detalhes de um post
export const PostDetail = ({ post, onClose, onDelete, currentUserId }) => {
  return (
    <S.ModalOverlay>
      <S.Modal>
        {/* Cabeçalho do modal */}
        <S.ModalHeader>
          <h2>{post.title}</h2>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.ModalHeader>
        {/* Corpo do modal */}
        <S.ModalBody>
          <S.PostHeader>
            <S.AuthorAvatar src={post.author.avatar} alt={post.author.name} />
            <div>
              <S.AuthorName>{post.author.name}</S.AuthorName>
              <S.AuthorRole>{post.author.role} • {post.createdAt}</S.AuthorRole>
            </div>
          </S.PostHeader>
          <S.PostContent>
            <S.PostText>{post.content}</S.PostText>
            <S.Tags>
              {post.tags.map((tag) => (
                <S.Tag key={tag}>{tag}</S.Tag>
              ))}
            </S.Tags>
            <S.PostMeta>
              <span>Tipo: {post.type}</span>
              <span>Categoria: {post.category}</span>
            </S.PostMeta>
          </S.PostContent>
        </S.ModalBody>
        {/* Rodapé com ações */}
        <S.ModalFooter>
          <S.Button onClick={onClose}>Fechar</S.Button>
          {/* Exibe o botão de exclusão apenas se o usuário for o autor */}
          {currentUserId === post.author.id && (
            <S.DeleteButton onClick={onDelete}>
              <Trash2 size={16} /> Deletar
            </S.DeleteButton>
          )}
        </S.ModalFooter>
      </S.Modal>
    </S.ModalOverlay>
  );
};