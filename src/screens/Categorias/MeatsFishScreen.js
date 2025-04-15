import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const meatsAndFish = [
  { id: 1, name: "Carne de res", price: "$85.00", image: "https://carnesideal.tienda/cdn/shop/products/RES58-1_7d85edfa-86a8-4dcd-b56e-30ac1a296c49_800x.jpg?v=1741048614" },
  { id: 2, name: "Carne de cerdo", price: "$75.00", image: "https://150927483.v2.pressablecdn.com/wp-content/uploads/2025/01/wp-image-3949.png" },
  { id: 3, name: "Pollo", price: "$65.00", image: "https://productosdeldia.com/cdn/shop/products/POLLOENTERODELDIA.jpg?v=1632852067" },
  { id: 4, name: "Filete de salmón", price: "$120.00", image: "https://www.centraladomicilio.com/cdn/shop/products/salmon.jpg?v=1584466069" },
  { id: 5, name: "Tilapia", price: "$95.00", image: "https://carnesideal.tienda/cdn/shop/products/precio-del-pescado-tilapia.png?v=1741048517" },
  { id: 6, name: "Camarones", price: "$130.00", image: "https://www.ocean-treasure.com/wp-content/uploads/2020/07/redshrimp.jpg" }
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

function MeatsFishScreen() {
  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
        <VStack space={3}>
          {Array.from({ length: meatsAndFish.length / 2 }, (_, i) => (
            <HStack key={i} space={3} justifyContent="center">
              <Card {...meatsAndFish[i * 2]} />
              <Card {...meatsAndFish[i * 2 + 1]} />
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default MeatsFishScreen;
