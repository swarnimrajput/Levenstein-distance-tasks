import React from 'react';
import SpellChecker from './components/SpellChecker';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <SpellChecker />
    </>
  );
}

export default App;
