import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MedicamentsListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 Médicaments</Text>
      <Text>Liste des médicaments à venir...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
