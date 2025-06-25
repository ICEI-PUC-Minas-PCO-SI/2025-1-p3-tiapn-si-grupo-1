import React, { useState, useEffect } from 'react';
import * as S from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react'; // Ícone para o botão

export const FiltrosComunidade = ({ onOpenCreateFlow }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleCreateFlow = () => {
    if (onOpenCreateFlow) {
      onOpenCreateFlow();
    } else {
      navigate('/criar-flow');
    }
  };

  // Função para obter as iniciais do nome
  const getIniciais = (nome) => {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();
  };

  // Gerar cor gradiente baseada no ID do usuário
  const getGradientColor = (id) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#d4a5a5'];
    return `linear-gradient(135deg, ${colors[id % colors.length]} 0%, #ffffff 70%)`;
  };

  // Carregar lista de usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token não encontrado. Usuário não autenticado.');
          return;
        }
        const response = await axios.get(
          'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(response.data.slice(0, 10)); // Limitar a 10 usuários
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <S.Container>
      <S.Section>
        <S.SectionTitle>Contribua com a Comunidade</S.SectionTitle>
        <S.IncentiveMessage>
          <span role="img" aria-label="lampada">💡</span> Crie flows incríveis e ajude outras pessoas a aprender e crescer!
        </S.IncentiveMessage>
        <S.CreateFlowButton onClick={handleCreateFlow}>
          <Plus size={16} /> Criar um Flow
        </S.CreateFlowButton>
      </S.Section>
      <S.Section>
        <S.SectionTitle>Membros Ativos</S.SectionTitle>
        <S.UserList>
          {users.map((user) => (
            <S.UserCard key={user.id} style={{ background: getGradientColor(user.id) }}>
              <S.Avatar>{getIniciais(user.nome)}</S.Avatar>
              <S.UserName title={user.nome}>{user.nome.length > 12 ? `${user.nome.slice(0, 12)}...` : user.nome}</S.UserName>
            </S.UserCard>
          ))}
          {users.length > 0 && (
            <S.ViewMoreButton onClick={() => console.log('Ver mais usuários')}>
              Ver todos
            </S.ViewMoreButton>
          )}
        </S.UserList>
      </S.Section>
      <S.LogoSection>
        <a href="">
          <img src="/KnowFlow-Logo.png" alt="Logo KnowFlow" />
        </a>
      </S.LogoSection>
      <S.FooterSection>
        <S.FooterLinks>
          <a href="/termos-de-servico">Termos de Serviço</a>
          <span>|</span>
          <a href="/politica-de-privacidade">Política de Privacidade</a>
          <span>|</span>
          <a href="/politica-de-cookies">Política de Cookies</a>
          <span>|</span>
          <a href="/acessibilidade">Acessibilidade</a>
          <span>|</span>
          <a href="/informacoes-de-anuncios">Informações de Anúncios</a>
          <span>|</span>
          <a href="/mais">Mais</a>
        </S.FooterLinks>
        <S.Copyright>© 2025 KnowFlow Corp.</S.Copyright>
      </S.FooterSection>
    </S.Container>
  );
};