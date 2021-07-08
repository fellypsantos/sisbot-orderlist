import React from 'react';
import {ToastProvider} from 'react-toast-notifications';
import {createGlobalStyle} from 'styled-components';
import Main from './components/Main';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
  }
`;

function App() {
  return (
    <ToastProvider>
      <GlobalStyle />
      <Main />
    </ToastProvider>
  );
}

export default App;
