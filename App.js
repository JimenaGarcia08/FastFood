import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';

// Importa auth correctamente desde tu configuración
import { auth } from './src/services/firebaseConfig';

// Pantallas
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import CartScreen from './src/screens/CartScreen';
import PayScreen from './src/screens/PayScreen';
import RateUsScreen from './src/screens/RateUsScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import HelpScreen from './src/screens/HelpScreen';
import FruitsVeggiesScreen from './src/screens/Categorias/FruitsVeggiesScreen';
import MeatsFishScreen from './src/screens/Categorias/MeatsFishScreen';
import DairyEggsScreen from './src/screens/Categorias/DairyEggsScreen';
import BakeryPastriesScreen from './src/screens/Categorias/BakeryPastriesScreen';
import GroceriesScreen from './src/screens/Categorias/GroceriesScreen';
import CleaningProductsScreen from './src/screens/Categorias/CleaningProductsScreen';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  colors: {
    primary: {
      500: '#E29A2E',
    },
  },
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#E29A2E' },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: '#FFF5E1',
        drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        headerStyle: { backgroundColor: '#E29A2E' },
        headerTintColor: 'white',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Carrito' })}>
            <Ionicons name="cart-outline" size={24} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Frutas y verduras" component={FruitsVeggiesScreen} />
      <Drawer.Screen name="Carnes y pescados" component={MeatsFishScreen} />
      <Drawer.Screen name="Huevo y lácteos" component={DairyEggsScreen} />
      <Drawer.Screen name="Panadería y repostería" component={BakeryPastriesScreen} />
      <Drawer.Screen name="Abarrotes" component={GroceriesScreen} />
      <Drawer.Screen name="Limpieza y hogar" component={CleaningProductsScreen} />
      <Drawer.Screen name="Contáctanos" component={ContactUsScreen} />
      <Drawer.Screen name="Califícanos" component={RateUsScreen} />
      <Drawer.Screen name="Ajustes" component={SettingsScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
      <Drawer.Screen
        name="Carrito"
        component={CartScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
              <Ionicons name="home-outline" size={24} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Pago"
        component={PayScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
              <Ionicons name="home-outline" size={24} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function RootStack({ isSignedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [authReady, setAuthReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  if (!authReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E29A2E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <RootStack isSignedIn={isSignedIn} />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
