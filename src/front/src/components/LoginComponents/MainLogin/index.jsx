import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

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
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/usuario/login', {
        email,
        senha,
      });

      const { token } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', token);

      alert('Login realizado com sucesso!');
      navigate('/feed'); // redireciona para o feed após login bem-sucedido
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem);
      } else {
        alert('Erro ao realizar login.');
      }
    }
  };

  return (
    <CardLogin>
      <form onSubmit={handleLogin}>
        <Title>bem vindo de volta!</Title>
        <Subtitle>
          Somos a plataforma definitiva de gestão do conhecimento corporativo
        </Subtitle>
        <InputGroup>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </InputGroup>
        <HelpText>Está com problemas para fazer login?</HelpText>

        <Button type="submit">Entrar</Button>
      </form>

      <Divider>Ou continue com</Divider>

      <GoogleButton type="button">G</GoogleButton>
    </CardLogin>
  );
};

export default MainLogin;
