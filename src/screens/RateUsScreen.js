import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';

const RateUsScreen = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); 

  const handleSubmit = () => {
    if (comment.trim() && rating > 0) {
      Alert.alert("¡Gracias!", "Se han enviado tus comentarios.");
      setComment(''); 
      setRating(0); 
    } else {
      Alert.alert("Error", "Por favor, escribe un comentario y selecciona una calificación.");
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} p={5} justifyContent="center" bg="white">
            <Text fontSize="xl" mb={4}>Escribe tus comentarios</Text>

            <Box mb={4}>
              <Text fontSize="md">Calificación:</Text>
              <AirbnbRating
                count={5}
                defaultRating={rating}
                onFinishRating={setRating}
                size={30}
              />
            </Box>

            <View style={{ marginBottom: 16 }}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Tu mensaje aquí..."
                multiline
                numberOfLines={4}
                style={{
                  height: 100,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderRadius: 4,
                  textAlignVertical: 'top',
                }}
              />
            </View>

            <Button mt={4} onPress={handleSubmit} colorScheme="orange">
              Enviar
            </Button>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default RateUsScreen;
