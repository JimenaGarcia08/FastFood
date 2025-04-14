import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const category = "Abarrotes";

const products = [
  { id: 1, name: "Arroz (1 kg)", price: "$25.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0750179160008L1.jpg" },
  { id: 2, name: "Frijol Negro (1 kg)", price: "$30.00", image: "https://www.chedraui.com.mx/medias/7501002400010-00-CH1200Wx1200H?context=bWFzdGVyfGltYWdlc3w1MzE1OXxpbWFnZS9qcGVnfGltYWdlcy9oZDYvaDk3LzEwMTAzMjYwNjEwNTkwLmpwZ3wzYjQ2YjQzY2Q3YjY0YjQ4YmI5YjQxYjQzYjE4YjYyM2Q2YTMwN2QxNzY2M2Q2M2ZiYjQyZTkxYjQ" },
  { id: 3, name: "Aceite Vegetal (900 ml)", price: "$35.00", image: "https://www.soriana.com/medias/7501035000076-00-Foto1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wzMzkzN3xpbWFnZS9qcGVnfGltYWdlcy9oYTMvaDQwLzEwMTAyNjY0MjYxNjYyLmpwZ3w2YjQxNmE0YjQ0ZTVlNjY0YjQxNzQxNjE1YmQ0NzY2YjQxNmI4NzY5ZTIyZWMzYjY4YjE0YjM0YjY" },
  { id: 4, name: "Harina de Trigo (1 kg)", price: "$18.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0750100311178L1.jpg" },
  { id: 5, name: "Azúcar Morena (1 kg)", price: "$22.00", image: "https://www.soriana.com/medias/7501000110108-00-Foto1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wzMzYyN3xpbWFnZS9qcGVnfGltYWdlcy9oYjQvaDk4LzEwMTAyNjYyNzU3NjYyLmpwZ3wzYjM0Y2Y2YjI4YjY2YjU2YjY0YjQzYjYyYjQzYjU2YjU2YjYyYjYyYjY0YjYyYjYyYjY" },
  { id: 6, name: "Sal Refinada (1 kg)", price: "$12.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0750100010009L1.jpg" },
  { id: 8, name: "Café Molido (250 gr)", price: "$45.00", image: "https://www.walmart.com.mx/images/product-images/img_large/00750105620205L.jpg" },
  { id: 9, name: "Pasta de Sopa (500 gr)", price: "$15.00", image: "https://www.aurrera.com.mx/medias/7501017000046-00-CH1200Wx1200H?context=bWFzdGVyfGltYWdlc3wzNjYwN3xpbWFnZS9qcGVnfGltYWdlcy9oYTEvaGI2LzEwMTAyNzY2NjY0NzM0LmpwZ3wwYjQyYjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY4YjY" },
  { id: 10, name: "Atún en Agua (lata)", price: "$18.00", image: "https://www.chedraui.com.mx/medias/7501072500014-00-CH1200Wx1200H?context=bWFzdGVyfGltYWdlc3wzNjQ0N3xpbWFnZS9qcGVnfGltYWdlcy9oYjAvaGI5LzEwMTAyNzY1MzkzMTgyLmpwZ3wzYjYyYjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY0YjY4YjY" },
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


