import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimalsListScreen from './AnimalsListScreen';
import AnimalFormScreen from './AnimalFormScreen';
import AnimalDetailsScreen from './AnimalDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AnimalsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AnimalsList" 
        component={AnimalsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnimalForm"
        component={AnimalFormScreen}
        options={{ 
          title: 'Ajouter un animal',
          headerBackTitle: 'Retour',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="AnimalDetails"
        component={AnimalDetailsScreen}
        options={{ 
          title: 'Détails',
          headerBackTitle: 'Retour'
        }}
      />
    </Stack.Navigator>
  );
}