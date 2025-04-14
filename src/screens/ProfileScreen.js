import React, { useState } from "react";
import { Box, Center, Avatar, VStack, Input, ScrollView, NativeBaseProvider, Heading, Button } from "native-base";

const ProfileScreen = () => {
  const [nombre, setNombre] = useState("Taylor Swift");
  const [correo, setCorreo] = useState("taylor@example.com");
  const [domicilio, setDomicilio] = useState("Calle Zihuatanejo 123, Ciudad");

  const [editando, setEditando] = useState(false);

  const toggleEdit = () => {
    if (editando) {
      console.log("Guardando datos...", { nombre, correo, domicilio });
    }
    setEditando(!editando);
  };

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} bg="white">
        <Center mt={10} px={5}>
          <Avatar
            size="2xl"
            source={{
              uri: "https://theonemedia.es/wp-content/uploads/2024/05/D_TaylorSwiftErasTour_916-1-930x620.jpg",
            }}
            mb={5}
          />
          
          <Heading mb={5}>Datos personales</Heading>

          {/* Formulario */}
          <VStack space={4} width="100%">
            <Input
              placeholder="Nombre completo"
              value={nombre}
              onChangeText={setNombre}
              isDisabled={!editando}
              variant="outline"
            />
            <Input
              placeholder="Correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              isDisabled={!editando}
              variant="outline"
              keyboardType="email-address"
            />
            <Input
              placeholder="Domicilio"
              value={domicilio}
              onChangeText={setDomicilio}
              isDisabled={!editando}
              variant="outline"
              multiline
            />
            <Button
              onPress={toggleEdit}
              colorScheme={editando ? "green" : "blue"}
              mt={4}
            >
              {editando ? "Guardar" : "Modificar"}
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ProfileScreen;
