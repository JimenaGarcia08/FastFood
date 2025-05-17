import React, { useState } from 'react';
import { Box, Text, VStack, Pressable, Modal, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

function HelpScreen() {
  const [showTerms, setShowTerms] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <Box safeArea flex={1} bg="warmGray.50" p={5}>
      <VStack space={6}>
        <Text fontSize="2xl" bold textAlign="center">
          Ayuda
        </Text>

        {/* Card: Términos y Licencias */}
        <Pressable onPress={() => setShowTerms(true)}>
          <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={4} bg="white" shadow={2}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="document-text-outline" size="md" color="#F2622E" />
              <Box>
                <Text fontSize="lg" bold color="coolGray.800">
                  Términos y Licencias
                </Text>
                <Text color="coolGray.600">
                  Revisa nuestros términos de uso y licencias.
                </Text>
              </Box>
            </HStack>
          </Box>
        </Pressable>

        {/* Card: Acerca de */}
        <Pressable onPress={() => setShowAbout(true)}>
          <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={4} bg="white" shadow={2}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="information-circle-outline" size="md" color="#F2622E" />
              <Box>
                <Text fontSize="lg" bold color="coolGray.800">
                  Acerca de
                </Text>
                <Text color="coolGray.600">
                  Conoce más sobre esta aplicación.
                </Text>
              </Box>
            </HStack>
          </Box>
        </Pressable>

        {/* Modal: Términos y Licencias */}
        <Modal isOpen={showTerms} onClose={() => setShowTerms(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Términos y Licencias</Modal.Header>
            <Modal.Body>
              Esta aplicación es solo para fines educativos. Todos los derechos de terceros utilizados aquí pertenecen a sus respectivos dueños.
            </Modal.Body>
          </Modal.Content>
        </Modal>

        {/* Modal: Acerca de */}
        <Modal isOpen={showAbout} onClose={() => setShowAbout(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Acerca de</Modal.Header>
            <Modal.Body>
              Esta app fue desarrollada por estudiantes del Tecnológico de Aguascalientes como parte de un proyecto escolar.
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </VStack>
    </Box>
  );
}

export default HelpScreen;
