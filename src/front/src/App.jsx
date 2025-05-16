import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Cadastro from './pages/Cadastro';
import CreateFlow from './pages/CreateFlow/index';
// import VerFlow from './pages/VerFlow';
// import Comunidade from './pages/Comunidade';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} /> */}
      <Route path="/criar-flow" element={<CreateFlow />} />
      {/* <Route path="/flow/:id" element={<VerFlow />} />
      <Route path="/comunidade" element={<Comunidade />} /> */}
    </Routes>
  );
}

export default App;
