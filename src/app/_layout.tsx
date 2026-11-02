import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function Layout() {
  return (
    <FavoritesProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fcfeff', // Azul escuro aparente quando clicado
          tabBarInactiveTintColor: '#c4beab', // Creme para os inativos
          tabBarStyle: {
            backgroundColor: '#2f484f', // Nova cor de fundo solicitada
            borderTopWidth: 0,
            elevation: 10,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 12,
          }
        }}
      >
        {/* 1. INÍCIO */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        {/* 2. CATÁLOGO */}
        <Tabs.Screen
          name="catalog"
          options={{
            title: 'Catálogo',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />

        {/* 3. EXPLORAR */}
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explorar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass-outline" size={size} color={color} />
            ),
          }}
        />

        {/* 4. COMUNIDADE */}
        <Tabs.Screen
          name="community"
          options={{
            title: 'Comunidade',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" size={size} color={color} />
            ),
          }}
        />

        {/* 5. PERFIL */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </FavoritesProvider>
  );
}