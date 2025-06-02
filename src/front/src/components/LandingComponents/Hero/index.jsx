import { Description, Heading, HeroContainer, HeroContent, SignUpButton } from "./styles";
import { ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom';




const Hero = () => {
    return(
        <HeroContainer>
            <HeroContent>
                <Heading>
                vamos <strong>transformar</strong> o jeito como sua<br />
                empresa acessa o próprio<br />
                conhecimento?
                </Heading>
                <Link to="/cadastro"> 
                    <SignUpButton >Cadastrar <ChevronRight strokeWidth={3} size={25} /></SignUpButton>
                </Link>
                <Description>Nossos diferenciais não param somente em soluções mas também no quesito financeiro. O KnowFlow será oferecido por meio de planos escaláveis, com um <strong>teste gratuito de 30 dias</strong> para atrair empresas e validar a solução internamente antes do compromisso.</Description>
            </HeroContent>
        </HeroContainer>
        
    )

} 

export default Hero