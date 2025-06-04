import { useRef, useEffect } from "react";
import { Card, Circleplus, DescriptionF, Diferencial, FeaturesContainer, RotatedSplit, ThreeColumnContainer, UsersStyle, HorizontalLine2 } from "./styles";



const Features = () => {
    const horizontalLineRef = useRef(null);  
    
    useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY;
       const triggerPoint = 200;
       const progress = Math.min((scrollTop - triggerPoint) / 1500, 1);
    
       if (horizontalLineRef.current) {
         horizontalLineRef.current.style.transform = `scaleX(${progress})`;
       }
     };
    
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <FeaturesContainer>
        <Diferencial>Nosso <strong>diferencial</strong> está em...</Diferencial>
        <ThreeColumnContainer>
            <Card>
                <RotatedSplit/>
                <p><strong>Feed</strong> corporativo <strong>inteligente</strong> e segmentado com <strong>fácil acesso</strong> e busca</p>
            </Card>
            <Card>
                <Circleplus/>
                 <p>Criação de <strong>documentações interativas</strong> que auxiliam na <strong>retenção do conhecimento</strong> por meio de fluxos</p>
            </Card>
            <Card>
                <UsersStyle/>
                <p><strong>Feedback contínuo</strong> com avaliação do material e sugestões de colaboradores</p>
            </Card>
        </ThreeColumnContainer>
         <HorizontalLine2 ref={horizontalLineRef}/> 
        <DescriptionF>Enquanto outras ferramentas de mercado oferecem funcionalidades genéricas, o KnowFlow foi construído com um único objetivo: <strong>ser a plataforma definitiva de gestão do conhecimento corporativo.</strong></DescriptionF>
    </FeaturesContainer>
  )
}

export default Features