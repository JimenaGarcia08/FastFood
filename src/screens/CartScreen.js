import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, FlatList, Image, Button, HStack, VStack, Divider, Spinner, Center } from 'native-base';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid); // CAMBIO: "usuarios"
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserAddress(data.direccion || 'No se ha registrado una dirección'); // CAMBIO: "direccion"
        } else {
          setUserAddress('No se encontró la dirección del usuario');
        }
        setLoadingAddress(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotal(totalPrice.toFixed(2));
  }, [cartItems]);

  const renderItem = ({ item }) => (
    <Box borderBottomWidth="1" borderColor="coolGray.200" p={4}>
      <HStack space={3} alignItems="center">
        <Image source={{ uri: item.image }} alt={item.name} size="64px" />
        <VStack flex={1}>
          <Text bold>{item.name}</Text>
          <Text>${item.price}</Text>
        </VStack>
        <Button colorScheme="danger" size="sm" onPress={() => removeFromCart(item.id)}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} bg="white">
      <Heading size="lg" p={4} color="coolGray.800">Carrito</Heading>

      {/* Dirección */}
      <Box bg="#FFF3E0" px={4} py={3} borderBottomWidth={1} borderColor="coolGray.200">
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text bold>Dirección de entrega:</Text>
            {loadingAddress ? (
              <Spinner size="sm" mt={1} />
            ) : (
              <Text mt={1} maxW="90%">{userAddress}</Text>
            )}
          </VStack>
          <Button
            variant="ghost"
            _text={{ color: "#F2622E", fontWeight: "bold" }}
            onPress={() => navigation.navigate('Perfil')}
          >
            Cambiar
          </Button>
        </HStack>
      </Box>

      {/* Lista de productos */}
      {cartItems.length === 0 ? (
        <Center flex={1}>
          <Text color="gray.500" mt={10}>Tu carrito está vacío.</Text>
        </Center>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      {/* Franja de total y botón de pagar */}
      {cartItems.length > 0 && (
        <Box position="absolute" bottom={0} left={0} right={0} bg="white" shadow={9} px={4} py={3}>
          <HStack justifyContent="space-between" mb={3}>
            <Text fontSize="lg" bold>Total:</Text>
            <Text fontSize="lg" bold color="#F2622E">${total}</Text>
          </HStack>
          <Button 
            bg="#F2622E"
            _pressed={{ opacity: 0.8 }}
            onPress={() => navigation.navigate('Pago')}
          >
            Ir a pagar
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CartScreen;
