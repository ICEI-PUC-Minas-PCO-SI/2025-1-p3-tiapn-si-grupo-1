import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 6px 12px;
  border-radius: 24px;
  background-color: #fff;
  color: #565656;
  border: 1px solid #565656;
  cursor: pointer;
  transition: background-color 0.7s ease-in;

  background-color: ${({ $isActive }) => ($isActive ? "#fff" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#233dff" : "#333")};
  border-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#565656")};

  &:hover {
    border: 1px solid #233dff;
    color: #233dff;
  }
`;
