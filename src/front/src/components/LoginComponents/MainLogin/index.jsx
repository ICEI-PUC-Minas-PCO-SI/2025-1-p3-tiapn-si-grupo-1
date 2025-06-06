import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import do react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import do CSS
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

    if (!email.trim() || !senha.trim()) {
      toast.error('Preencha todos os campos!');
      return;
    }

    try {
      // Fazer login
      const loginResponse = await api.post('/usuario/login', {
        email,
        senha,
      });

      const { token } = loginResponse.data;

      // Salvar o token no localStorage
      localStorage.setItem('token', token);

      // Configurar o token no axios para a próxima requisição
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Chamar /usuario/me para obter o usuarioId
      const userResponse = await api.get('/usuario/me');
      const { id } = userResponse.data;

      if (!id) {
        console.warn('ID do usuário não encontrado na resposta de /usuario/me.');
        toast.warn('Login realizado, mas o ID do usuário não foi retornado.');
      }

      // Salvar usuarioId no localStorage
      if (id) {
        localStorage.setItem('usuarioId', id);
      }

      toast.success('Login realizado com sucesso!');
      navigate('/feed');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      toast.error(
        error.response?.data?.mensagem || error.response?.data?.erro || 'Erro ao realizar login. Tente novamente.'
      );
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Login com Google ainda não implementado.');
  };

  return (
    <CardLogin>
      {/* Notificações */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
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

      <GoogleButton type="button" onClick={handleGoogleLogin}>
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          width="24"
        />
        Entrar com Google
      </GoogleButton>
    </CardLogin>
  );
};

export default MainLogin;