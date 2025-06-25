import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 30px 16px 50px; /* espaço à esquerda para o ícone */
  font-size: 14px;
  border: 1px solid #dee2ff;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  transition: all 0.4s ease-in-out;

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

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const IconWrapper = styled.div`
  color: #233dff;
  pointer-events: none;
  left: 20px;
  position: absolute;
`;
