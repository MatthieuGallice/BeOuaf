import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../../api/supabase';
import { animalsApi } from '../../api/animals';

export default function AnimalDetailsScreen({ route, navigation }: any) {
  const { animal } = route.params;

  const handleDelete = async () => {
    await animalsApi.delete(animal.id);
    alert('🐾 Animal supprimé');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{animal.name}</Text>
      <Text>Espèce : {animal.species || '-'}</Text>
      <Text>Race : {animal.breed || '-'}</Text>
      <Text>Genre : {animal.gender}</Text>

      <View style={styles.buttons}>
        <Button title="💊 Médicaments" onPress={() => navigation.navigate('Médicaments')} />
        <Button title="🩺 Rendez-vous" onPress={() => navigation.navigate('Rendez-vous')} />
        <Button title="🍖 Alimentation" onPress={() => navigation.navigate('Alimentation')} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="🗑️ Supprimer" color="#ff3b30" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  buttons: { marginTop: 20, gap: 10 },
});
