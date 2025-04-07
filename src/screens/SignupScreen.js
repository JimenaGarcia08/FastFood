import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TextInput } from "react-native";
import { 
  Box, Heading, VStack, FormControl, Button, Center, NativeBaseProvider, 
  HStack, Text, Link, Image 
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const isFormValid = email !== "" && password !== "" && address !== "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Center w="100%" flex={1} px="3">
            <Image 
              source={require("../../assets/splash.png")}  
              alt="Logo"
              width={150} 
              height={150}
              resizeMode="contain"
              mb={6} 
            />

            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600">
                Crear Cuenta
              </Heading>
              <Heading mt="1" fontWeight="medium" size="xs">
                Regístrate para continuar
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Correo</FormControl.Label>
                  <TextInput 
                    value={email} 
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                    keyboardType="email-address" 
                    autoCapitalize="none"
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Contraseña</FormControl.Label>
                  <TextInput 
                    value={password} 
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                    secureTextEntry
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Domicilio</FormControl.Label>
                  <TextInput 
                    value={address} 
                    onChange={(e) => setAddress(e.nativeEvent.text)}
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                  />
                </FormControl>

                <Button mt="2" bg="#E29A2E" isDisabled={!isFormValid} onPress={() => navigation.navigate("Login")}>
                  Registrarse
                </Button>

                <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="coolGray.600">
                    ¿Ya tienes una cuenta?{" "}
                  </Text>
                  <Link
                    _text={{
                      color: "#F2B33D",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Inicia sesión
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default function SignupScreen() {
  return (
    <NativeBaseProvider>
      <Signup />
    </NativeBaseProvider>
  );
}
