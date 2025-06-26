import React from 'react';
import { Route } from 'react-router-dom';
import { Community } from '../pages/Community';
import { PostPage } from '../pages/PostPage';

const CommunityRoutes = () => (
  <>
    <Route path="/comunidade" element={<Community />} />
    <Route path="/post/:id" element={<PostPage />} />
  </>
);

export default CommunityRoutes;