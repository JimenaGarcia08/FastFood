import React, { useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AlertDialog, Button, Center, NativeBaseProvider } from 'native-base';
import { Linking } from 'react-native';

const PayScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const onClose = () => setIsOpen(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <Center flex={1} px={5}>
        <Text style={styles.headerText}>Selecciona tu método de pago</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWithImage} onPress={() => setIsOpen(true)}>
            <Text style={styles.buttonText}>Pagar en efectivo al recibir</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
            style={styles.buttonWithImage}
            onPress={() =>
              Linking.openURL('https://www.sandbox.paypal.com/checkoutnow?token=FAKE123TOKEN')
            }
          >
            <Text style={styles.buttonText}>PayPal</Text>
            <Image
              source={require('../../assets/Pago.png')}
              style={styles.image}
            />
          </TouchableOpacity>


        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.Body>
              Tu pedido será pagado en efectivo al recibirlo. ¡Gracias por tu compra!
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                onPress={onClose}
                ref={cancelRef}
                bg="#E29A2E"
                _text={{ color: 'white' }}
                _pressed={{ bg: "#c48121" }}
                flex={1}
              >
                Ok
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  buttonWithImage: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#E29A2E',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
});

export default PayScreen;
