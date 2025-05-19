import styled from 'styled-components';

export const Container = styled.div`

  form {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    padding: ${props => props.theme.spacing.xl};
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.white};
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const FormSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: ${props => props.error ? props.theme.colors.error : props.theme.colors.primary};
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: ${props => props.error ? props.theme.colors.error : props.theme.colors.primary};
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  }
  
  svg {
    margin-left: 6px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

export const NextButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  svg {
    margin-left: 8px;
  }
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
`;