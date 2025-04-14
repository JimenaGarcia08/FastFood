import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const category = "Panadería y Repostería";

const products = [
  { id: 1, name: "Pan Blanco", price: "$15.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0000000022025L1.jpg" },
  { id: 2, name: "Baguette", price: "$12.50", image: "https://www.superama.com.mx/Content/images/products/img_large/0000000022001L1.jpg" },
  { id: 3, name: "Croissant", price: "$18.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0000000022117L1.jpg" },
  { id: 4, name: "Pastel de Chocolate Individual", price: "$35.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0007501032341L1.jpg" },
  { id: 5, name: "Donas Glaseadas (Paquete de 6)", price: "$45.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0007501032044L1.jpg" },
  { id: 6, name: "Galletas de Chispas de Chocolate (Paquete)", price: "$28.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0007501032193L1.jpg" },
  { id: 7, name: "Muffin de Arándanos", price: "$22.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0007501032280L1.jpg" },
  { id: 8, name: "Roles de Canela (Paquete de 4)", price: "$55.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0007501032310L1.jpg" },
];

function Card({ name, price, image }) {
  const handleAddToCart = () => {
    Alert.alert("Carrito", `${name} se ha agregado al carrito.`);
  };

  return (
    <Box flex={1} maxW="48%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <AspectRatio w="100%" ratio={7 / 7}>
        <Image source={{ uri: image }} alt={name} />
      </AspectRatio>
      <Stack p="4" space={2} alignItems="center">
        <Heading size="sm">{name}</Heading>
        <Text fontWeight="bold" fontSize="md" color="#000000" textAlign="center">{price}</Text>
        <Button
          leftIcon={<Icon as={Ionicons} name="cart" size="5" color="white" />}
          bg="#F2622E"
          w="full"
          onPress={handleAddToCart}
        >
          Comprar
        </Button>
      </Stack>
    </Box>
  );
}

function HomeScreen() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < filteredProducts.length; i += 2) {
      rows.push(
        <HStack key={i} space={3} justifyContent="center">
          <Card {...filteredProducts[i]} />
          {filteredProducts[i + 1] && <Card {...filteredProducts[i + 1]} />}
        </HStack>
      );
    }
    return rows;
  };

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
        <Heading mb={5}>{category}</Heading>
        {/* Barra de búsqueda con ícono */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 10
        }}>
          <Icon as={Ionicons} name="search" size="5" color="gray.500" />
          <TextInput
            style={{ flex: 1, height: 40, marginLeft: 5 }}
            placeholder="Buscar..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Diseño en filas de 2 columnas */}
        <VStack space={3}>
          {renderProducts()}
        </VStack>
        {filteredProducts.length === 0 && (
          <Text mt={5} textAlign="center" color="gray.500">No se encontraron productos en esta categoría.</Text>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default HomeScreen;


