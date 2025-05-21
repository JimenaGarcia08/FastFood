import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { 
  Box, Center, Avatar, VStack, Input, ScrollView, 
  NativeBaseProvider, Heading, Button, Text, useToast,
  HStack, AlertDialog, Modal, Icon
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    domicilio: "",
    fotoPerfil: ""
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
              domicilio: docSnap.data().direccion || "",
              fotoPerfil: docSnap.data().fotoPerfil || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            });
          } else {
            await setDoc(docRef, {
              nombre: "",
              email: user.email,
              direccion: "",
              fotoPerfil: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            });
            setUserData({
              nombre: "",
              correo: user.email || "",
              domicilio: "",
              fotoPerfil: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
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
        navigation.navigate("Login"); 
      }
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveImageUrl = async () => {
    if (!imageUrl) {
      toast.show({
        description: "Por favor ingresa una URL válida",
        status: "warning"
      });
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      // Actualizar estado y Firestore
      setUserData(prev => ({ ...prev, fotoPerfil: imageUrl }));
      await setDoc(doc(db, "usuarios", user.uid), {
        fotoPerfil: imageUrl
      }, { merge: true });

      toast.show({
        description: "Foto de perfil actualizada",
        status: "success"
      });
      setShowImageModal(false);
      setImageUrl("");
    } catch (error) {
      console.error("Error al actualizar foto:", error);
      toast.show({
        description: "Error al actualizar la foto",
        status: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "usuarios", user.uid), {
          nombre: userData.nombre,
          email: userData.correo,
          direccion: userData.domicilio,
          fotoPerfil: userData.fotoPerfil
        }, { merge: true });
        
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
      navigation.replace("Login");
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
            source={{ uri: userData.fotoPerfil }}
            mb={4}
          >
            {userData.nombre.charAt(0)}
          </Avatar>
          
          {editando && (
            <Button 
              variant="outline" 
              colorScheme="blue" 
              size="sm" 
              mb={4}
              onPress={() => setShowImageModal(true)}
              leftIcon={<Icon as={Ionicons} name="camera" size="sm" />}
            >
              Cambiar Foto
            </Button>
          )}
          
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
                  leftIcon={<Icon as={Ionicons} name="save" size="sm" />}
                >
                  Guardar
                </Button>
                <Button 
                  flex={1} 
                  colorScheme="gray" 
                  onPress={() => setEditando(false)}
                  isDisabled={loading}
                  leftIcon={<Icon as={Ionicons} name="close" size="sm" />}
                >
                  Cancelar
                </Button>
              </HStack>
            ) : (
              <Button 
                colorScheme="blue" 
                onPress={() => setEditando(true)}
                leftIcon={<Icon as={Ionicons} name="create" size="sm" />}
              >
                Editar Perfil
              </Button>
            )}
            
            <Button 
              colorScheme="red" 
              variant="outline" 
              mt={4}
              onPress={() => setShowLogoutDialog(true)}
              leftIcon={<Icon as={Ionicons} name="log-out" size="sm" />}
            >
              Cerrar Sesión
            </Button>
          </VStack>
        </VStack>

        {/* Modal para cambiar foto por URL */}
        <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Cambiar Foto de Perfil</Modal.Header>
            <Modal.Body>
              <Text mb={2}>Ingresa la URL de tu nueva foto:</Text>
              <Input
                placeholder="https://ejemplo.com/foto.jpg"
                value={imageUrl}
                onChangeText={setImageUrl}
                autoCapitalize="none"
                keyboardType="url"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button 
                  variant="ghost" 
                  onPress={() => setShowImageModal(false)}
                  leftIcon={<Icon as={Ionicons} name="close" size="sm" />}
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="blue"
                  onPress={handleSaveImageUrl}
                  isLoading={loading}
                  leftIcon={<Icon as={Ionicons} name="save" size="sm" />}
                >
                  Guardar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

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
                  leftIcon={<Icon as={Ionicons} name="close" size="sm" />}
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onPress={handleLogout}
                  leftIcon={<Icon as={Ionicons} name="log-out" size="sm" />}
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