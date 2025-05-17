import React, { useState, useEffect } from "react";
import { 
  Box, Center, Avatar, VStack, Input, ScrollView, 
  NativeBaseProvider, Heading, Button, Text, useToast,
  HStack, AlertDialog
} from "native-base";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    domicilio: ""
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  // Obtener datos del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData({
              nombre: docSnap.data().nombre || "",
              correo: user.email || "",
              domicilio: docSnap.data().direccion || ""
            });
          } else {
            await setDoc(docRef, {
              nombre: "",
              email: user.email,
              direccion: ""
            });
            setUserData({
              nombre: "",
              correo: user.email || "",
              domicilio: ""
            });
          }
        } catch (error) {
          console.error("Error:", error);
          toast.show({
            description: "Error al cargar datos",
            status: "error"
          });
        } finally {
          setLoading(false);
        }
      } else {
        navigation.navigate("Login"); // Redirigir si no hay usuario
      }
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "usuarios", user.uid), {
          nombre: userData.nombre,
          email: userData.correo,
          direccion: userData.domicilio
        }, { merge: true }); // Usamos merge para no sobrescribir otros campos
        
        toast.show({
          description: "¡Datos actualizados!",
          status: "success"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.show({
        description: "Error al guardar",
        status: "error"
      });
    } finally {
      setLoading(false);
      setEditando(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login"); // Redirige al login
      toast.show({
        description: "Sesión cerrada",
        status: "info"
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.show({
        description: "Error al cerrar sesión",
        status: "error"
      });
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Text>Cargando...</Text>
      </Center>
    );
  }

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} bg="white" p={4}>
        {/* Avatar y título */}
        <Center mt={4}>
          <Avatar 
            size="2xl" 
            source={{ uri: "https://theonemedia.es/wp-content/uploads/2024/05/D_TaylorSwiftErasTour_916-1-930x620.jpg" }}
            mb={4}
          />
          <Heading size="lg">Mi Perfil</Heading>
        </Center>

        {/* Formulario */}
        <VStack space={4} mt={6}>
          <Input
            placeholder="Nombre"
            value={userData.nombre}
            onChangeText={(text) => handleInputChange("nombre", text)}
            isDisabled={!editando}
            variant="filled"
            fontSize="md"
          />
          
          <Input
            placeholder="Correo"
            value={userData.correo}
            isDisabled={true}
            variant="filled"
            fontSize="md"
          />
          
          <Input
            placeholder="Domicilio"
            value={userData.domicilio}
            onChangeText={(text) => handleInputChange("domicilio", text)}
            isDisabled={!editando}
            variant="filled"
            fontSize="md"
            multiline
          />

          {/* Botones de acción */}
          <VStack space={2} mt={6}>
            {editando ? (
              <HStack space={2}>
                <Button 
                  flex={1} 
                  colorScheme="green" 
                  onPress={handleSave}
                  isLoading={loading}
                >
                  Guardar
                </Button>
                <Button 
                  flex={1} 
                  colorScheme="gray" 
                  onPress={() => setEditando(false)}
                  isDisabled={loading}
                >
                  Cancelar
                </Button>
              </HStack>
            ) : (
              <Button 
                colorScheme="blue" 
                onPress={() => setEditando(true)}
              >
                Editar Perfil
              </Button>
            )}
            
            <Button 
              colorScheme="red" 
              variant="outline" 
              mt={4}
              onPress={() => setShowLogoutDialog(true)}
            >
              Cerrar Sesión
            </Button>
          </VStack>
        </VStack>

        {/* Diálogo de confirmación */}
        <AlertDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Cerrar Sesión</AlertDialog.Header>
            <AlertDialog.Body>
              ¿Estás seguro de que quieres salir de tu cuenta?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  onPress={() => setShowLogoutDialog(false)}
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onPress={handleLogout}
                >
                  Salir
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ProfileScreen;