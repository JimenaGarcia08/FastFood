import { Box, Heading, VStack, FormControl, Button, Center, NativeBaseProvider, Image, Text, HStack, Link } from "native-base";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { TextInput, StyleSheet } from 'react-native';

const Login = ({ setIsSignedIn }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true);
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      
      switch(error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Cuenta deshabilitada';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Correo o contraseña incorrectos';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" flex={1}>
      <Image 
        source={require("../../assets/splash.png")}  
        alt="Logo"
        width={150} 
        height={150}
        resizeMode="contain"
        mb={6} 
      />
      
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Inicia sesión para continuar
        </Heading>

        {error && (
          <Text color="red.500" fontSize="sm" mt="2" textAlign="center">
            {error}
          </Text>
        )}

        <VStack space={3} mt="5">
          <FormControl isInvalid={!email && error}>
            <FormControl.Label>Correo</FormControl.Label>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Correo"
            />
          </FormControl>

          <FormControl isInvalid={!password && error}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
              placeholder="••••••"
            />
          </FormControl>

          <Button 
            bg="#E29A2E"
            mt="2" 
            onPress={handleLogin}
            isDisabled={!email || !password || loading}
            isLoading={loading}
            _text={{ fontWeight: 'bold' }}
          >
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              ¿No tienes una cuenta?{' '}
            </Text>
            <Link 
              _text={{
                color: "#F2B33D",
                fontWeight: "medium",
                fontSize: "sm"
              }} 
              onPress={() => navigation.navigate("SignupScreen")}
            >
              Regístrate
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F1F1F1",
    borderColor: "#E29A2E",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  }
});

export default function LoginScreen({ setIsSignedIn }) {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Login setIsSignedIn={setIsSignedIn} />
      </Center>
    </NativeBaseProvider>
  );
}
