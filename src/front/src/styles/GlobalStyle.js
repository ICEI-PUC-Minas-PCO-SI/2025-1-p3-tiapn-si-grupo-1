import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #f5f5f5;
    color: #333;
  }

  .app-container {
    display: flex;
    height: 100dvh;
    width: 100%;
  }

  .content-area {
    flex: 1;
    overflow: auto;
  }

  button {
    cursor: pointer;
    
  }

  input, textarea {
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;