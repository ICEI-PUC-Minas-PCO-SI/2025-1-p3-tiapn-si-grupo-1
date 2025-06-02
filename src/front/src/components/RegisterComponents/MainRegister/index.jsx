import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/usuario/cadastro', {
        nome,
        email,
        senha,
      });

      alert(response.data.mensagem); // Usuário cadastrado com sucesso!
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem);
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    }
  };

  return (
    <CardContainer>
      <Title>criando sua nova conta</Title>

      <form onSubmit={handleRegister}>
        <InputGroup>
          <Input
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Digite seu e-mail"
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

        <LinkText>Está com problemas para fazer seu Cadastro?</LinkText>

        <Button type="submit">Cadastrar</Button>
      </form>

      <Divider>Ou continue com</Divider>

      <GoogleButton type="button">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          width="24"
        />
      </GoogleButton>
    </CardContainer>
  );
};
