import React, { useState, useEffect } from 'react';
import * as S from './style';
import axios from 'axios';

export const FiltrosComunidade = ({ onOpenCreateFlow }) => {
  const [users, setUsers] = useState([]);

  // Função para obter as iniciais do nome
  const getIniciais = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (
      partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase()
    );
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
        setUsers(response.data);
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
          Crie flows incríveis e ajude outras pessoas a aprender e crescer. Sua contribuição faz a diferença!
        </S.IncentiveMessage>
        <S.CreateFlowButton onClick={onOpenCreateFlow}>
          Criar um Flow
        </S.CreateFlowButton>
      </S.Section>
      <S.Section>
        <S.SectionTitle>Usuários</S.SectionTitle>
        <S.UserList>
          {users.slice(0, 40).map((user) => (
            <S.Avatar
              key={user.id}
              title={user.nome}
            >
              {getIniciais(user.nome)}
            </S.Avatar>
          ))}
        </S.UserList>
      </S.Section>
      <S.LogoSection>
        <a href="">
          <img src="../public/KnowFlow-Logo.png" alt="Logo KnowFlow" />
        </a>
      </S.LogoSection>
    </S.Container>
  );
};