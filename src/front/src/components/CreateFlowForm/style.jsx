// src/components/CreateFlowForm/style.jsx
import styled from 'styled-components';

export const FormContainer = styled.form`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 5rem 0rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
`;

export const TagInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const AddTagButton = styled.button`
  padding: 0 1rem;
  background-color: #233dff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

export const Tag = styled.span`
  display: inline-block;
  background-color: #233dff;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  margin: 0.3rem 0.4rem 0 0;
  font-size: 0.85rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const PrimaryButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #233dff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #1b2ecc;
  }
`;
