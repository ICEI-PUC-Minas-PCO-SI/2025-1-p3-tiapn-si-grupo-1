import React from 'react';
import { Route } from 'react-router-dom';
import FlowEditor from '../pages/FlowEditor';
import FlowViewer from '../pages/FlowViewer';

const FlowRoutes = () => (
  <>
    <Route path="/criar-flow" element={<FlowEditor />} />
    <Route path="/flow/:id" element={<FlowViewer />} />
  </>
);

export default FlowRoutes;