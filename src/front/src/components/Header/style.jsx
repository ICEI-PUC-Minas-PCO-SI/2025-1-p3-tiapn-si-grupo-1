import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 100px;
  background: #fff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 150px;
`;

export const Username = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #111;
  margin-bottom: 4px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #111;
`;

export const Button = styled.button`
  background-color: #233dff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #1d2ccc;
  }

  span {
    font-size: 16px;
  }
`;
