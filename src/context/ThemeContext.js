import React, { createContext, useState } from 'react';

// Vordefinierten Themes
const themes = {
  default: {
    name: 'default',
    colors: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      text: '#333333',
      accent: '#2196f3',
    },
    logo: 'default-logo.png',
  },
  allianz: {
    name: 'allianz',
    colors: {
      primary: '#041E42',
      secondary: '#0a2a5e',
      text: '#ffffff',
      accent: '#009ee0',
    },
    logo: 'allianz-logo.png',
  },
  adac: {
    name: 'adac',
    colors: {
      primary: '#ffcc00',
      secondary: '#fff7cc',
      text: '#333333',
      accent: '#003366',
    },
    logo: 'adac-logo.png',
  },
  volkswagen: {
    name: 'volkswagen',
    colors: {
      primary: '#041E42',
      secondary: '#e6eef7',
      text: '#333333',
      accent: '#1d72b8',
    },
    logo: 'vw-logo.png',
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);

  const changeTheme = (themeName) => {
    setCurrentTheme(themes[themeName] || themes.default);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};