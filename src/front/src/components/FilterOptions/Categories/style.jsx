import styled from "styled-components";

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CategoryButton = styled.button`
  display: flex;
  font-size: 11px;
  gap: 3px;
  align-items: center;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: #fff;
  color: #565656;
  border: 2px solid #dee2ff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: 500;

  background-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#333")};
  border-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#dee2ff")};

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#233dff" : "#dee2ff")};
    border: 2px solid #233dff;
    transform: scale(1.03);
  }
`;
