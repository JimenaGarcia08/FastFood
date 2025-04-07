import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Image } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { HStack, Text, Link } from "native-base";
import React, { useState } from 'react';

const Login = ({ setIsSignedIn }) => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
    } else {
      setIsSignedIn(true);
    }
  };

  return (
    <Center w="100%" flex={1}>
      {/* Logo */}
      <Image 
        source={require("../../assets/splash.png")}  
        alt="Logo"
        width={150} 
        height={150}
        resizeMode="contain"
        mb={6} 
      />
      
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Bienvenido
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Inicia sesión para continuar
        </Heading>

        {/* Error message */}
        {error && <Text color="red.500" fontSize="sm" mt="2">{error}</Text>}

        <VStack space={3} mt="5">
          <FormControl isInvalid={!email}>
            <FormControl.Label>Correo</FormControl.Label>
            <Input
              value={email}
              onChangeText={setEmail}
              size="lg" 
              fontSize="md" 
              py="3" 
            />
          </FormControl>

          <FormControl isInvalid={!password}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input 
              type="password" 
              value={password} 
              onChangeText={setPassword}
              size="lg" 
              fontSize="md" 
              py="3"
            />
          </FormControl>

          <Button 
            bg="#E29A2E"
            mt="2" 
            onPress={handleLogin}
            isDisabled={!email || !password} 
          >
            Iniciar sesión
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              ¿No tienes una cuenta?{" "}
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

export default function LoginScreen({ setIsSignedIn }) {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Login setIsSignedIn={setIsSignedIn} />
      </Center>
    </NativeBaseProvider>
  );
}
