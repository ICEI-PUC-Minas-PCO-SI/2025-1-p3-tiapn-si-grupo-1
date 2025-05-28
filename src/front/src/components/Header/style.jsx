import styled from "styled-components";
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 13px;
    color: #888;
    margin: 0;
  }
`;

export const FlowTitle = styled.h1`
  font-size: 1.6rem;
  color: #111;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconButton = styled.button`
  background: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  svg {
    width: 18px;
    height: 18px;
    color: #233dff;
  }
`;

export const AddNodeMenu = styled.div`
  display: flex;
  gap: 8px;
  background: #fff;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 0 0 1px #e0e0e0;
`;
