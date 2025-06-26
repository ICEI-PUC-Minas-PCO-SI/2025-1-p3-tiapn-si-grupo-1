import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding:  3rem 1rem;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  align-items: center;
  justify-content: center;
`;

// Seção
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Ícone fundo
export const FundoEmoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 48px;
  height: 48px;
  border-radius: 12px;

  svg {
    flex-shrink: 0;
  }
`;

// Título
export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

// Subtítulo principal
export const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #ffffff;
  max-width: 90%;
  gap: 0.5rem;
  margin-top: 10px;

  svg {
  vertical-align: middle;
  margin-right: 0.5rem;
  margin-bottom: 2px;
  
}
`;

// Subtítulo menor
export const SubTitleSmall = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.4;
  color: #e0e0e0;
  max-width: 90%;
  
`;

// Botão
export const CreateFlowButton = styled.button`
  background-color: #ffffff;
  width: 50%;
  color: #1443cf;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(35, 61, 255, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 16px rgba(35, 61, 255, 0.4);
  }
`;

export const botaoFlow = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;`

// Texto extra
export const ExtraInfo = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #cfd1ff;
  text-align: left;
  margin-top: 1rem;
`;

export const luz = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* espaçamento entre o ícone e o texto */
`