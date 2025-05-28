import React from 'react';
import { Route } from 'react-router-dom';
import CreateFlow from '../pages/CreateFlow';
import EditorFlow from '../pages/EditorFlow';

const AppRoutes = () => (
  <>
    <Route path="/criar-flow" element={<CreateFlow />} />
    <Route path="/flow/:id/editar" element={<EditorFlow />} />
  </>
);

export default AppRoutes;
