import React from 'react';
import * as S from './style';
import { MessageCircle, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';

// Componente que exibe um único post da comunidade
export const CommunityPost = ({ post, onVote, onSave }) => {
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
      {/* Rodapé com ações (votar, comentar, salvar) */}
      <S.PostFooter>
        <S.VoteButton
          active={post.isUpvoted}
          onClick={() => onVote(post.id, 'up')}
        >
          <ArrowUp size={16} /> {post.upvotes}
        </S.VoteButton>
        <S.VoteButton
          active={post.isDownvoted}
          onClick={() => onVote(post.id, 'down')}
        >
          <ArrowDown size={16} /> {post.downvotes}
        </S.VoteButton>
        <S.CommentButton>
          <MessageCircle size={16} /> {post.comments}
        </S.CommentButton>
        <S.SaveButton
          active={post.isSaved}
          onClick={() => onSave(post.id)}
        >
          <Bookmark size={16} />
        </S.SaveButton>
      </S.PostFooter>
    </S.PostCard>
  );
};