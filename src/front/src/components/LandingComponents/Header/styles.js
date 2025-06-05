import styled from "styled-components"
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  margin: 0 auto;
  height: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 1rem 1.5rem;
    gap: 1rem;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;


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
  

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

export const NavItem = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #565656;
  transition: color 0.2s;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.10); 
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
`

export const LoginButton = styled.a`
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  padding: 1.0rem 1.5rem;
  font-weight: 600;
  color: #565656;
  transition: color 0.2s;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.10); 
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 0.8rem 1rem;
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    transform: scale(1.05); 
  }
`;

export const SignUpButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  color: white;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background-color: #233DFF;
  font-size: 15px;
  text-decoration: none;   
  transition: transform 0.2s ease-in-out;


  &:hover {
    transform: scale(1.05); 
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.8rem 1rem;
  }
`
