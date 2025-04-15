import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, ScrollView, Button, Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const groceries = [
  { id: 1, name: "Arroz", price: "$30.00", image: "https://lamejicana.mx/cdn/shop/products/Arrozentero.jpg?v=1596913324"},
  { id: 2, name: "Azúcar", price: "$25.00", image: "https://www.laranitadelapaz.com.mx/images/thumbs/0008711_azucar-estandar-beta-san-miguel-50-kg-bto_625.jpeg"},
  { id: 3, name: "Sal", price: "$10.00", image: "https://mercadoacasa.mx/cdn/shop/products/sal_600x600_9f6b5ab9-55d8-46dc-8d31-d7600bb9ccd0_580x.png?v=1587784031"},
  { id: 4, name: "Harina", price: "$40.00", image: "https://imag.bonviveur.com/harina-de-trigo.jpg"},
  { id: 5, name: "Aceite", price: "$50.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCQmK4OraW-WuW-Vb3gT_XZFP-9VsrJwetoBFe1XNSmTiJEonuu6Jrbl8DATxFJdZ_fLQ&usqp=CAU"},
  { id: 6, name: "Pasta", price: "$20.00", image: "https://media.istockphoto.com/id/1096157720/es/foto/secas-pastas-spaghetti.jpg?s=612x612&w=0&k=20&c=hauFhc3-rp9H0lVI5fiCGkrK_g4ncmGtmBY4QkdoCGE="}
];

function Card({ name, price, image }) {
  const handleAddToCart = () => {
    Alert.alert("Carrito", `${name} se ha agregado al carrito.`);
  };

  return (
    <Box flex={1} maxW="48%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _light={{
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

function GroceriesScreen() {
  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
        <VStack space={3}>
          <HStack space={3} justifyContent="center">
            <Card {...groceries[0]} />
            <Card {...groceries[1]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...groceries[2]} />
            <Card {...groceries[3]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...groceries[4]} />
            <Card {...groceries[5]} />
          </HStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default GroceriesScreen;
