import { supabase } from './supabase';
import { Animal } from '../types';

export const animalsApi = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Animal[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Animal;
  },

  create: async (animal: Omit<Animal, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('animals')
      .insert([animal])
      .select()
      .single();
    
    if (error) throw error;
    return data as Animal;
  },

  update: async (id: string, animal: Partial<Animal>) => {
    const { data, error } = await supabase
      .from('animals')
      .update(animal)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Animal;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
