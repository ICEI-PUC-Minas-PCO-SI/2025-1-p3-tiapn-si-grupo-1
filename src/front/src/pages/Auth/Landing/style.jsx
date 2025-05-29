import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ButtonLink = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme, secondary }) =>
    secondary ? '#eee' : theme.colors.primary};
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.textPrimary : 'white'};
  border: ${({ secondary }) => (secondary ? '1px solid #ccc' : 'none')};

  &:hover {
    background-color: ${({ theme, secondary }) =>
      secondary ? '#ddd' : theme.colors.primaryDark};
  }
`;
