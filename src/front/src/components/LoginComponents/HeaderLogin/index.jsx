import { HeaderContainer, LogoContainer, ButtonContainer, SignUpButton } from "./style"
import { ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom';


const HeaderLogin = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <a href="/">
          <img src="/KnowFlow-Logo.png" alt="KnowFlow Logo" />
        </a>
      </LogoContainer>
 
      <ButtonContainer>
        <Link to="/cadastro"> 
          <SignUpButton>Cadastrar<ChevronRight strokeWidth={3} size={25} /> </SignUpButton>
        </Link> 
      </ButtonContainer>
    </HeaderContainer>
  )
}

export default HeaderLogin
