import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import CartScreen from './src/screens/CartScreen';
import PayScreen from './src/screens/PayScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer con navegación desde el ícono del carrito
function DrawerNavigator() {
  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Carrito' })}>
            <Ionicons
              name="cart-outline"
              size={24}
              color="white"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Details" component={DetailsScreen} />
      <Drawer.Screen name="Ajustes" component={SettingsScreen} />
      <Drawer.Screen
        name="Carrito"
        component={CartScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
              <Ionicons
                name="home-outline"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
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
              <Ionicons
                name="home-outline"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),          
        }}
      />
    </Drawer.Navigator>
  );
  
}

// Stack principal
function RootStack() {
  let isSignedIn = true; // Activado para saltarse la pantalla de login
  // const [isSignedIn, setIsSignedIn] = React.useState(false); // Activar login si se necesita

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}