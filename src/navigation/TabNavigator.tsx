import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimalsNavigator from '../screens/animals/AnimalsNavigator';
import MedicamentsListScreen from '../screens/medicaments/MedicamentsListScreen';
import RendezVousListScreen from '../screens/rendezvous/RendezVousListScreen';
import AlimentationsListScreen from '../screens/alimentations/AlimentationsListScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'paw-outline';
          if (route.name === 'Animaux') iconName = 'paw-outline';
          else if (route.name === 'Médicaments') iconName = 'medkit-outline';
          else if (route.name === 'Rendez-vous') iconName = 'calendar-outline';
          else if (route.name === 'Alimentation') iconName = 'fast-food-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Animaux" component={AnimalsNavigator} />
      <Tab.Screen name="Médicaments" component={MedicamentsListScreen} />
      <Tab.Screen name="Rendez-vous" component={RendezVousListScreen} />
      <Tab.Screen name="Alimentation" component={AlimentationsListScreen} />
    </Tab.Navigator>
  );
}
