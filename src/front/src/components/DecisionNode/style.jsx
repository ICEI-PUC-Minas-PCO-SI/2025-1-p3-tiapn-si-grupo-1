import styled from 'styled-components';

// Estilização do contêiner principal do nó
export const NodeContainer = styled.div`
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  border: 2px solid ${({ selected }) => (selected ? '#6366F1' : '#E2E8F0')};
  min-width: 240px;
  max-width: 280px;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: ${({ selected }) => (selected ? 'scale(1.05)' : 'scale(1)')};
  &:hover {
    border-color: ${({ selected }) => (selected ? '#6366F1' : '#CBD5E1')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Estilização do handle (conector do ReactFlow)
export const handleStyles = `
  width: 12px;
  height: 12px;
  background: #6366F1;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;

// Estilização do cabeçalho do nó
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

// Estilização do ícone
export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  background: #6366F1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Estilização do rótulo
export const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
`;

// Estilização do conteúdo
export const Content = styled.div`
  margin-bottom: 8px;
`;

// Estilização da pergunta
export const Question = styled.div`
  font-weight: 600;
  color: #1E293B;
  font-size: 14px;
  margin-bottom: 8px;
`;

// Estilização das opções
export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Estilização de cada opção
export const Option = styled.div`
  background: #EEF2FF;
  border: 1px solid #C7D2FE;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #4B5563;
  text-align: left;
  height: 24px; /* Altura fixa para alinhamento */
  display: flex;
  align-items: center;
`;