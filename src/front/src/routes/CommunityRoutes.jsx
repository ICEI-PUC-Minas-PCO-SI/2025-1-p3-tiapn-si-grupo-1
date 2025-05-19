import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/Login';
// import Cadastro from '../pages/Cadastro';
// import RecuperarSenha from '../pages/RecuperarSenha';

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Rotas de autenticação */}
      <Route path="/login" element={<div>Página de Login</div>} />
      <Route path="/cadastro" element={<div>Página de Cadastro</div>} />
      <Route path="/recuperar-senha" element={<div>Recuperar Senha</div>} />
    </Routes>
  );
};

export default AuthRoutes;