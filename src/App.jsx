/*
import React from 'react';

const App = ({ vertrkey }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Ich bin ein D7X Microfrontend</h2>
      <p>Vertrkey: {vertrkey}</p>
    </div>
  );
};

export default App;
*/



import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ContractPage from './pages/ContractPage';
import './App.css';

function App({ vertrkey } ) {
  console.log("D7X App wird gestartet");
  return (
    <ThemeProvider>
      <ContractPage vertrkey={vertrkey+"Testy"}/>
    </ThemeProvider>
  );
}

export default App;
