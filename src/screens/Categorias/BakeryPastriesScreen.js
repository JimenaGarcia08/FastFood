import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { 
  Box, Heading, AspectRatio, Image, Text, Stack, 
  VStack, HStack, ScrollView, Button, Icon, 
  NativeBaseProvider, Skeleton, FlatList, Center
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
      shadow={2}
      m={1}
    >
      <AspectRatio w="100%" ratio={7 / 7}>
        <Image source={{ uri: image }} alt={name} resizeMode="cover" />
      </AspectRatio>
      <Stack p="3" space={2} alignItems="center">
        <Heading size="sm" textAlign="center">{name}</Heading>
        <Text fontWeight="bold" fontSize="md" color="#000000">${price}</Text>
        <Button
          leftIcon={<Icon as={Ionicons} name="cart" size="5" color="white" />}
          bg="#F2622E"
          w="full"
          onPress={onAddToCart}
          _pressed={{ opacity: 0.8 }}
        >
          Comprar
        </Button>
      </Stack>
    </Box>
  );
}

function ProductSkeleton() {
  return (
    <Box flex={1} maxW="48%" m={1}>
      <Skeleton h="160" rounded="lg" />
      <Stack p="3" space={2}>
        <Skeleton.Text lines={1} w="70%" alignSelf="center" />
        <Skeleton.Text lines={1} w="40%" alignSelf="center" />
        <Skeleton h="10" rounded="md" mt={2} />
      </Stack>
    </Box>
  );
}

function BakeryPastriesScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart } = useCart();


  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "productos"),
        where("categoria", "==", "Panaderia")
      );
      
      const querySnapshot = await getDocs(q);
      const productsData = [];
      
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
      image={item.imagen || 'https://via.placeholder.com/150'} 
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
            Panadería
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

export default BakeryPastriesScreen;