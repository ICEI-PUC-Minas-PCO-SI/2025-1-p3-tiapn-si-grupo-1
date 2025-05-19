import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
import CreateFlow from '../pages/CreateFlow';
import EditorFlow from '../pages/EditorFlow';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota principal - substitua pelo componente Home quando estiver pronto */}
      <Route path="/" element={<div>Página Inicial</div>} />
      
      {/* Rotas de flows */}
      <Route path="/criar-flow" element={<CreateFlow />} />
      <Route path="/flow/:id/editar" element={<EditorFlow />} />
    </Routes>
  );
};

export default AppRoutes;