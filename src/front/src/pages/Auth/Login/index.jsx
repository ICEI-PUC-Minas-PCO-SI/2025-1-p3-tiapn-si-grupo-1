import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronRight } from 'lucide-react';
import api from '../../../services/api';
import * as S from './style';

const Login = () => {
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
      const loginResponse = await api.post('/usuario/login', {
        email,
        senha,
      });

      const { token } = loginResponse.data;
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const userResponse = await api.get('/usuario/me');
      const { id } = userResponse.data;

      if (!id) {
        console.warn('ID do usuário não encontrado na resposta de /usuario/me.');
        toast.warn('Login realizado, mas o ID do usuário não foi retornado.');
      }

      if (id) {
        localStorage.setItem('usuarioId', id);
      }

      toast.success('Login realizado com sucesso!');
      setTimeout(() => navigate('/feed'), 1000);
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
    <S.Container>
      <S.ToastOverride>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          style={{ top: '75px' }}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </S.ToastOverride>
      <S.Header>
        <S.LogoContainer>
          <Link to="/">
            <img src="/KnowFlow-Logo.png" alt="KnowFlow Logo" />
          </Link>
        </S.LogoContainer>
        <S.ButtonContainer>
          <Link to="/cadastro">
            <S.SignUpButton>
              Cadastrar
              <ChevronRight strokeWidth={2} size={20} />
            </S.SignUpButton>
          </Link>
        </S.ButtonContainer>
      </S.Header>
      <S.Main>
        <S.Card>
          <S.Title>Bem-vindo de volta!</S.Title>
          <S.Subtitle>
            Somos a plataforma definitiva de gestão do conhecimento corporativo
          </S.Subtitle>
          <S.Form onSubmit={handleLogin}>
            <S.Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <S.Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <S.HelpText href="#">Está com problemas para fazer login?</S.HelpText>
            <S.Button type="submit">Entrar</S.Button>
          </S.Form>
          <S.Divider>Ou continue com</S.Divider>
          <S.GoogleButton type="button" onClick={handleGoogleLogin}>
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width="20"
            />
            Entrar com Google
          </S.GoogleButton>
        </S.Card>
      </S.Main>
    </S.Container>
  );
};

export default Login;