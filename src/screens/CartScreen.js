import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  VStack,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Box,
  Image,
  Text,
  Button,
  Icon,
  AlertDialog,
  Actionsheet,
  useDisclose,
  Link
} from 'native-base';

const initialProducts = [
  { id: 1, name: "Manzana", price: 10.00, image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg" },
  { id: 2, name: "Plátano", price: 8.50, image: "https://www.collinsdictionary.com/images/full/banana_64728013.jpg" },
];

function CardCarrito({ product, onDelete, onUpdate }) {
  const [cantidad, setCantidad] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    onUpdate(product.id, cantidad);
  }, [cantidad]);

  const aumentar = () => setCantidad(prev => prev + 1);
  const disminuir = () => {
    if (cantidad === 1) {
      setIsOpen(true);
    } else {
      setCantidad(prev => prev - 1);
    }
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete(product.id);
  };

  const total = (product.price * cantidad).toFixed(2);

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
            source={{ uri: product.image }}
            alt={product.name}
            resizeMode="cover"
            width={60}
            height={60}
            borderRadius={8}
          />
          <VStack flex={1} ml="4" justifyContent="center">
            <Text fontSize="md" fontWeight="bold" color="black">
              {product.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              ${total}
            </Text>
          </VStack>
          <VStack space={2} alignItems="center">
            <Text color="gray.700" fontSize="sm">Cantidad: {cantidad}</Text>
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
  const [products, setProducts] = useState(initialProducts);
  const [quantities, setQuantities] = useState({});
  const { isOpen, onOpen, onClose } = useDisclose();

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
    const focusUnsubscribe = navigation.addListener('focus', () => {
      onOpen(); // Abrir cada vez que entra a la pantalla
    });
  
    const blurUnsubscribe = navigation.addListener('blur', () => {
      onClose(); // Cerrar cada vez que sale
    });
  
    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation]);
  

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    setQuantities(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const totalCarrito = products.reduce((acc, product) => {
    const cantidad = quantities[product.id] || 1;
    return acc + product.price * cantidad;
  }, 0).toFixed(2);

  return (
    <NativeBaseProvider>
      <Actionsheet isOpen={isOpen} onClose={() => {}} disableOverlay hideDragIndicator>
  <Actionsheet.Content bg="#E29A2E">
    <HStack w="100%" px={4} py={2} justifyContent="space-between" alignItems="center" mb={4}>
      <Text fontSize="sm" color="white" bold>
        Enviar a Av. Tecnológico C.P. 20255
      </Text>
      <Link onPress={() => {}} _text={{ color: "blue.300", fontSize: "sm" }}>
        Cambiar dirección
      </Link>
    </HStack>

    <Box w="100%" px={4} py={2} alignItems="center" mb={4}>
      <Text fontSize="20" color="white">Total: ${totalCarrito}</Text>
    </Box>

    <Box w="100%" alignItems="center" mb={4}>
    <Button
  w="80%"
  bg="#F2622E"
  _text={{ color: "white", fontWeight: "bold" }}
  borderRadius="md"
  onPress={() => navigation.navigate('Pago')} // Navegar a PayScreen
>
  Continuar compra
</Button>

    </Box>
  </Actionsheet.Content>
</Actionsheet>



      <ScrollView flex={1} p="5">
        <VStack space={3}>
          {products.map(product => (
            <CardCarrito
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdateQuantity}
            />
          ))}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CartScreen;
