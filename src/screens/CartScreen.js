import React, { useLayoutEffect, useRef, useEffect, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VStack, HStack, NativeBaseProvider, ScrollView, Box, Image, Text, Button, Icon, AlertDialog, Actionsheet, useDisclose, Link, Center } from 'native-base';
import { CartContext } from './context/CartContext';
import { auth, db } from "../services/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore"; // ✅ CAMBIO
import { onAuthStateChanged } from "firebase/auth";

function CardCarrito({ product }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = useRef(null);
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const aumentar = () => updateQuantity(product.id, product.quantity + 1);
  const disminuir = () => {
    if (product.quantity === 1) {
      setIsOpen(true);
    } else {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const handleDelete = () => {
    setIsOpen(false);
    removeFromCart(product.id);
  };

  const total = (product.precio * product.quantity).toFixed(2);

  return (
    <>
      <Box w="100%" px="4" py="2">
        <Box
          flexDirection="row"
          alignItems="center"
          p="4"
          borderWidth="1"
          borderColor="coolGray.200"
          rounded="lg"
          bg="gray.50"
        >
          <Image
            source={{ uri: product.imagen }}
            alt={product.nombre}
            resizeMode="cover"
            width={60}
            height={60}
            borderRadius={8}
          />
          <VStack flex={1} ml="4" justifyContent="center">
            <Text fontSize="md" fontWeight="bold" color="black">
              {product.nombre}
            </Text>
            <Text fontSize="sm" color="gray.500">
              ${total}
            </Text>
          </VStack>
          <VStack space={2} alignItems="center">
            <Text color="gray.700" fontSize="sm">Cantidad: {product.quantity}</Text>
            <HStack space={2}>
              <Button size="sm" onPress={disminuir} variant="outline" colorScheme="coolGray">
                <Icon as={Ionicons} name="remove" size="xs" />
              </Button>
              <Button size="sm" onPress={aumentar} variant="outline" colorScheme="coolGray">
                <Icon as={Ionicons} name="add" size="xs" />
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Eliminar producto</AlertDialog.Header>
          <AlertDialog.Body>
            ¿Quieres eliminar el producto de tu lista de compras?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={() => setIsOpen(false)} ref={cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                Aceptar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

const CartScreen = ({ navigation }) => {
  const { cartItems } = useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [domicilio, setDomicilio] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const focusUnsubscribe = navigation.addListener('focus', onOpen);
    const blurUnsubscribe = navigation.addListener('blur', onClose);
    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation]);

  // ✅ CAMBIO: Escuchar en tiempo real la dirección del usuario
  useEffect(() => {
    let unsubscribeSnapshot;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "usuarios", user.uid);
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setDomicilio(userData.direccion || "Dirección no disponible");
          } else {
            setDomicilio("Dirección no encontrada");
          }
        }, (error) => {
          console.error("Error al escuchar documento:", error);
          setDomicilio("Error al obtener dirección");
        });
      } else {
        setDomicilio("No autenticado");
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const totalCarrito = cartItems.reduce((acc, product) => {
    return acc + product.precio * product.quantity;
  }, 0).toFixed(2);

  return (
    <NativeBaseProvider>
      <Actionsheet isOpen={isOpen} onClose={() => {}} disableOverlay hideDragIndicator>
        <Actionsheet.Content bg="#E29A2E">
          <HStack w="100%" px={4} py={2} justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="sm" color="white" bold>
              Enviar a {domicilio}
            </Text>
            <Link onPress={() => navigation.navigate('Perfil')} _text={{ color: "blue.300", fontSize: "sm" }}>
              Cambiar dirección
            </Link>
          </HStack>

          <Box w="100%" px={4} py={2} alignItems="center" mb={4}>
            <Text fontSize="20" color="white">Total: ${totalCarrito}</Text>
          </Box>

          <Box w="100%" alignItems="center" mb={4}>
            <Button w="90%" colorScheme="orange" onPress={() => navigation.navigate('Pago')}>
              Continuar compra
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      <ScrollView flex={1} bg="white">
        <Box pt={2}>
          {cartItems.length === 0 ? (
            <Center py={10}>
              <Text color="gray.500">Tu carrito está vacío</Text>
            </Center>
          ) : (
            cartItems.map(product => (
              <CardCarrito
                key={product.id}
                product={product}
              />
            ))
          )}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CartScreen;
