// app/settings.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Configurações</Text>

      {/* Tema escuro */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Tema escuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#ccc", true: "#4f46e5" }}
          thumbColor={darkMode ? "#fff" : "#fff"}
        />
      </View>

      {/* Notificações */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#ccc", true: "#4f46e5" }}
          thumbColor={notificationsEnabled ? "#fff" : "#fff"}
        />
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o app</Text>
        <Text style={styles.aboutText}>
          Aplicativo de contatos pessoais desenvolvido em React Native.
          Versão 1.0.0
        </Text>
      </View>

      {/* Botão de "Sair" */}
      <Pressable
        onPress={() => Alert.alert("Sair", "Você clicou em sair.")}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>🚪 Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  settingText: {
    fontSize: 16,
    color: "#111827",
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1f2937",
  },
  aboutText: {
    fontSize: 14,
    color: "#6b7280",
  },
  logoutButton: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
