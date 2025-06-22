import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import Sidebar from "./components/Sidebar";
import MainRoutes from "./routes";
import Overlay from "./components/Overlay";
import { useUIStore } from "./store/uiStore";
import SearchPage from "./components/SearchPage";
import { Toaster } from "sonner";
import "./services/axiosConfig";

function LayoutWrapper() {
  const location = useLocation();
  const hideSidebarOn = ["/", "/login", "/cadastro", "/recuperar-senha"];
  const hideSidebar = hideSidebarOn.includes(location.pathname);

  //Pega o estado de overlay
  const isOverlayActive = useUIStore((state) => state.isOverlayActive);
  const isSearchModalOpen = useUIStore((state) => state.isSearchModalOpen);

  return (
    <div
      className="app-container"
      style={{ paddingLeft: hideSidebar ? "0" : "60px" }}
    >
      <Toaster richColors position="top-right" />
      {!hideSidebar && <Sidebar />}
      <main className="content-area">
        {isOverlayActive && <Overlay />} {/* Mostra overlay se ativo */}
        {isSearchModalOpen && <SearchPage />}
        {/*Modal de busca */}
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
