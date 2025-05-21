import React, { useState } from 'react';
import { 
  Box, VStack, FormControl, Input, Button, Center, 
  NativeBaseProvider, Text, Image, ScrollView, Heading, 
  useToast, Select, CheckIcon
} from 'native-base';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddProductScreen = ({ navigation }) => {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    imagen: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const categorias = [
    "Panaderia",
    "Limpieza",
    "Lacteos",
    "Frutas",
    "Abarrotes",
    "Carnes"
  ];

  const handleChange = (name, value) => {
    setProducto({
      ...producto,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!producto.id || !producto.nombre || !producto.precio || !producto.categoria) {
      toast.show({
        description: "Todos los campos excepto imagen son obligatorios",
        status: "warning",
        duration: 3000
      });
      return;
    }

    if (isNaN(parseFloat(producto.precio))) {
      toast.show({
        description: "El precio debe ser un número válido",
        status: "warning",
        duration: 3000
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "productos"), {
        id: producto.id,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        imagen: producto.imagen || null,
        categoria: producto.categoria,
        fechaCreacion: serverTimestamp()
      });

      toast.show({
        description: "✅ Producto agregado correctamente",
        status: "success",
        duration: 2000
      });

      setProducto({
        id: '',
        nombre: '',
        precio: '',
        imagen: '',
        categoria: ''
      });

    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.show({
        description: "❌ Error al guardar el producto",
        status: "error",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} p={4} bg="white">
        <Center>
          <Heading size="lg" mb={6} color="coolGray.800">
            Agregar Nuevo Producto
          </Heading>
          
          {producto.imagen && (
            <Image 
              source={{ uri: producto.imagen }} 
              alt="Vista previa"
              size="2xl"
              resizeMode="contain"
              mb={4}
              borderRadius="md"
            />
          )}

          <VStack space={4} w="100%" maxW="400px">
            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>ID del Producto</FormControl.Label>
              <Input
                value={producto.id}
                onChangeText={(text) => handleChange('id', text)}
                placeholder="Ej: PROD-001"
                bg="coolGray.100"
                borderWidth={0}
                p={3}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>Nombre</FormControl.Label>
              <Input
                value={producto.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
                placeholder="Nombre del producto"
                bg="coolGray.100"
                borderWidth={0}
                p={3}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>Precio ($)</FormControl.Label>
              <Input
                value={producto.precio}
                onChangeText={(text) => handleChange('precio', text)}
                placeholder="0.00"
                keyboardType="numeric"
                bg="coolGray.100"
                borderWidth={0}
                p={3}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label _text={{ bold: true }}>URL de la Imagen</FormControl.Label>
              <Input
                value={producto.imagen}
                onChangeText={(text) => handleChange('imagen', text)}
                placeholder="https://example.com/image.jpg"
                keyboardType="url"
                bg="coolGray.100"
                borderWidth={0}
                p={3}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ bold: true }}>Categoría</FormControl.Label>
              <Select
                selectedValue={producto.categoria}
                minWidth="200"
                placeholder="Selecciona una categoría"
                bg="coolGray.100"
                borderWidth={0}
                p={3}
                _selectedItem={{
                  bg: "primary.500",
                  endIcon: <CheckIcon size="5" />
                }}
                onValueChange={(value) => handleChange('categoria', value)}
              >
                {categorias.map((cat) => (
                  <Select.Item key={cat} label={cat} value={cat} />
                ))}
              </Select>
            </FormControl>

            <Button
              mt={6}
              bg="#E29A2E"
              _text={{ fontWeight: 'bold', fontSize: 'md' }}
              _pressed={{ opacity: 0.8 }}
              onPress={handleSubmit}
              isLoading={loading}
              isLoadingText="Guardando..."
              isDisabled={loading}
            >
              Guardar Producto
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AddProductScreen;