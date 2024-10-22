// File: /Users/Nicholas.Piesco/MaxOutProgressionApp/contexts/ColorSchemeToggle.tsx

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColorSchemeContext } from '@/contexts/ColorSchemeContext';
import { Ionicons } from '@expo/vector-icons';

export const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();

  return (
    <Pressable style={styles.button} onPress={toggleColorScheme}>
      <Ionicons 
        name={colorScheme === 'dark' ? 'sunny-outline' : 'moon-outline'} 
        size={20} 
        color={colorScheme === 'dark' ? '#FDB813' : '#1E1E1E'} 
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
  },
});