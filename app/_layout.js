// app/_layout.js
import React from "react";
import { Stack } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" }, // Cor vermelha da paleta (Pantone 485)
        headerTintColor: "#fff", // Cor do texto no cabeçalho (branco)
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Contact Keeper",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings")} // Navegação para a tela de configurações
              style={styles.gearButton}
            >
              <Text style={styles.gearText}>⚙️</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "⚙️ Configurações" }} // Título para a tela de configurações
      />
    </Stack>
  );
}

// Estilos aplicados
const styles = StyleSheet.create({
  gearButton: {
    marginRight: 16, // Espaçamento para o ícone de configurações
  },
  gearText: {
    color: "#fff", // Cor do ícone de configurações (branco)
    fontSize: 18, // Tamanho do texto
  },
});