import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { usePetStore } from '../../store/usePetStore';
import { Animal } from '../../types';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700'
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  deleteButton: {
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  addButton: {
    padding: 5
  },
  list: {
    padding: 15
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  cardContent: {
    gap: 5
  },
  detail: {
    fontSize: 14,
    color: '#666'
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999'
  }
});

export default function AnimalsListScreen({ navigation }: any) {
  const { animals, loadAnimals, isLoading, deleteAnimal } = usePetStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    loadAnimals();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAnimals(animals);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = animals.filter(animal => 
      animal.nom.toLowerCase().includes(query) ||
      animal.espece.toLowerCase().includes(query) ||
      animal.race?.toLowerCase().includes(query)
    );
    setFilteredAnimals(filtered);
  }, [searchQuery, animals]);

  const handleDeleteAnimal = (animal: Animal) => {
    Alert.alert(
      'Supprimer l\'animal',
      `Êtes-vous sûr de vouloir supprimer ${animal.nom} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              await deleteAnimal(animal.id);
            } catch (error) {
              // Error is already handled in the store
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const renderAnimalItem = ({ item }: { item: Animal }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('AnimalDetails', { animal: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.nom}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('AnimalForm', { animal: item })}
            style={styles.actionButton}
          >
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDeleteAnimal(item)}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <MaterialIcons name="delete" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.detail}>🐾 {item.espece}</Text>
        {item.race && <Text style={styles.detail}>🦮 {item.race}</Text>}
        {item.poids && <Text style={styles.detail}>⚖️ {item.poids} kg</Text>}
        {item.photo_url && (
          <Image 
            source={{ uri: item.photo_url }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Mes Animaux</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AnimalForm')}
        >
          <MaterialIcons name="add-circle" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un animal..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <MaterialIcons name="cancel" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredAnimals}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimalItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'Aucun animal ne correspond à votre recherche'
                : 'Aucun animal pour le moment.'}
            </Text>
            {!searchQuery && (
              <Text style={styles.emptySubtext}>Ajoutez votre premier animal ! 🐶</Text>
            )}
          </View>
        }
      />
    </View>
  );
}