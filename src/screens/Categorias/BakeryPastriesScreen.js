import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, ScrollView, Button, Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const bakeryAndPastries = [
  { id: 1, name: "Pan de caja", price: "$15.00", image: "https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00020825600000L.jpg"},
  { id: 2, name: "Croissant", price: "$20.00", image: "https://panamarbakery.com/public/Image/2022/10/130571_croissant_choco_blanco95_Galeria.png"},
  { id: 3, name: "Baguette", price: "$18.00", image: "https://sanalocura.es/wp-content/uploads/2023/06/PAN-001-BAGUETTE-DE-MAIZ-SIN-GLUTEN.jpg"},
  { id: 4, name: "Muffin", price: "$25.00", image: "https://mojo.generalmills.com/api/public/content/ZHnR_y4FRCyGGvrEv6pLng_gmi_hi_res_jpeg.jpeg?v=cd8196c2&t=bc0cec1fd4bc4c35b967df95af8c1fcc"},
  { id: 5, name: "Tarta de manzana", price: "$50.00", image: "https://vandemoortele.getbynder.com/transform/70e271d9-adf6-4233-92f8-536a064978a3/Hunky-chunky-apple-pie-27cm?io=transform:scale,height:800"},
  { id: 6, name: "Galletas", price: "$30.00", image: "https://lasdeliciasdemariel.mx/wp-content/uploads/2023/09/04_GALLETA-CHISPAS-DE-CHOCOLATE-5431.jpg" }
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

function BakeryPastriesScreen() {
  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
        <VStack space={3}>
          <HStack space={3} justifyContent="center">
            <Card {...bakeryAndPastries[0]} />
            <Card {...bakeryAndPastries[1]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...bakeryAndPastries[2]} />
            <Card {...bakeryAndPastries[3]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...bakeryAndPastries[4]} />
            <Card {...bakeryAndPastries[5]} />
          </HStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default BakeryPastriesScreen;
