import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Cadastro from '../pages/Auth/Register';
import RecuperarSenha from '../pages/Auth/RecuperarSenha';

const AuthRoutes = () => (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
  </>
);

export default AuthRoutes;
