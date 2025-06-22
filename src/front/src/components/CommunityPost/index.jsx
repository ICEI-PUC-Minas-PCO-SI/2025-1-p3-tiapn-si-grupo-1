import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { MessageCircle, Bookmark, Trash2, Edit } from 'lucide-react';

export const CommunityPost = ({ post, onVote, onSave, onDelete, onEdit, currentUserId }) => {
  const navigate = useNavigate();

  // Função para redirecionar ao clicar no card
  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  // Função para lidar com teclas (Enter ou Espaço)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <S.PostCard
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver post: ${post.title}`}
    >
      {/* Botão de edição no canto superior direito */}
      {currentUserId === post.author.id && (
        <S.EditButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(post);
          }}
          aria-label={`Editar post: ${post.title}`}
        >
          <Edit size={16} />
        </S.EditButton>
      )}
      <S.PostHeader>
        <S.Avatar>{post.author.initials}</S.Avatar>
        <div>
          <S.AuthorName>{post.author.name}</S.AuthorName>
          <S.AuthorRole>{post.author.role} • {post.createdAt}</S.AuthorRole>
        </div>
      </S.PostHeader>
      <S.PostContent>
        <S.PostTitle>{post.title}</S.PostTitle>
        <S.PostText>{post.content.substring(0, 200)}...</S.PostText>
        <S.Tags>
          {post.tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.Tags>
      </S.PostContent>
      <S.PostFooter>
        <S.CommentButton onClick={(e) => e.stopPropagation()}>
          <MessageCircle size={16} /> {post.comments}
        </S.CommentButton>
        <S.SaveButton
          active={post.isSaved}
          onClick={(e) => {
            e.stopPropagation();
            onSave(post.id);
          }}
        >
          <Bookmark size={16} />
        </S.SaveButton>
        {currentUserId === post.author.id && (
          <S.DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={16} />
          </S.DeleteButton>
        )}
      </S.PostFooter>
    </S.PostCard>
  );
};