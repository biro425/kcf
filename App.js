import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import HistoryScreen from './screens/HistoryScreen';
import PersonalScreen from './screens/PersonalScreen';
import CommunityScreen from './screens/CommunityScreen';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Personal" component={PersonalScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

if (Platform.OS === 'web') {
  const rootElement = document.getElementById('root');
  const { createRoot } = require('react-dom/client');
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  registerRootComponent(App);
}
