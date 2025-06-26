import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #fff;
  color: #565656;
  border: 2px solid #dee2ff;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-weight: 500;

  background-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#333")};
  border-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#dee2ff")};

  &:hover {
    border: 2px solid #233dff;
    background-color: #dee2ff;
    transform: scale(1.05);
  }
`;
