import React, { useState, useEffect } from 'react';
import {
  Box, Heading, AspectRatio, Image, Text, Stack,
  Icon, Button, Input, Center, Skeleton, useToast, FlatList
} from 'native-base';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../services/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { View, TextInput } from 'react-native';

function Card({ name, price, image, isNew, onAddToCart }) {
  return (
    <Box flex={1} maxW="48%" m={1} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
      <AspectRatio w="100%" ratio={7 / 7}>
        <Image source={{ uri: image }} alt={name} resizeMode="cover" />
      </AspectRatio>
      {isNew && (
        <Center bg="violet.500" position="absolute" top="2" right="2" px="2" py="1" borderRadius="full">
          <Text color="white" fontSize="xs" fontWeight="bold">NUEVO</Text>
        </Center>
      )}
      <Stack p="3" space={2} alignItems="center">
        <Heading size="sm" textAlign="center">{name}</Heading>
        <Text fontWeight="bold" fontSize="md">${price}</Text>
        <Button
          leftIcon={<Icon as={Ionicons} name="cart" size="4" color="white" />}
          bg="#F2622E"
          w="full"
          size="sm"
          onPress={onAddToCart}
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

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const toast = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const q = query(collection(db, "productos"), orderBy("fechaCreacion", "desc"), limit(4));
        const querySnapshot = await getDocs(q);
        const productsData = [];

        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
            isNew: true,
          });
        });

        setFeaturedProducts(productsData);
      } catch (error) {
        toast.show({ description: "Error al cargar productos", status: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
  if (searchText.trim() === '') {
    setProducts([]); 
  }
}, [searchText]);


  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.show({ description: "Ingresa un término de búsqueda", status: "warning" });
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
        });
      });

      setProducts(searchResults);
    } catch (error) {
      toast.show({ description: "Error al buscar productos", status: "error" });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddToCart = (product) => {
  const name = product.name || product.nombre;
  const price = product.price || product.precio;
  const image = product.image || product.imagen || 'https://via.placeholder.com/150';

  addToCart({
    id: product.id,
    name,
    price,
    image,
  });

  Alert.alert("Carrito", `${name} se ha agregado al carrito.`);
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <Box flex={1} p={4} bg="white">

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  }}
>
  <Icon
    as={Ionicons}
    name="search"
    size={5}
    color="gray.500"
    style={{ marginHorizontal: 8 }}
  />

  <TextInput
    placeholder="Buscar productos..."
    value={searchText}
    onChangeText={setSearchText}
    style={{
      flex: 1,
      fontSize: 16,
      paddingVertical: 10,
    }}
    returnKeyType="search"
    onSubmitEditing={handleSearch}
  />

  {searchText.length > 0 && (
  <Icon
    as={Ionicons}
    name="close"
    size={5}
    color="gray.500"
    onPress={() => setSearchText('')}
    style={{ marginLeft: 8 }}
  />
)}

  <Button
    size="sm"
    isLoading={searchLoading}
    onPress={handleSearch}
    bg="#F2622E"
    _text={{ color: "white", fontWeight: "bold" }}
    style={{ marginRight: 4 }}
  >
    Buscar
  </Button>
</View>

        {products.length > 0 && (
          <>
            <Heading size="md" mb={3} color="coolGray.800">Resultados de búsqueda</Heading>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <Card
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled={false}
            />
          </>
        )}

        {products.length === 0 && (
  <>
    <Heading size="md" mt={6} mb={3} color="coolGray.800">Productos Destacados</Heading>
    <FlatList
      data={loading ? Array(4).fill({}) : featuredProducts}
      renderItem={({ item, index }) =>
        loading ? (
          <SkeletonCard key={index} />
        ) : (
          <Card
            name={item.nombre}
            price={item.precio}
            image={item.imagen}
            isNew={item.isNew}
            onAddToCart={() => handleAddToCart(item)}
          />
        )
      }
      keyExtractor={(item, index) => item.id || index.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  </>
)}
      </Box>
    </KeyboardAvoidingView>
  );
}
