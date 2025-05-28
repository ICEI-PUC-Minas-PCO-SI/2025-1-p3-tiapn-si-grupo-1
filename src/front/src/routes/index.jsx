import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Auth/Landing';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import CommunityRoutes from './CommunityRoutes';

const MainRoutes = () => (
  <Routes>
    {/* Página inicial pública */}
    <Route path="/" element={<Landing />} />
    
    {/* Rotas públicas */}
    {AuthRoutes()}

    {/* Rotas autenticadas */}
    {AppRoutes()}
    {CommunityRoutes()}
  </Routes>
);

export default MainRoutes;
