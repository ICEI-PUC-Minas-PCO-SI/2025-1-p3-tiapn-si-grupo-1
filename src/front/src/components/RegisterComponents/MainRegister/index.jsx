import {
  CardContainer,
  Title,
  Input,
  InputGroup,
  LinkText,
  Button,
  Divider,
  GoogleButton
} from './styles';

export const MainRegister = () => {
  return (
    <CardContainer>
      <Title>criando sua nova conta</Title>

      <InputGroup>
        <Input placeholder="Digite seu nome" />
        <Input placeholder="Digite seu e-mail" />
        <Input placeholder="Digite sua senha" />
      </InputGroup>

      <LinkText>Está com problemas para fazer seu Cadastro?</LinkText>

      <Button>Cadastrar</Button>

      <Divider>Ou continue com</Divider>

      <GoogleButton>
  <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width="24" />
</GoogleButton>

    </CardContainer>
  );
};
