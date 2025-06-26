import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 16px 30px 16px 20px; /* espaço à esquerda para o ícone */
  margin-top: 2rem;
  width: 100%;
  transition: border-color 0.3s;
  transition: all 0.4s ease-in-out;

  svg {
    color: #233dff;

  }

    &:hover {
    border-color: #233dff;
    background-color: #dee2ff;
  }

  &:focus {
    border-color: #233dff;
  }

  &::placeholder {
    color: #333333;
  }
`;

export const SearchInput = styled.input`
  border: none;
  font-size: 1rem;
  color: #333333;
  width: 100%;
  background: transparent;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #000000;
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #565656;
  padding: 0.25rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #233dff;
  }
`;