import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Stack, VStack, HStack, NativeBaseProvider, ScrollView, Icon, Button, Skeleton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: 1, name: "Manzana", price: "$10.00", image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg" },
  { id: 2, name: "Plátano", price: "$8.50", image: "https://www.collinsdictionary.com/images/full/banana_64728013.jpg" },
  { id: 3, name: "Naranja", price: "$12.00", image: "https://www.collinsdictionary.com/images/full/orange_342161324.jpg" },
  { id: 4, name: "Pera", price: "$15.00", image: "https://www.collinsdictionary.com/images/full/pear_152229497.jpg" }
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

function SkeletonCard() {
  return (
    <Box flex={1} maxW="48%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" p="4">
      <Skeleton h="150" w="100%" mb="4" />
      <VStack space={2}>
        <Skeleton.Text lines={1} />
        <Skeleton.Text lines={1} width="40%" />
        <Skeleton h="10" rounded="md" />
      </VStack>
    </Box>
  );
}

function HomeScreen() {
  const [search, setSearch] = useState('');

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p="5">
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

        <VStack space={3}>
          <HStack space={3} justifyContent="center">
            <Card {...products[0]} />
            <Card {...products[1]} />
          </HStack>
          <HStack space={3} justifyContent="center">
            <SkeletonCard />
            <SkeletonCard />
          </HStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default HomeScreen;
