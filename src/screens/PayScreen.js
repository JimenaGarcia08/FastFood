import React, { useLayoutEffect, useRef, useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AlertDialog, Button, Center, NativeBaseProvider } from 'native-base';
import { CartContext } from './context/CartContext';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const PayScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const { cartItems } = useContext(CartContext);
  const [userData, setUserData] = useState({ nombre: '', email: '', direccion: '' });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            nombre: data.nombre || '',
            email: data.email || '',
            direccion: data.direccion || '',
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const generarTicketPDF = async () => {
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
    const fecha = new Date().toLocaleString();

    const contenidoHTML = `
      <html>
        <body>
          <h1>Ticket de Compra</h1>
          <p><strong>Nombre:</strong> ${userData.nombre}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Dirección:</strong> ${userData.direccion}</p>
          <p><strong>Fecha:</strong> ${fecha}</p>
          <hr/>
          <h2>Productos:</h2>
          <ul>
            ${cartItems.map(item =>
              `<li>${item.nombre} x${item.quantity} - $${(item.precio * item.quantity).toFixed(2)}</li>`
            ).join('')}
          </ul>
          <h2>Total: $${total}</h2>
          <p>¡Gracias por tu compra!</p>
        </body>
      </html>
    `;

    if (Platform.OS === 'web') {
      await Print.printAsync({ html: contenidoHTML });
    } else {
      const { uri } = await Print.printToFileAsync({ html: contenidoHTML });
      await Sharing.shareAsync(uri);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setTimeout(() => {
      generarTicketPDF();
    }, 300);
  };

  const handleMercadoPago = async () => {
    const url = 'https://www.mercadopago.com.mx/'; 
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert('No se pudo abrir el enlace de pago');
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px={5}>
        <Text style={styles.headerText}>Selecciona tu método de pago</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWithImage} onPress={() => setIsOpen(true)}>
            <Text style={styles.buttonText}>Pagar en efectivo al recibir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWithImage} onPress={handleMercadoPago}>
            <Text style={styles.buttonText}>Tarjeta de crédito o débito</Text>
            <Image
              source={require('../../assets/Pago.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialog.Content>
            <AlertDialog.Body>
              Tu pedido será pagado en efectivo al recibirlo. ¡Gracias por tu compra!
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                onPress={handleConfirm}
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
