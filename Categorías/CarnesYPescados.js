import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const category = "Carnes y Pescados";

const products = [
  { id: 1, name: "Bistec de Res", price: "$120.00/kg", image: "https://www.carnesramos.com/wp-content/uploads/2021/06/bistec-de-res.jpg" },
  { id: 2, name: "Filete de Salmón", price: "$180.00/kg", image: "https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/recipes/filete-de-salmon-a-la-mantequilla.jpg?itok=j133J2XL" },
  { id: 3, name: "Pechuga de Pollo", price: "$75.00/kg", image: "https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/recipes/pechuga_de_pollo_a_la_plancha_con_ensalada.jpg?itok=j3x9a04G" },
  { id: 4, name: "Chuleta de Cerdo", price: "$90.00/kg", image: "https://www.hogarmania.com/archivos/202010/chuletas-cerdo-salsa-pimienta-668.jpg" },
  { id: 5, name: "Carne Molida de Res", price: "$85.00/kg", image: "https://www.superama.com.mx/Content/images/products/img_large/0000000005000L1.jpg" },
  { id: 6, name: "Camarón Crudo", price: "$220.00/kg", image: "https://www.mariscoslaplaya.com/wp-content/uploads/2020/07/camaron-crudo-sin-cabeza.jpg" },
  { id: 7, name: "Costillas de Res", price: "$110.00/kg", image: "https://www.carnesdonfernando.com/wp-content/uploads/2023/02/costilla-de-res-cargada.jpg" },
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


