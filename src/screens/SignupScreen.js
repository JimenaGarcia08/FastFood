import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Alert, TextInput, StyleSheet } from "react-native";
import { 
  Box, Heading, VStack, FormControl, Button, Center, NativeBaseProvider, 
  HStack, Text, Link, Image, KeyboardAvoidingView as NBKeyboardAvoidingView 
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !address) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        email: email,
        direccion: address,
        fechaRegistro: new Date().toISOString()
      });

      Alert.alert("Éxito", "Cuenta creada correctamente");
      navigation.navigate("Login");
    } catch (error) {
      let errorMessage = "Error al registrar";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "El correo ya está en uso";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Correo electrónico inválido";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <NBKeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <Center flex={1} px="3">
          <Image 
            source={require("../../assets/splash.png")}  
            alt="Logo"
            size="150px"
            resizeMode="contain"
            mb={6} 
          />

          <Box w="100%" maxW="300">
            <Heading size="lg" fontWeight="600">
              Crear Cuenta
            </Heading>
            
            {error && (
              <Text color="red.500" textAlign="center" mt={2}>
                {error}
              </Text>
            )}

            <VStack space={4} mt={5}>
              <FormControl>
                <FormControl.Label _text={{ bold: true }}>Correo</FormControl.Label>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="ejemplo@correo.com"
                />
              </FormControl>

              <FormControl>
                <FormControl.Label _text={{ bold: true }}>Contraseña</FormControl.Label>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry
                  placeholder="Mínimo 6 caracteres"
                />
              </FormControl>

              <FormControl>
                <FormControl.Label _text={{ bold: true }}>Domicilio</FormControl.Label>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                  placeholder="Calle, número, colonia"
                />
              </FormControl>

              <Button
                mt={5}
                bg="#E29A2E"
                _pressed={{ opacity: 0.8 }}
                onPress={handleSignup}
                isLoading={loading}
                _text={{ fontWeight: "bold", fontSize: "md" }}
              >
                Registrarse
              </Button>

              <HStack mt={5} justifyContent="center">
                <Text>¿Ya tienes cuenta? </Text>
                <Link 
                  _text={{ color: "#F2B33D", fontWeight: "bold" }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Inicia sesión
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </NBKeyboardAvoidingView>
    </NativeBaseProvider>
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
    fontSize: 16
  }
});

export default Signup;
