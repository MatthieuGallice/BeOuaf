import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { usePetStore } from '../store/usePetStore';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

export const ProfileScreen = () => {
  const { user, signOut } = usePetStore();

  const handleSignOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', onPress: signOut },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={globalStyles.subtitle}>À propos</Text>
          <View style={globalStyles.card}>
            <Text style={globalStyles.text}>BeOuaf</Text>
            <Text style={globalStyles.textSecondary}>Version 1.0.0</Text>
            <Text style={globalStyles.textSecondary}>
              Carnet de vie numérique pour vos animaux de compagnie
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  email: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  signOutButton: {
    marginTop: 32,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  signOutText: {
    color: colors.error,
    fontWeight: '600',
  },
});
