import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { 
  Box, Heading, AspectRatio, Image, Text, Stack, 
  VStack, HStack, ScrollView, Button, Icon, 
  NativeBaseProvider, Skeleton, FlatList, Center, useToast
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useCart } from '../../context/CartContext';

function Card({ name, price, image, onAddToCart }) {
  return (
    <Box 
      flex={1} 
      maxW="48%" 
      rounded="lg" 
      overflow="hidden" 
      borderColor="coolGray.200" 
      borderWidth="1" 
      _light={{ backgroundColor: "gray.50" }}
      shadow={3}
      m={1.5}
    >
      <AspectRatio w="100%" ratio={7 / 7}>
        <Image 
          source={{ uri: image }} 
          alt={name} 
          resizeMode="cover"
          fallbackSource={{ uri: 'https://via.placeholder.com/150?text=Producto+No+Disponible' }}
        />
      </AspectRatio>
      <Stack p="3" space={2} alignItems="center">
        <Heading size="sm" textAlign="center" noOfLines={2}>{name}</Heading>
        <Text fontWeight="bold" fontSize="md" color="#000000">${price}</Text>
        <Button
          leftIcon={<Icon as={Ionicons} name="cart" size="4" />}
          bg="#F2622E"
          w="full"
          size="sm"
          onPress={onAddToCart}
          _pressed={{ opacity: 0.7 }}
        >
          Comprar
        </Button>
      </Stack>
    </Box>
  );
}

function ProductSkeleton() {
  return (
    <Box flex={1} maxW="48%" m={1.5}>
      <Skeleton h="160" rounded="lg" />
      <Stack p="3" space={2}>
        <Skeleton.Text lines={1} w="80%" alignSelf="center" />
        <Skeleton.Text lines={1} w="50%" alignSelf="center" />
        <Skeleton h="8" rounded="md" mt={2} />
      </Stack>
    </Box>
  );
}

function MeatsFishScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "productos"),
        where("categoria", "==", "Carnes")
      );
      
      const querySnapshot = await getDocs(q);
      const productsData = [];
      
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        productsData.push({ 
          id: doc.id,
          nombre: productData.nombre,
          precio: formatPrice(productData.precio),
          imagen: productData.imagen || 'https://via.placeholder.com/150?text=Carne',
          tipo: productData.tipo || 'Carne'
        });
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching meats:", error);
      toast.show({
        description: "Error al cargar los productos cárnicos",
        status: "error",
        duration: 2000
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    if (typeof price === 'string' && price.startsWith('$')) {
      return price.substring(1);
    }
    return price;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const handleAddToCart = (product) => {
      addToCart({
        id: product.id,
        name: product.nombre,
        price: product.precio,
        image: product.imagen || 'https://via.placeholder.com/150',
      });
    
      Alert.alert("Carrito", `${product.nombre} se ha agregado al carrito.`);
      };

  const renderItem = ({ item }) => (
    <Card 
      name={item.nombre} 
      price={item.precio} 
      image={item.imagen} 
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const renderSkeletons = () => (
    <HStack flexWrap="wrap" justifyContent="space-between" px={2}>
      {[...Array(6)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </HStack>
  );

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} bg="white">
        <Box p={4}>
          <Heading size="xl" mb={4} color="coolGray.800">
            Carnes y Pescados
          </Heading>
          
          {loading ? (
            renderSkeletons()
          ) : products.length === 0 ? (
            <Center flex={1} py={10}>
              <Text color="coolGray.500">No hay productos disponibles</Text>
              <Button 
                mt={4} 
                colorScheme="orange" 
                onPress={handleRefresh}
                isLoading={refreshing}
                size="sm"
              >
                Recargar
              </Button>
            </Center>
          ) : (
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default MeatsFishScreen;