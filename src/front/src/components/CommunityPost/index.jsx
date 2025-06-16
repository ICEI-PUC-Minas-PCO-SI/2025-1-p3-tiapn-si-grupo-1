import React from 'react';
import * as S from './style';
import { MessageCircle, ArrowUp, ArrowDown, Bookmark, Trash2, Eye } from 'lucide-react';

// Componente que exibe um único post da comunidade
export const CommunityPost = ({ post, onVote, onSave, onView, onDelete, currentUserId }) => {
  return (
    <S.PostCard>
      {/* Cabeçalho do post com informações do autor */}
      <S.PostHeader>
        <S.AuthorAvatar src={post.author.avatar} alt={post.author.name} />
        <div>
          <S.AuthorName>{post.author.name}</S.AuthorName>
          <S.AuthorRole>{post.author.role} • {post.createdAt}</S.AuthorRole>
        </div>
      </S.PostHeader>
      {/* Conteúdo principal do post */}
      <S.PostContent>
        <S.PostTitle>{post.title}</S.PostTitle>
        <S.PostText>{post.content.substring(0, 200)}...</S.PostText>
        <S.Tags>
          {post.tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.Tags>
      </S.PostContent>
      {/* Rodapé com ações (votar, comentar, salvar, visualizar, deletar) */}
      <S.PostFooter>
        <S.CommentButton>
          <MessageCircle size={16} /> {post.comments}
        </S.CommentButton>
        <S.SaveButton
          active={post.isSaved}
          onClick={() => onSave(post.id)}
        >
          <Bookmark size={16} />
        </S.SaveButton>
        <S.ViewButton onClick={onView}>
          <Eye size={16} /> Visualizar
        </S.ViewButton>
        {/* Exibe o botão de exclusão apenas se o usuário for o autor */}
        {currentUserId === post.author.id && (
          <S.DeleteButton onClick={onDelete}>
            <Trash2 size={16} />
          </S.DeleteButton>
        )}
      </S.PostFooter>
    </S.PostCard>
  );
};