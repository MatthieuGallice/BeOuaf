import { supabase } from './supabase';
import { Medicament } from '../types';

export const medicamentsApi = {
  getByAnimalId: async (animalId: string) => {
    const { data, error } = await supabase
      .from('medicaments')
      .select('*')
      .eq('animal_id', animalId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Medicament[];
  },

  create: async (medicament: Omit<Medicament, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('medicaments')
      .insert([medicament])
      .select()
      .single();
    
    if (error) throw error;
    return data as Medicament;
  },

  update: async (id: string, medicament: Partial<Medicament>) => {
    const { data, error } = await supabase
      .from('medicaments')
      .update(medicament)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Medicament;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('medicaments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
