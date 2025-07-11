import { HeaderContainer, LogoContainer, Nav, NavItem, ButtonContainer, LoginButton, SignUpButton, StyledLink} from "./styles"
import { ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <a href="/">
          <img src="/KnowFlow-Logo.png" alt="KnowFlow Logo" />
        </a>
      </LogoContainer>
      <Nav>
        <NavItem href="#">Features</NavItem>
        <NavItem href="#">Planos</NavItem>
        <NavItem href="#">FAQ</NavItem>
      </Nav>
      <ButtonContainer>
        <StyledLink to="/login">
          <LoginButton>Login</LoginButton>
        </StyledLink> 
        <Link to="/cadastro"> 
          <SignUpButton>Cadastrar  <ChevronRight strokeWidth={3} size={25} /> </SignUpButton>
        </Link> 
      </ButtonContainer>
    </HeaderContainer>
  )
}

export default Header
