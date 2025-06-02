import styled from "styled-components"


export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  margin: 0 auto;
  height: 100px;

`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 55px; 
    width: auto;
    margin-left: 5px
  }

  &:hover {
    transform: scale(1.02); 
  }
`

export const Nav = styled.nav`
  display: flex;
  gap: 5rem;

`

export const NavItem = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #565656;
  transition: color 0.2s;
  font-family: 'Inter', sans-serif;
  text-decoration: none;



    &:hover {
    transform: scale(1.10); 
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  font-weight: 600;
  
`

export const LoginButton = styled.a`
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  padding: 1.0rem 1.5rem;
  font-weight: 600;
  color: #565656;
  transition: color 0.2s;
  text-decoration: none;


    &:hover {
    transform: scale(1.10); 
  }

`

export const SignUpButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: white;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background-color: #233DFF;
  font-size: 15px;
  text-decoration: none;

  &:hover {
    transform: scale(1.05); 
  }

`
