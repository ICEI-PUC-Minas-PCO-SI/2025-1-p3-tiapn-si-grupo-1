import React, { useState, useEffect } from 'react';
import * as S from './style';
import axios from 'axios';

export const FiltrosComunidade = ({ onOpenCreateFlow }) => {
  const [users, setUsers] = useState([]);

  // Carregar lista de usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
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
          {users.map((user) => (
            <S.UserAvatar
              key={user.id}
              src={user.avatar || '/placeholder.svg?height=40&width=40'}
              alt={user.nome}
              title={user.nome}
            />
          ))}
        </S.UserList>
      </S.Section>
      <S.LogoSection>
        <a href="">
            <img src="../public/KnowFlow-Logo.png" alt="" />
         </a>
      </S.LogoSection>
    </S.Container>
  );
};