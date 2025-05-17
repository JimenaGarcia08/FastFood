import React from 'react';
import { Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, ScrollView, Button, Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const cleaningProducts = [
  { id: 1, name: "Detergente", price: "$35.00", image: "https://www.abastecedorahigienica.com/wp-content/uploads/2024/02/enzydetplus_1litro-01.jpg"},
  { id: 2, name: "Desinfectante", price: "$45.00", image: "https://www.tpcbio.com/wp-content/uploads/2021/02/LIMPIADOR-DESINFECTANTE-1.png"},
  { id: 3, name: "Jabón líquido", price: "$25.00", image: "https://www.cityclub.com.mx/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dwb975318b/images/product/7500093595689-A2.jpg?sw=1000&sh=1000&sm=fit"},
  { id: 4, name: "Limpiador multiusos", price: "$50.00", image: "https://hebmx.vtexassets.com/arquivos/ids/710214-800-800?v=638497993484230000&width=800&height=800&aspect=true"},
  { id: 5, name: "Toallas de papel", price: "$15.00", image: "https://cdn.homedepot.com.mx/productos/164970/164970-d.jpg"},
  { id: 6, name: "Bolsas de basura", price: "$12.00", image: "https://cdn-bkeeb.nitrocdn.com/zsofKHbptpcPapRNFtSXtlffVRbuwdqz/assets/images/optimized/rev-86f0057/www.spulindustrial.com.mx/wp-content/uploads/2019/01/BOLSA-NEGRA.png"}
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

function CleaningProductsScreen() {
  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
        <VStack space={3}>
          <HStack space={3} justifyContent="center">
            <Card {...cleaningProducts[0]} />
            <Card {...cleaningProducts[1]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...cleaningProducts[2]} />
            <Card {...cleaningProducts[3]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <Card {...cleaningProducts[4]} />
            <Card {...cleaningProducts[5]} />
          </HStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default CleaningProductsScreen;
