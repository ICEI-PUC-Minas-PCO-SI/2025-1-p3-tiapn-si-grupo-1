import React from 'react';
import * as S from './style';
import { X } from 'lucide-react';

// Componente de formulário para criar um novo post
export const CreatePostForm = ({ onClose }) => {
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
          <S.Input placeholder="Título do post" />
          <S.TextArea placeholder="Conteúdo do post" />
          <S.Select>
            <option value="">Tipo de Post</option>
            {['Discussão', 'Pergunta', 'Flow Compartilhado', 'Showcase', 'Ajuda'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </S.Select>
          <S.Select>
            <option value="">Categoria</option>
            {['Recursos Humanos', 'Vendas', 'Tecnologia', 'Compliance', 'Marketing', 'Gestão'].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </S.Select>
          <S.Input placeholder="Tags (separadas por vírgula)" />
        </S.ModalBody>
        {/* Rodapé com botões de ação */}
        <S.ModalFooter>
          <S.Button onClick={onClose}>Cancelar</S.Button>
          <S.Button primary>Publicar</S.Button>
        </S.ModalFooter>
      </S.Modal>
    </S.ModalOverlay>
  );
};