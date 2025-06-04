import React from 'react';
import { Route } from 'react-router-dom';
import Profile from '../pages/Profile';

const ProfileRoutes = () => (
  <>
    <Route path="/perfil" element={<Profile />} />
  </>
);

export default ProfileRoutes;
