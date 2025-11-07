import { supabase } from './supabase';
import { Vaccin } from '../types';

export const vaccinsApi = {
  getByAnimalId: async (animalId: string) => {
    const { data, error } = await supabase
      .from('vaccins')
      .select('*')
      .eq('animal_id', animalId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Vaccin[];
  },

  create: async (vaccin: Omit<Vaccin, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('vaccins')
      .insert([vaccin])
      .select()
      .single();

    if (error) throw error;
    return data as Vaccin;
  },

  update: async (id: string, vaccin: Partial<Vaccin>) => {
    const { data, error } = await supabase
      .from('vaccins')
      .update(vaccin)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Vaccin;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('vaccins')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
