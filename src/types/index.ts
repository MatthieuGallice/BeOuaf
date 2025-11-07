export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Animal {
  id: string;
  user_id: string;
  nom: string;
  espece: string;
  race: string;
  date_naissance: string;
  poids: number;
  photo_url?: string;
  created_at: string;
}

export interface Alimentation {
  id: string;
  animal_id: string;
  description: string;
  frequence: string;
  created_at: string;
}

export interface Medicament {
  id: string;
  animal_id: string;
  nom: string;
  dose: string;
  frequence: string;
  date_debut: string;
  date_fin: string;
  rappel: boolean;
  created_at: string;
}

export interface RendezVous {
  id: string;
  animal_id: string;
  date: string;
  motif: string;
  notes: string;
  created_at: string;
}

export interface Vaccin {
  id: string;
  animal_id: string;
  nom: string;
  date: string;
  rappel: boolean;
  prochaine_date?: string;
  notes?: string;
  created_at: string;
}
