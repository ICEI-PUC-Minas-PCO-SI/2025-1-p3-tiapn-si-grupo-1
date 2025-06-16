import React from 'react';
import * as S from './style';
import { Search, X } from 'lucide-react';

// Componente de barra de pesquisa para a comunidade
export const SearchBarCommunity = ({ searchTerm, setSearchTerm }) => {
  // Função para limpar o campo de busca
  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <S.SearchContainer>
      <Search size={20} />
      <S.SearchInput
        placeholder="Pesquisar posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <S.ClearButton onClick={handleClear}>
          <X size={16} />
        </S.ClearButton>
      )}
    </S.SearchContainer>
  );
};