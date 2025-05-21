import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { 
  Box, Heading, AspectRatio, Image, Text, Stack, 
  VStack, HStack, NativeBaseProvider, ScrollView, 
  Icon, Button, Input, Center, Skeleton, useToast, FlatList
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../services/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

function Card({ name, price, image, isNew }) {
  const handleAddToCart = () => {
    Alert.alert("Carrito", `${name} se ha agregado al carrito.`);
  };

  return (
    <Box flex={1} maxW="48%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" 
      _light={{ backgroundColor: "gray.50" }} position="relative">
      
      <AspectRatio w="100%" ratio={7 / 7}>
        <Image source={{ uri: image }} alt={name} resizeMode="cover" />
      </AspectRatio>
      
      {isNew && (
        <Center bg="violet.500" _dark={{ bg: "violet.400" }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" top="2" right="2" px="2" py="1" borderRadius="full">
          NUEVO
        </Center>
      )}
      
      <Stack p="3" space={2} alignItems="center">
        <Heading size="sm" textAlign="center">{name}</Heading>
        <Text fontWeight="bold" fontSize="md" color="#000000">${price}</Text>
        <Button
          leftIcon={<Icon as={Ionicons} name="cart" size="4" color="white" />}
          bg="#F2622E"
          w="full"
          size="sm"
          onPress={handleAddToCart}
          _pressed={{ opacity: 0.8 }}
        >
          Comprar
        </Button>
      </Stack>
    </Box>
  );
}

function SkeletonCard() {
  return (
    <Box flex={1} maxW="48%" m={1}>
      <Skeleton h="160" rounded="lg" />
      <Stack p="3" space={2}>
        <Skeleton.Text lines={1} w="70%" alignSelf="center" />
        <Skeleton.Text lines={1} w="40%" alignSelf="center" />
        <Skeleton h="8" rounded="md" mt={2} />
      </Stack>
    </Box>
  );
}

function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const toast = useToast();

useEffect(() => {
  console.log("Estoy montando HomeScreen");

  const fetchAllProducts = async () => {
    try {
      const q = query(
        collection(db, "productos"),
        orderBy("fechaCreacion", "desc"), 
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
          isNew: true,
        });
      });

      console.log("Productos cargados:", productsData); // <--- revisa si esto imprime
      setFeaturedProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.show({
        description: "Error al cargar productos",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchAllProducts();
}, []);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.show({
        description: "Ingresa un término de búsqueda",
        status: "warning"
      });
      return;
    }

    try {
      setSearchLoading(true);
      const q = query(
        collection(db, "productos"),
        where("nombre", ">=", searchText),
        where("nombre", "<=", searchText + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      const searchResults = [];
      
      querySnapshot.forEach((doc) => {
        searchResults.push({ 
          id: doc.id, 
          name: doc.data().nombre,
          price: doc.data().precio,
          image: doc.data().imagen,
          isNew: doc.data().precio > 30
        });
      });

      setProducts(searchResults);
    } catch (error) {
      console.error("Error searching products:", error);
      toast.show({
        description: "Error al buscar productos",
        status: "error"
      });
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} bg="white" p={4}>
        <Box mb={4} shadow={1} borderRadius="md" bg="white">
          <Input
            placeholder="Buscar productos..."
            value={searchText}
            onChangeText={setSearchText}
            fontSize="md"
            py={3}
            px={4}
            borderWidth={0}
            bg="gray.100"
            borderRadius="md"
            InputLeftElement={
              <Icon as={Ionicons} name="search" size={5} ml={3} color="gray.500" />
            }
            InputRightElement={
              <Button 
                size="xs" 
                rounded="md" 
                h="70%" 
                mr={2} 
                onPress={handleSearch}
                isLoading={searchLoading}
                bg="#F2622E"
                _text={{ color: "white", fontWeight: "bold" }}
              >
                Buscar
              </Button>
            }
          />
        </Box>

        {products.length > 0 && (
          <>
            <Heading size="md" mb={3} color="coolGray.800">
              Resultados de búsqueda
            </Heading>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <Card 
                  name={item.nombre} 
                  price={item.precio} 
                  image={item.imagen} 
                  isNew={item.isNew} 
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        <Heading size="md" mt={6} mb={3} color="coolGray.800">
          Productos Destacados
        </Heading>
        
        {loading ? (
          <HStack flexWrap="wrap" justifyContent="space-between">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </HStack>
        ) : (
          <FlatList
            data={featuredProducts}
            renderItem={({ item }) => (
              <Card 
                name={item.nombre} 
                price={item.precio} 
                image={item.imagen} 
                isNew={item.isNew} 
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default HomeScreen;