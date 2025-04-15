import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const dairyAndEggs = [
  { id: 1, name: "Leche", price: "$22.00", image: "https://listonic.com/phimageproxy/listonic/products/vanilla_milk.webp" },
  { id: 2, name: "Huevos", price: "$35.00", image: "https://distribuidorayaneth.gt/wp-content/uploads/2020/05/carton-huevos.jpg" },
  { id: 3, name: "Queso fresco", price: "$48.00", image: "https://mercadoacasa.mx/cdn/shop/products/quesofresco.jpg?v=1619022663" },
  { id: 4, name: "Yogur natural", price: "$18.00", image: "https://jetextramar.com/wp-content/uploads/2020/07/2.yogur_.jpg" },
  { id: 5, name: "Crema", price: "$25.00", image: "https://panoli.mx/cdn/shop/products/7501055909537-00-CH1200Wx1200H.jpg?v=1617824993" },
  { id: 6, name: "Mantequilla", price: "$40.00", image: "https://s1.elespanol.com/2015/03/01/cocinillas/cocinillas_14758539_115741484_1024x576.jpg" }
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

function DairyEggsScreen() {
    return (
      <NativeBaseProvider>
        <ScrollView flex={1} p="5">
          <VStack space={3}>
            <HStack space={3} justifyContent="center">
              <Card {...dairyAndEggs[0]} />
              <Card {...dairyAndEggs[1]} />
            </HStack>
            <HStack space={3} justifyContent="center">
              <Card {...dairyAndEggs[2]} />
              <Card {...dairyAndEggs[3]} />
            </HStack>
            <HStack space={3} justifyContent="center">
              <Card {...dairyAndEggs[4]} />
              <Card {...dairyAndEggs[5]} />
            </HStack>
          </VStack>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
  
  export default DairyEggsScreen;
