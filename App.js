import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import CartScreen from './src/screens/CartScreen';
import RateUsScreen from './src/screens/RateUsScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import HelpScreen from './src/screens/HelpScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E29A2E',
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: '#FFF5E1',
        drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        headerStyle: { backgroundColor: '#E29A2E' },
        headerTintColor: 'white',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Contáctanos" component={ContactUsScreen} />
      <Drawer.Screen name="Califícanos" component={RateUsScreen} />
      <Drawer.Screen name="Ajustes" component={SettingsScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <RootStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
