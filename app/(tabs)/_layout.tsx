// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' }, // keep blur look on iOS
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"                // your existing Home list screen
        options={{
          title: 'Clubs/Bars',
          tabBarLabel: 'Clubs/Bars',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tonight"             // new file: app/(tabs)/tonight.tsx
        options={{
          title: 'Tonight',
          tabBarLabel: 'Tonight',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="flame.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
