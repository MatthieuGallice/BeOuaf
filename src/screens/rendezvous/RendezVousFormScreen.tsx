import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { rendezvousApi } from '../../api/rendezvous';

export default function RendezVousFormScreen({ route, navigation }: any) {
  const { animal } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSave = async () => {
    try {
      await rendezvousApi.create({
        animal_id: animal.id,
        title,
        description,
        location,
        date,
      });
      Alert.alert('🩺 Rendez-vous enregistré');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🩺 Nouveau rendez-vous</Text>
      <TextInput style={styles.input} placeholder="Titre" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Lieu" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Date (AAAA-MM-JJ)" value={date} onChangeText={setDate} />
      <Button title="💾 Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 },
});
