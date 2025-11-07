import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlimentationsListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍖 Alimentation</Text>
      <Text>Suivi de l’alimentation et des exceptions à venir...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
