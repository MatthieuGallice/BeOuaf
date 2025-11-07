import { supabase } from './supabase';
import { RendezVous } from '../types';

export const rendezvousApi = {
  getByAnimalId: async (animalId: string) => {
    const { data, error } = await supabase
      .from('rendezvous')
      .select('*')
      .eq('animal_id', animalId)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data as RendezVous[];
  },

  create: async (rendezvous: Omit<RendezVous, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('rendezvous')
      .insert([rendezvous])
      .select()
      .single();
    
    if (error) throw error;
    return data as RendezVous;
  },

  update: async (id: string, rendezvous: Partial<RendezVous>) => {
    const { data, error } = await supabase
      .from('rendezvous')
      .update(rendezvous)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as RendezVous;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('rendezvous')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
