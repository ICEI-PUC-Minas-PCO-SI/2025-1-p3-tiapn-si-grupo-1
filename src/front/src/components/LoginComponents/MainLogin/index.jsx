import React from 'react';
import {
  CardLogin,
  Title,
  Subtitle,
  Input,
  Button,
  Divider,
  GoogleButton,
  HelpText,
  InputGroup,
} from './styles';

const MainLogin = () => {
  return (
    <CardLogin>
      <Title>bem vindo de volta!</Title>
      <Subtitle>Somos a plataforma definitiva de gestão do conhecimento corporativo</Subtitle>
      <InputGroup>
        <Input type="email" placeholder="Digite seu email" />
        <Input type="password" placeholder="Digite sua senha" />
      </InputGroup>
      <HelpText>Está com problemas para fazer login?</HelpText>

      <Button>Entrar</Button>

      <Divider>Ou continue com</Divider>

      <GoogleButton>G</GoogleButton>
    </CardLogin>
  );
};

export default MainLogin;
