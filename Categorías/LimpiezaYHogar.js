import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const category = "Limpieza y Hogar";

const products = [
  { id: 1, name: "Trapeador", price: "$55.00", image: "https://m.media-amazon.com/images/I/71YicQJWRPL._AC_SL1500_.jpg" },
  { id: 2, name: "Escoba", price: "$40.00", image: "https://www.soriana.com/medias/sys_master/h69/h54/9841115437086/-xxl-9841115437086.jpg" },
  { id: 3, name: "Fabuloso Limpiador Multiusos (1L)", price: "$32.50", image: "https://chedraui.vtexassets.com/arquivos/ids/404688/7501035922788_00.jpg?v=637888484153870000" },
  { id: 4, name: "Shampoo para Alfombras", price: "$110.00", image: "https://m.media-amazon.com/images/I/71nBvQvfs3L._AC_SL1500_.jpg" },
  { id: 5, name: "Jabón en Polvo (1kg)", price: "$48.00", image: "https://www.walmart.com.mx/images/productos/large/0750179161200L.jpg" },
  { id: 6, name: "Jabón Líquido para Trastes (650ml)", price: "$28.00", image: "https://www.lacomer.com.mx/assets/img/products/0000000007501015501688_1_mg.jpg" },
  { id: 7, name: "Detergente para Ropa Líquido (3L)", price: "$135.00", image: "https://www.superama.com.mx/Content/images/products/img_large/0750954600288L1.jpg" },
  { id: 8, name: "Cloro (1L)", price: "$18.00", image: "https://www.soriana.com/medias/sys_master/h53/h5a/9808898850846/-xxl-9808898850846.jpg" },
  { id: 9, name: "Franela Paño de Limpieza (Pack 3)", price: "$25.00", image: "https://m.media-amazon.com/images/I/71jBysM95PL._AC_SL1500_.jpg" },
  { id: 10, name: "Limpia Vidrios (500ml)", price: "$30.00", image: "https://www.aurrera.com.mx/medias/sys_master/h57/h63/9841088698398/-lpr-9841088698398-00.jpg" },
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
