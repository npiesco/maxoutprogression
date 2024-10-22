import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Oops!</ThemedText>
      <ThemedText type="subtitle" style={styles.message}>This screen doesn't exist.</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Return to Max Out Progression</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginTop: 10,
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});