import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 24px 32px 24px 56px; /* espaço à esquerda para o ícone */
  font-size: 16px;
  border: none;
  outline: none;
  transition: border-color 0.3s;
  transition: all 0.4s ease-in-out;

  border-top-left-radius: 15px;

  &::placeholder {
    color: #66768c;
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
