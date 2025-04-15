import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, ScrollView, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const fruitsAndVeggies = [
  { id: 1, name: "Manzana", price: "$10.00", image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg" },
  { id: 2, name: "Plátano", price: "$8.50", image: "https://www.collinsdictionary.com/images/full/banana_64728013.jpg" },
  { id: 3, name: "Naranja", price: "$12.00", image: "https://walmartni.vtexassets.com/arquivos/ids/165414/Naranja-Navel-1-Unidad-1-55.jpg?v=637689802149600000" },
  { id: 4, name: "Pera", price: "$15.00", image: "https://static.wikia.nocookie.net/migastronomia/images/b/ba/Dibujos-infantiles-frutas-pera-p.jpg/revision/latest?cb=20110604020050&path-prefix=es" },
  { id: 5, name: "Sandía", price: "$25.00", image: "https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/30.jpg" },
  { id: 6, name: "Uvas", price: "$18.00", image: "https://phygital-files.mercafacil.com/nossohortifruti/uploads/produto/uva_vit_ria_500g_un_a0520ff1-5a92-442b-9415-c1a45d6326b4.png" }
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

function FruitsVeggiesScreen() {
  return (
    <ScrollView flex={1} p="5">
      <VStack space={3}>
        <HStack space={3} justifyContent="center">
          <Card {...fruitsAndVeggies[0]} />
          <Card {...fruitsAndVeggies[1]} />
        </HStack>
        <HStack space={3} justifyContent="center">
          <Card {...fruitsAndVeggies[2]} />
          <Card {...fruitsAndVeggies[3]} />
        </HStack>
        <HStack space={3} justifyContent="center">
          <Card {...fruitsAndVeggies[4]} />
          <Card {...fruitsAndVeggies[5]} />
        </HStack>
      </VStack>
    </ScrollView>
  );
}

export default FruitsVeggiesScreen;