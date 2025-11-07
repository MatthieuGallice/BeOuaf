import { create } from 'zustand';
import { User, Animal, Alimentation, Medicament, RendezVous, Vaccin } from '../types';
import { authApi } from '../api/auth';
import { animalsApi } from '../api/animals';
import { alimentationsApi } from '../api/alimentations';
import { medicamentsApi } from '../api/medicaments';
import { rendezvousApi } from '../api/rendezvous';
import { vaccinsApi } from '../api/vaccins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface PetStore {
  user: User | null;
  animals: Animal[];
  alimentations: Alimentation[];
  medicaments: Medicament[];
  vaccins: Vaccin[];
  rendezvous: RendezVous[];
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  loadAnimals: () => Promise<void>;
  addAnimal: (animal: Omit<Animal, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  updateAnimal: (id: string, animal: Partial<Animal>) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
  
  loadAlimentations: (animalId: string) => Promise<void>;
  addAlimentation: (alimentation: Omit<Alimentation, 'id' | 'created_at'>) => Promise<void>;
  updateAlimentation: (id: string, alimentation: Partial<Alimentation>) => Promise<void>;
  deleteAlimentation: (id: string) => Promise<void>;
  
  loadMedicaments: (animalId: string) => Promise<void>;
  addMedicament: (medicament: Omit<Medicament, 'id' | 'created_at'>) => Promise<void>;
  updateMedicament: (id: string, medicament: Partial<Medicament>) => Promise<void>;
  deleteMedicament: (id: string) => Promise<void>;
  
  loadRendezVous: (animalId: string) => Promise<void>;
  addRendezVous: (rendezvous: Omit<RendezVous, 'id' | 'created_at'>) => Promise<void>;
  updateRendezVous: (id: string, rendezvous: Partial<RendezVous>) => Promise<void>;
  deleteRendezVous: (id: string) => Promise<void>;

  loadVaccins: (animalId: string) => Promise<void>;
  addVaccin: (vaccin: Omit<Vaccin, 'id' | 'created_at'>) => Promise<void>;
  updateVaccin: (id: string, vaccin: Partial<Vaccin>) => Promise<void>;
  deleteVaccin: (id: string) => Promise<void>;
  
  initializeAuth: () => Promise<void>;
}

export const usePetStore = create<PetStore>((set, get) => ({
  user: null,
  animals: [],
  alimentations: [],
  medicaments: [],
  vaccins: [],
  rendezvous: [],
  isLoading: false,

  setUser: (user) => set({ user }),

  initializeAuth: async () => {
    try {
      const session = await authApi.getSession();
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at || '',
        };
        set({ user });
        await get().loadAnimals();
      }
    } catch (error: any) {
      console.error('Error initializing auth:', error);
    }
  },

  signIn: async (email, password) => {
    try {
      set({ isLoading: true });
      const { user: authUser } = await authApi.signIn(email, password);
      if (authUser) {
        const user: User = {
          id: authUser.id,
          email: authUser.email || '',
          created_at: authUser.created_at || '',
        };
        set({ user });
        await get().loadAnimals();
      }
    } catch (error: any) {
      Alert.alert('Erreur de connexion', error.message || 'Impossible de se connecter');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password) => {
    try {
      set({ isLoading: true });
      await authApi.signUp(email, password);
      Alert.alert('Succès', 'Compte créé avec succès ! Veuillez vérifier votre email.');
    } catch (error: any) {
      Alert.alert('Erreur d\'inscription', error.message || 'Impossible de créer un compte');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      await authApi.signOut();
      set({ user: null, animals: [], alimentations: [], medicaments: [], vaccins: [], rendezvous: [] });
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Impossible de se déconnecter');
    }
  },

  loadAnimals: async () => {
    const { user } = get();
    if (!user) return;
    
    try {
      set({ isLoading: true });
      const animals = await animalsApi.getAll(user.id);
      set({ animals });
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de charger les animaux');
      console.error('Error loading animals:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addAnimal: async (animal) => {
    const { user } = get();
    if (!user) return;
    
    try {
      set({ isLoading: true });
      const newAnimal = await animalsApi.create({ ...animal, user_id: user.id });
      set((state) => ({ animals: [newAnimal, ...state.animals] }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'ajouter l\'animal');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAnimal: async (id, animal) => {
    try {
      set({ isLoading: true });
      const updatedAnimal = await animalsApi.update(id, animal);
      set((state) => ({
        animals: state.animals.map((a) => (a.id === id ? updatedAnimal : a)),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de modifier l\'animal');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAnimal: async (id) => {
    try {
      set({ isLoading: true });
      await animalsApi.delete(id);
      set((state) => ({
        animals: state.animals.filter((a) => a.id !== id),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de supprimer l\'animal');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  loadAlimentations: async (animalId) => {
    try {
      const alimentations = await alimentationsApi.getByAnimalId(animalId);
      set({ alimentations });
    } catch (error: any) {
      console.error('Error loading alimentations:', error);
    }
  },

  addAlimentation: async (alimentation) => {
    try {
      const newAlimentation = await alimentationsApi.create(alimentation);
      set((state) => ({ alimentations: [newAlimentation, ...state.alimentations] }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'ajouter l\'alimentation');
      throw error;
    }
  },

  updateAlimentation: async (id, alimentation) => {
    try {
      const updated = await alimentationsApi.update(id, alimentation);
      set((state) => ({
        alimentations: state.alimentations.map((a) => (a.id === id ? updated : a)),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de modifier l\'alimentation');
      throw error;
    }
  },

  deleteAlimentation: async (id) => {
    try {
      await alimentationsApi.delete(id);
      set((state) => ({
        alimentations: state.alimentations.filter((a) => a.id !== id),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de supprimer l\'alimentation');
      throw error;
    }
  },

  loadMedicaments: async (animalId) => {
    try {
      const medicaments = await medicamentsApi.getByAnimalId(animalId);
      set({ medicaments });
    } catch (error: any) {
      console.error('Error loading medicaments:', error);
    }
  },

  addMedicament: async (medicament) => {
    try {
      const newMedicament = await medicamentsApi.create(medicament);
      set((state) => ({ medicaments: [newMedicament, ...state.medicaments] }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'ajouter le médicament');
      throw error;
    }
  },

  updateMedicament: async (id, medicament) => {
    try {
      const updated = await medicamentsApi.update(id, medicament);
      set((state) => ({
        medicaments: state.medicaments.map((m) => (m.id === id ? updated : m)),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de modifier le médicament');
      throw error;
    }
  },

  deleteMedicament: async (id) => {
    try {
      await medicamentsApi.delete(id);
      set((state) => ({
        medicaments: state.medicaments.filter((m) => m.id !== id),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de supprimer le médicament');
      throw error;
    }
  },

  loadVaccins: async (animalId) => {
    try {
      const vaccins = await vaccinsApi.getByAnimalId(animalId);
      set({ vaccins });
    } catch (error: any) {
      console.error('Error loading vaccins:', error);
    }
  },

  addVaccin: async (vaccin) => {
    try {
      const newVaccin = await vaccinsApi.create(vaccin);
      set((state) => ({ vaccins: [newVaccin, ...state.vaccins] }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'ajouter le vaccin');
      throw error;
    }
  },

  updateVaccin: async (id, vaccin) => {
    try {
      const updated = await vaccinsApi.update(id, vaccin);
      set((state) => ({
        vaccins: state.vaccins.map((v) => (v.id === id ? updated : v)),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de modifier le vaccin');
      throw error;
    }
  },

  deleteVaccin: async (id) => {
    try {
      await vaccinsApi.delete(id);
      set((state) => ({
        vaccins: state.vaccins.filter((v) => v.id !== id),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de supprimer le vaccin');
      throw error;
    }
  },

  loadRendezVous: async (animalId) => {
    try {
      const rendezvous = await rendezvousApi.getByAnimalId(animalId);
      set({ rendezvous });
    } catch (error: any) {
      console.error('Error loading rendezvous:', error);
    }
  },

  addRendezVous: async (rendezvous) => {
    try {
      const newRendezVous = await rendezvousApi.create(rendezvous);
      set((state) => ({ rendezvous: [...state.rendezvous, newRendezVous] }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'ajouter le rendez-vous');
      throw error;
    }
  },

  updateRendezVous: async (id, rendezvous) => {
    try {
      const updated = await rendezvousApi.update(id, rendezvous);
      set((state) => ({
        rendezvous: state.rendezvous.map((r) => (r.id === id ? updated : r)),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de modifier le rendez-vous');
      throw error;
    }
  },

  deleteRendezVous: async (id) => {
    try {
      await rendezvousApi.delete(id);
      set((state) => ({
        rendezvous: state.rendezvous.filter((r) => r.id !== id),
      }));
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de supprimer le rendez-vous');
      throw error;
    }
  },
}));
