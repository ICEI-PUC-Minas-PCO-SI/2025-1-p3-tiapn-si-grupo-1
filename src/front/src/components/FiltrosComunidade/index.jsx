import React, { useState, useEffect } from 'react';
import * as S from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, HeartHandshake, HandHelping } from 'lucide-react'; // Ícone para o botão

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
      <S.FundoEmoji> 
        <HeartHandshake color="#1443cf" size={30} />
      </S.FundoEmoji>
      <S.SectionTitle>Contribua com a Comunidade</S.SectionTitle>

      <S.luz>
      <S.SubTitle>
        <HandHelping /> Participe, crie e compartilhe! Sua contribuição pode ajudar as pessoas a aprender e evoluir todos os dias.
      </S.SubTitle>
      </S.luz>

      <S.SubTitleSmall>
        Vamos transformar <strong>JUNTOS </strong>o jeito como sua
empresa acessa o próprio conhecimento!
      </S.SubTitleSmall>
      <S.botaoFlow> 
      <S.CreateFlowButton onClick={handleCreateFlow}>
         Criar um Flow
      </S.CreateFlowButton>
      </S.botaoFlow>
    </S.Section>
    <S.ExtraInfo>Explore todas as possibilidades e venha transformar conhecimento em impacto!</S.ExtraInfo>
  </S.Container>
);
};
