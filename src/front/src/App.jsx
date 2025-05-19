import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import Sidebar from './components/Sidebar';
import MainRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="content-area">
            <MainRoutes />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;