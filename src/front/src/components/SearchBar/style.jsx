import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;

  padding: 16px 30px 16px 46px; /* espaço à esquerda para o ícone */
  font-size: 16px;
  border: 1px solid #dee2ff;
  border-radius: 10px;
  outline: none;
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
  position: relative;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #233dff;
  pointer-events: none;
`;
