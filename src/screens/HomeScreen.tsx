import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../api/supabase';
import { animalsApi } from '../api/animals';

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) {
        const dataAnimals = await animalsApi.getAll(data.user.id);
        setAnimals(dataAnimals);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Bonjour, {user?.email || 'Utilisateur'}</Text>
      <Text style={styles.subtitle}>Voici tes animaux :</Text>

      <FlatList
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.animal}>🐶 {item.name}</Text>}
        ListEmptyComponent={<Text>Aucun animal pour le moment.</Text>}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Se déconnecter" color="#ff3b30" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 15 },
  animal: { fontSize: 16, paddingVertical: 4 },
});
