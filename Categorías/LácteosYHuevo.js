import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const category = "Lácteos y Huevo";

const products = [
  { id: 1, name: "Leche Entera (1L)", price: "$25.00", image: "https://www.alpura.com/content/dam/alpura/productos/leches/alpura-entera/Alpura_Entera_1L.png" },
  { id: 2, name: "Yogurt Natural (1kg)", price: "$40.00", image: "https://www.danone.com.mx/content/dam/mexico/productos/yogurt/danone-natural/950g/Danone_Natural_950g.png" },
  { id: 3, name: "Queso Oaxaca (500g)", price: "$80.00", image: "https://chedraui.vtexassets.com/arquivos/ids/211788-800-auto?v=638034964895400000&width=800&height=auto&aspect=true" },
  { id: 4, name: "Mantequilla (250g)", price: "$55.00", image: "https://www.lala.com.mx/assets/img/productos/mantequilla-con-sal-barra.png" },
  { id: 5, name: "Huevos Blancos (Docena)", price: "$35.00", image: "https://www.sanjuandelvalle.com.mx/wp-content/uploads/2020/07/Huevo-Blanco-Docena-min.png" },
  { id: 6, name: "Queso Panela (400g)", price: "$65.00", image: "https://www.aurrera.com.mx/medias/7501026000196-00-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMzQ0Mzl8aW1hZ2UvcG5nfGltYWdlcy9oZjgvaGI4Lzk4MDYwNDU4MTQ4MTQucG5nfGM3NjYwNzYyYjY1YjY3MDk4YmY1NjU2MjYyYjY0N2Y1NDk3NzI5YjYwYjI3ZTk0YjQyYjY4MzY1ZTk" },
  { id: 7, name: "Crema Ácida (500ml)", price: "$30.00", image: "https://www.lala.com.mx/assets/img/productos/crema-lala-original-500ml.png" },
  { id: 8, name: "Leche Deslactosada (1L)", price: "$28.00", image: "https://www.alpura.com/content/dam/alpura/productos/leches/alpura-deslactosada/Alpura_Deslactosada_1L.png" },
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


