import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔍 détecte l'environnement
const isWeb = typeof window !== 'undefined';

// Supabase ne supporte pas AsyncStorage sur web : on met null pour forcer le stockage en mémoire
const storage = isWeb ? undefined : AsyncStorage;

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
