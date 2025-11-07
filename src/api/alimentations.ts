import { supabase } from './supabase';
import { Alimentation } from '../types';

export const alimentationsApi = {
  getByAnimalId: async (animalId: string) => {
    const { data, error } = await supabase
      .from('alimentations')
      .select('*')
      .eq('animal_id', animalId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Alimentation[];
  },

  create: async (alimentation: Omit<Alimentation, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('alimentations')
      .insert([alimentation])
      .select()
      .single();
    
    if (error) throw error;
    return data as Alimentation;
  },

  update: async (id: string, alimentation: Partial<Alimentation>) => {
    const { data, error } = await supabase
      .from('alimentations')
      .update(alimentation)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Alimentation;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('alimentations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
