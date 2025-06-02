import { HeaderContainer, LogoContainer, Nav, NavItem, ButtonContainer, LoginButton, SignUpButton } from "./styles"
import { ChevronRight } from "lucide-react"

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
        <LoginButton href="#">Login</LoginButton>
        <SignUpButton href="#">Cadastrar<ChevronRight strokeWidth={3} size={25} /> </SignUpButton>
      </ButtonContainer>
    </HeaderContainer>
  )
}

export default Header
