import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 16px 30px 16px 46px; /* espaço à esquerda para o ícone */
  font-size: 16px;
  border: 1px solid #cccccc;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #233dff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #cccccc;
  pointer-events: none;
`;
