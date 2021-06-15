import React from 'react';
import Main from './components/Main';
import { ToastProvider } from 'react-toast-notifications'

function App() {
  return (  

    <ToastProvider>
      <Main />
    </ToastProvider>
  )
}

export default App
