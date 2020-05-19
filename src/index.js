import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from './utils/theme';
import App from './App';
import { AuthProvider } from './contexts/auth';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
