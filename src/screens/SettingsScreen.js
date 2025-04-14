import React from 'react';
import { useColorMode, useColorModeValue, Text, Box, Switch, Select, CheckIcon, Icon, useToast } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen() {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue("Light", "Dark");
  const bg = useColorModeValue("warmGray.50", "coolGray.900");
  const textColor = useColorModeValue("black", "white");

  const toast = useToast();
  const [language, setLanguage] = React.useState("en");
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);

    if (newValue) {
      toast.show({
        title: "Notificaciones activadas",
        description: "Has activado las notificaciones.",
        status: "success",
        placement: "top",
      });
    }
  };

  return (
    <Box flex={1} bg={bg} safeArea p="4" w="100%" justifyContent="center" alignItems="center">
      {/* Modo oscuro/claro */}
      <Box mb={5} width="80%" flexDirection="row" alignItems="center">
        <Text color={textColor} fontSize="md" flex={1}>
          Modo {text}:
        </Text>
        <Switch
          isChecked={colorMode === "dark"}
          onToggle={toggleColorMode}
          colorScheme="amber"
        />
      </Box>

      {/* Selección de idioma */}
      <Box mb={5} width="80%" justifyContent="space-between" flexDirection="row" alignItems="center">
        <Text color={textColor} fontSize="md">
          Idioma:
        </Text>
        <Select
          selectedValue={language}
          minWidth="200"
          accessibilityLabel="Seleccionar idioma"
          placeholder="Seleccionar idioma"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={itemValue => setLanguage(itemValue)}
        >
          <Select.Item label="Español" value="es" />
          <Select.Item label="English" value="en" />
        </Select>
      </Box>

      {/* Activar notificaciones */}
      <Box mb={5} width="80%" justifyContent="space-between" flexDirection="row" alignItems="center">
        <Text color={textColor} fontSize="md">
          Notificaciones:
        </Text>
        <Icon
          as={<Ionicons name={notificationsEnabled ? "notifications" : "notifications-off"} />}
          size={6}
          color={notificationsEnabled ? "green.500" : "gray.400"}
          onPress={handleNotificationToggle}
        />
      </Box>
    </Box>
  );
}

export default SettingsScreen;
