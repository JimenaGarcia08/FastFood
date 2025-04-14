import React from 'react';
import { Box, Text, VStack, Icon, Pressable, useToast } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

function ContactUsScreen() {
  const toast = useToast();

  const handleOpenGmail = (email) => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    Linking.openURL(gmailURL).catch(() => {
      toast.show({
        title: 'Error',
        description: 'No se pudo abrir Gmail',
        status: 'error',
        placement: 'top',
      });
    });

    toast.show({
      title: 'Redireccionando...',
      description: 'Se está abriendo Gmail',
      status: 'info',
      placement: 'top',
    });
  };

  return (
    <Box safeArea flex={1} bg="warmGray.50" p={5}>
      <VStack space={6}>
        <Text fontSize="2xl" bold textAlign="center">
          Contáctanos
        </Text>

        <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={4} bg="white" shadow={2}>
          <Text fontSize="lg" bold color="coolGray.800">
            Jimena Alejandra García Pérez
          </Text>
          <Text color="coolGray.600">
            Desarrollador backend
          </Text>
          <Pressable onPress={() => handleOpenGmail('19151736@aguascalientes.tecnm.mx')}>
            <Text mt={2} underline color="blue.500">
              19151736@aguascalientes.tecnm.mx
            </Text>
          </Pressable>
        </Box>

        <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={4} bg="white" shadow={2}>
          <Text fontSize="lg" bold color="coolGray.800">
            Francisco Javier Macias Martinez
          </Text>
          <Text color="coolGray.600">
            Desarrollador frontend
          </Text>
          <Pressable onPress={() => handleOpenGmail('francmaci01@gmail.com')}>
            <Text mt={2} underline color="blue.500">
              francmaci01@gmail.com
            </Text>
          </Pressable>
        </Box>

        <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={4} bg="white" shadow={2}>
          <Text fontSize="lg" bold color="coolGray.800">
            Sharbat Guadalupe Álvarez López
          </Text>
          <Text color="coolGray.600">
            Tester QA
          </Text>
          <Pressable onPress={() => handleOpenGmail('sharbathlopez@gmail.com')}>
            <Text mt={2} underline color="blue.500">
              sharbathlopez@gmail.com
            </Text>
          </Pressable>
        </Box>
      </VStack>
    </Box>
  );
}

export default ContactUsScreen;
