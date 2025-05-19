import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
// import AuthRoutes from './AuthRoutes';
// import CommunityRoutes from './CommunityRoutes';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Rotas principais da aplicação */}
      <Route path="/*" element={<AppRoutes />} />
      
      {/* Rotas de autenticação (quando implementadas) */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}
      
      {/* Rotas da comunidade (quando implementadas) */}
      {/* <Route path="/comunidade/*" element={<CommunityRoutes />} /> */}
      
      {/* Rota para página não encontrada */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
};

export default MainRoutes;