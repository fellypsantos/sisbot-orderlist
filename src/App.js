import React from 'react';
import Main from './components/Main';
import { ToastProvider } from 'react-toast-notifications'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

function App() {
  return (  

    <ToastProvider>
      <GlobalStyle />
      <Main />
    </ToastProvider>
  )
}

export default App
