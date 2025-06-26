import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronRight } from 'lucide-react';
import api from '../../../services/api';
import * as S from './style';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      toast.error('Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/usuario/cadastro', {
        nome,
        email,
        senha,
      });

      toast.success(response.data.mensagem || 'Usuário cadastrado com sucesso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      toast.error(
        error.response?.data?.mensagem || error.response?.data?.erro || 'Erro ao cadastrar usuário. Tente novamente.'
      );
    }
  };

  const handleGoogleRegister = () => {
    toast.info('Cadastro com Google ainda não implementado.');
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
          <Link to="/login">
            <S.LoginButton>
              Login
              <ChevronRight strokeWidth={2} size={20} />
            </S.LoginButton>
          </Link>
        </S.ButtonContainer>
      </S.Header>
      <S.Main>
        <S.Card>
          <S.Title>Criando sua nova conta</S.Title>
          <S.Subtitle>
            Junte-se à plataforma definitiva de gestão do conhecimento corporativo
          </S.Subtitle>
          <S.Form onSubmit={handleRegister}>
            <S.Input
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
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
            <S.HelpText href="#">Está com problemas para fazer seu cadastro?</S.HelpText>
            <S.Button type="submit">Cadastrar</S.Button>
          </S.Form>
          <S.Divider>Ou continue com</S.Divider>
          <S.GoogleButton type="button" onClick={handleGoogleRegister}>
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width="20"
            />
            Cadastrar com Google
          </S.GoogleButton>
        </S.Card>
      </S.Main>
    </S.Container>
  );
};

export default Register;