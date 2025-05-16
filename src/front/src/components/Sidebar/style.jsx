import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 80px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  justify-content: space-between;
  position: fixed;
`;

export const Logo = styled.img`
  width: 36px;
  margin-bottom: 10px;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  font-size: 12px;
  color: #111;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    color: #233dff;
    
    svg {
      fill: #233dff;
    }
  }

  &:hover {
    color: #233dff;
  }

  svg {
    transition: 0.2s ease;
  }

  span {
    font-size: 10px;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 16px 0;
`;
