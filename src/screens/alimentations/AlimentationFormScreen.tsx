import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { alimentationsApi } from '../../api/alimentations';

export default function AlimentationFormScreen({ route, navigation }: any) {
  const { animal } = route.params;
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    try {
      await alimentationsApi.create({
        animal_id: animal.id,
        type,
        quantity: parseFloat(quantity),
        unit,
        notes,
      });
      Alert.alert('🍖 Alimentation enregistrée');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍖 Nouveau repas</Text>
      <TextInput style={styles.input} placeholder="Type de nourriture" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Quantité" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Unité (g, ml...)" value={unit} onChangeText={setUnit} />
      <TextInput style={styles.input} placeholder="Exception / remarque" value={notes} onChangeText={setNotes} />
      <Button title="💾 Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 },
});
