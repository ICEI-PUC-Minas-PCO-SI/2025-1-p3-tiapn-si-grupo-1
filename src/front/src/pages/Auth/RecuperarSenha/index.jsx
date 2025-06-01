import { Container, Form, Input, Button, Title } from './style';

const RecuperarSenha = () => {
  return (
    <Container>
      <Form>
        <Title>Recuperar Senha</Title>
        <Input type="email" placeholder="Digite seu email" />
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
};

export default RecuperarSenha;
