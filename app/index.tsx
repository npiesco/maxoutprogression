// File: /Users/Nicholas.Piesco/MaxOutProgressionApp/app/index.tsx

import * as React from 'react';
import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ColorSchemeToggle } from '@/contexts/ColorSchemeToggle';
import { useAppColorScheme } from '@/contexts/ColorSchemeContext';

type SetDetails = {
  set: number | string;
  weight: string;
  reps: number;
  rest: string;
};

function maxOutProgression(oneRm: number): SetDetails[] {
  const sets: SetDetails[] = [
    { set: 1, weight: (0.50 * oneRm).toFixed(2), reps: 8, rest: "2 min" },
    { set: 2, weight: (0.65 * oneRm).toFixed(2), reps: 4, rest: "2 min" },
    { set: 3, weight: (0.75 * oneRm).toFixed(2), reps: 3, rest: "3 min" },
    { set: 4, weight: (0.85 * oneRm).toFixed(2), reps: 2, rest: "5 min" },
    { set: 5, weight: (0.95 * oneRm).toFixed(2), reps: 1, rest: "5+ min" },
    { set: '6+', weight: oneRm.toFixed(2), reps: 1, rest: "5+ min" }
  ];
  return sets;
}

export default function Index() {
  const [oneRm, setOneRm] = useState<string>('');
  const [progression, setProgression] = useState<SetDetails[]>([]);
  const colorScheme = useAppColorScheme();
  const inputRef = useRef<TextInput>(null);

  const handleInputChange = (text: string) => {
    // Remove non-numeric characters except for first decimal
    let numericInput = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    
    // Ensure only one decimal place after decimal
    const parts = numericInput.split('.');
    if (parts[1]?.length > 1) {
      numericInput = `${parts[0]}.${parts[1].slice(0, 1)}`;
    }
    
    // Limit to 9999.9
    if (parseFloat(numericInput) > 9999.9) {
      numericInput = '9999.9';
    }
    
    setOneRm(numericInput);
    
    // Clear progression if input is empty
    if (numericInput === '') {
      setProgression([]);
    }
  }

  const handleCalculate = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
    
    let numericValue = parseFloat(oneRm);
    if (!isNaN(numericValue)) {
      // Round to nearest 0.5 when calculating
      numericValue = Math.round(numericValue * 2) / 2;
      numericValue = Math.min(numericValue, 9999);
      
      // Update input with rounded value
      const formattedValue = numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1);
      setOneRm(formattedValue);
      
      setProgression(maxOutProgression(numericValue));
    }
  }

  const isDarkMode = colorScheme === 'dark';

  const ContentWrapper = Platform.OS === 'web' ? React.Fragment : Pressable;
  const contentWrapperProps = Platform.OS === 'web' ? {} : {
    onPress: Keyboard.dismiss,
    style: {flex: 1},
  };

  return (
    <ContentWrapper {...contentWrapperProps}>
      <ScrollView 
        style={[styles.container, isDarkMode && styles.darkContainer]} 
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps={Platform.OS === 'web' ? 'never' : 'handled'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name="dumbbell" size={24} color={isDarkMode ? 'white' : 'black'} />
              <Text style={[styles.title, isDarkMode && styles.darkText]}>Max Out Progression</Text>
            </View>
            <ColorSchemeToggle />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[styles.input, isDarkMode && styles.darkInput]}
              onChangeText={handleInputChange}
              value={oneRm}
              placeholder="Enter 1 Rep Max"
              placeholderTextColor={isDarkMode ? '#9BA1A6' : '#687076'}
              inputMode="decimal"
              enterKeyHint="done"
              onSubmitEditing={handleCalculate}
              maxLength={6}
            />
            <Pressable 
              style={[styles.button, isDarkMode && styles.darkButton]} 
              onPress={handleCalculate}
            >
              <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>Calculate</Text>
            </Pressable>
          </View>
          {progression.length > 0 && (
            <View style={styles.tableContainer}>
              <View style={[styles.tableHeader, isDarkMode && styles.darkTableHeader]}>
                <Text style={[styles.headerCell, styles.setCell]}>Set</Text>
                <Text style={[styles.headerCell, styles.weightCell]}>Weight (lbs)</Text>
                <Text style={[styles.headerCell, styles.repsCell]}>Reps</Text>
                <Text style={[styles.headerCell, styles.restCell]}>Rest</Text>
              </View>
              {progression.map((set) => (
                <View key={set.set} style={[styles.tableRow, isDarkMode && styles.darkTableRow]}>
                  <Text style={[styles.cell, styles.setCell, isDarkMode && styles.darkText]}>{set.set}</Text>
                  <View style={[styles.cell, styles.weightCell]}>
                    <MaterialCommunityIcons name="weight" size={16} color={isDarkMode ? 'white' : 'black'} />
                    <Text style={[styles.cellText, isDarkMode && styles.darkText]}>
                      {set.set === '6+' ? `${set.weight} (100%)` : set.weight}
                    </Text>
                  </View>
                  <View style={[styles.cell, styles.repsCell]}>
                    <MaterialCommunityIcons name="repeat" size={16} color={isDarkMode ? 'white' : 'black'} />
                    <Text style={[styles.cellText, isDarkMode && styles.darkText]}>{set.reps}</Text>
                  </View>
                  <View style={[styles.cell, styles.restCell]}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color={isDarkMode ? 'white' : 'black'} />
                    <Text style={[styles.cellText, isDarkMode && styles.darkText]}>{set.rest}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  scrollViewContent: {
    paddingTop: 40,
  },
  content: {
    padding: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
  },
  darkText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: 'black',
    marginRight: 10,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: 'white',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkButtonText: {
    color: '#ffffff',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
  },
  darkTableHeader: {
    backgroundColor: '#1F2937',
  },
  headerCell: {
    color: '#4B5563',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  darkTableRow: {
    borderBottomColor: '#374151',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  cellText: {
    color: 'black',
    marginLeft: 4,
  },
  setCell: {
    flex: 1,
  },
  weightCell: {
    flex: 2,
  },
  repsCell: {
    flex: 1,
  },
  restCell: {
    flex: 1,
  },
});
