import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, VStack, ScrollView } from "native-base";

const Card = () => {
  return (
    <Box 
      w="45%" 
      rounded="lg" 
      overflow="hidden" 
      borderColor="coolGray.200" 
      borderWidth="1" 
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} 
      _light={{
        backgroundColor: "gray.50"
      }}
    >
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
        </AspectRatio>
        <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
          PHOTOS
        </Center>
      </Box>
      <Stack p="3" space={2}>
        <Heading size="sm" ml="-1">
          The Garden City
        </Heading>
        <Text fontSize="xs" _light={{
          color: "violet.500"
        }} _dark={{
          color: "violet.400"
        }} fontWeight="500" ml="-0.5" mt="-1">
          The Silicon Valley of India.
        </Text>
        <Text fontSize="xs">
          Bengaluru (also called Bangalore) is the center of India's high-tech industry.
        </Text>
      </Stack>
    </Box>
  );
};

function DetailsScreen() {
  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
      <Center flex={1} px="3" mt="10"> 
          <HStack space={3} flexWrap="wrap" justifyContent="center">
            <Card />
            <Card />
          </HStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default DetailsScreen;
