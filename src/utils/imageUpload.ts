import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../api/supabase';
import { Platform } from 'react-native';

export const pickImage = async () => {
  // Demande la permission
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission d\'accès à la galerie refusée');
  }

  // Sélectionne l'image
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
};

export const uploadImage = async (uri: string, path: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase
      .storage
      .from('animals')
      .upload(path, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase
      .storage
      .from('animals')
      .getPublicUrl(path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};