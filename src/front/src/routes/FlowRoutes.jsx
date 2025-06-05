import React from 'react';
import { Route } from 'react-router-dom';
import FlowEditor from '../pages/FlowEditor';

const FlowRoutes = () => (
  <>
    <Route path="/criar-flow" element={<FlowEditor />} />
  </>
);

export default FlowRoutes;
