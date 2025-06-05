import styled from 'styled-components';

// Estilização do contêiner principal do nó
export const NodeContainer = styled.div`
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  border: 2px solid ${({ selected }) => (selected ? '#233DFF' : '#E2E8F0')};
  min-width: 240px;
  max-width: 280px;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: ${({ selected }) => (selected ? 'scale(1.05)' : 'scale(1)')};
  &:hover {
    border-color: ${({ selected }) => (selected ? '#233DFF' : '#CBD5E1')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Estilização do handle (conector do ReactFlow)
export const handleStyles = 'width: 12px; height: 12px; background: #233DFF; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);';

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
  background: #233DFF;
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
  font-size: 12px;
  color: #6B7280;
  line-height: 1.5;
`;

// Estilização do título
export const Title = styled.div`
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 4px;
  font-size: 14px;
`;

// Estilização do texto
export const Text = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;