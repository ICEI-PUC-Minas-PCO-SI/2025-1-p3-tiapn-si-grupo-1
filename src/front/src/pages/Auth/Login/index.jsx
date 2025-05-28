import { Container, Form, Input, Button, Title } from './style';

const Login = () => {
  return (
    <Container>
      <Form>
        <Title>Entrar</Title>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
