import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { supabase } from '../api/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    try {
      setLoading(true);

      if (isResetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        Alert.alert('📧 Vérifie ta boîte mail', "Un lien de réinitialisation t'a été envoyé.");
        return;
      }

      if (!email || !password) {
        Alert.alert('Erreur', 'Merci de remplir tous les champs.');
        return;
      }

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        Alert.alert('🎉 Compte créé', 'Un email de confirmation t’a été envoyé.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
          return;
        }
        if (data.session) Alert.alert('✅ Connexion réussie');
      }
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>🐶 BeOuaf</Text>
      <Text style={styles.subtitle}>
        {isResetMode ? 'Réinitialise ton mot de passe' : isSignUp ? 'Crée ton compte' : 'Connecte-toi pour continuer'}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {!isResetMode && (
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
          <Text style={styles.buttonText}>
            {isResetMode ? 'Envoyer le lien' : loading ? 'Chargement...' : isSignUp ? "S'inscrire" : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        {!isResetMode && (
          <TouchableOpacity onPress={() => setIsResetMode(true)}>
            <Text style={styles.link}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        )}

        {isResetMode ? (
          <TouchableOpacity onPress={() => setIsResetMode(false)}>
            <Text style={styles.link}>⬅️ Retour</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.link}>
              {isSignUp ? 'Déjà un compte ? Se connecter' : "Pas encore inscrit ? Créer un compte"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#F8F9FA' },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#1E1E1E' },
  subtitle: { fontSize: 16, textAlign: 'center', marginTop: 10, color: '#555' },
  form: { marginTop: 40 },
  input: { backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginVertical: 8, borderWidth: 1, borderColor: '#DDD' },
  button: { backgroundColor: '#007AFF', borderRadius: 10, padding: 15, marginTop: 15 },
  buttonText: { color: '#FFF', fontSize: 16, textAlign: 'center', fontWeight: '600' },
  link: { textAlign: 'center', color: '#007AFF', marginTop: 15, fontSize: 14 },
});
