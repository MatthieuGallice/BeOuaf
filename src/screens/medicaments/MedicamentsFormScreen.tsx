import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { medicamentsApi } from '../../api/medicaments';

export default function MedicamentFormScreen({ route, navigation }: any) {
  const { animal } = route.params;
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = async () => {
    try {
      await medicamentsApi.create({
        animal_id: animal.id,
        name,
        dosage,
        frequency,
        start_date: date,
      });
      Alert.alert('💊 Médicament ajouté');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 Nouveau médicament</Text>
      <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Dosage" value={dosage} onChangeText={setDosage} />
      <TextInput style={styles.input} placeholder="Fréquence" value={frequency} onChangeText={setFrequency} />
      <Button title="💾 Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 },
});
