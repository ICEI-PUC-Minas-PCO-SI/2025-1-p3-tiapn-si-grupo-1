import { Card, Circleplus, DescriptionF, Diferencial, FeaturesContainer, RotatedSplit, ThreeColumnContainer, UsersStyle } from "./styles";

const Features = () => {
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
        <DescriptionF>Enquanto outras ferramentas de mercado oferecem funcionalidades genéricas, o KnowFlow foi construído com um único objetivo: <strong>ser a plataforma definitiva de gestão do conhecimento corporativo.</strong></DescriptionF>
    </FeaturesContainer>
  )
}

export default Features