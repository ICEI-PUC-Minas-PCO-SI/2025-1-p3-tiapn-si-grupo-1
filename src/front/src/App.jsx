import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import Sidebar from './components/Sidebar';
import MainRoutes from './routes';

function LayoutWrapper() {
  const location = useLocation();
  const hideSidebarOn = ['/', '/login', '/cadastro', '/recuperar-senha'];

  const hideSidebar = hideSidebarOn.includes(location.pathname);

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}
      <main className="content-area">
        <MainRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <LayoutWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;
