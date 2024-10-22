// File: /Users/Nicholas.Piesco/MaxOutProgressionApp/contexts/ColorSchemeContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const ColorSchemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(deviceColorScheme || 'light');

  useEffect(() => {
    setColorScheme(deviceColorScheme || 'light');
  }, [deviceColorScheme]);

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    colorScheme,
    toggleColorScheme,
  };

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorSchemeContext must be used within a ColorSchemeProvider');
  }
  return context;
};

export const useAppColorScheme = () => {
  const { colorScheme } = useColorSchemeContext();
  return colorScheme;
};