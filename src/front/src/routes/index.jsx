import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Auth/Landing';
import FlowRoutes from './FlowRoutes';
import AuthRoutes from './AuthRoutes';
import CommunityRoutes from './CommunityRoutes';
import ProfileRoutes from './ProfileRoutes';

const MainRoutes = () => (
  <Routes>
    {/* Página inicial pública */}
    <Route path="/" element={<Landing />} />
    
    {/* Rotas públicas */}
    {AuthRoutes()}

    {/* Rotas autenticadas */}
    {FlowRoutes()}
    {CommunityRoutes()}
    {ProfileRoutes()}
  </Routes>
);

export default MainRoutes;
