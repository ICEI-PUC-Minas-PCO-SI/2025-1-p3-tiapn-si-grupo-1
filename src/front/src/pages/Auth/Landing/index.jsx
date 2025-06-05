import { Container, Title, Description, ButtonsWrapper, ButtonLink } from './style';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container>
      <Title>Bem-vindo ao KnowFlow</Title>
      <Description>Documente seus processos de forma interativa e visual.</Description>
      <ButtonsWrapper>
        <ButtonLink as={Link} to="/login">Entrar</ButtonLink>
        <ButtonLink as={Link} to="/cadastro" secondary>Cadastro</ButtonLink>
      </ButtonsWrapper>
    </Container>
  );
};

export default Landing;
