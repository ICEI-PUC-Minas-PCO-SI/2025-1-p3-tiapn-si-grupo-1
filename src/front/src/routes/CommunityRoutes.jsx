import React from 'react';
import { Route } from 'react-router-dom';
import { Community } from '../pages/Community';

const CommunityRoutes = () => (
  <>
    <Route path="/comunidade" element={<Community/>} />
  </>
);

export default CommunityRoutes;
