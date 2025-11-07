import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimalsListScreen from '../screens/animals/AnimalsListScreen';
import AnimalFormScreen from '../screens/animals/AnimalFormScreen';

const Stack = createNativeStackNavigator();

export default function AnimalsStack() {
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
    </Stack.Navigator>
  );
}