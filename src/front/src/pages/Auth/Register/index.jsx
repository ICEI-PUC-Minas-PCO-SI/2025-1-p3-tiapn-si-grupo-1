import { Container, Form, Input, Button, Title } from './style';

const Register = () => {
  return (
    <Container>
      <Form>
        <Title>Criar Conta</Title>
        <Input type="text" placeholder="Nome" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button>Registrar</Button>
      </Form>
    </Container>
  );
};

export default Register;
