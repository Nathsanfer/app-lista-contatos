import React, { useState } from "react";
import { Chip } from "react-native-paper";
import { View, Text, Pressable, Modal, TextInput, FlatList, Alert, StyleSheet } from "react-native";

export default function HomeScreen() {
    // Lista de contatos
    const [contacts, setContacts] = useState([]);

    // Controle do modal (visível ou não)
    const [modalVisible, setModalVisible] = useState(false);

    // Dados do novo contato
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Índice do contato que está sendo editado (ou null se for novo)
    const [editIndex, setEditIndex] = useState(null);

    // Lista de categorias disponíveis
    const availableCategories = ["Família", "Amigos", "Trabalho", "Escola"];

    // Alterna seleção de categorias
    function toggleCategory(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    // Função para adicionar ou editar um contato
    function addOrEditContact() {
        if (!contactName || !contactPhone) return; // Se o campo estiver vazio não faz nada

        const newContact = {
            nome: contactName,
            telefone: contactPhone,
            categorias: selectedCategories
        };

        if (editIndex === null) {
            // Selecionar novo contato (cópia do array atual)
            setContacts([...contacts, newContact]);
        } else {
            // Editar contato existente
            const updatedContacts = [...contacts];
            updatedContacts[editIndex] = newContact;
            setContacts(updatedContacts);
        }

        // Limpar campos e fechar modal
        setContactName("");
        setContactPhone("");
        setSelectedCategories([]);
        setEditIndex(null);
        setModalVisible(false);
    }

    // Confirmação antes de excluir um contato
    function confirmDelete(index) {
        Alert.alert("Excluir contato?", `Remover "${contacts[index].nome}"?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    const updated = contacts.filter((_, i) => i !== index);
                    setContacts(updated);
                },
            },
        ]);
    }

    // Abre o modal preenchendo os dados para edição
    function openEditModal(index) {
        const contact = contacts[index];
        setContactName(contact.nome);
        setContactPhone(contact.telefone);
        setSelectedCategories(contact.categorias || []);
        setEditIndex(index);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            {/* Botão para adicionar novo contato */}
            <Pressable
                onPress={() => {
                    setContactName("");
                    setContactPhone("");
                    setSelectedCategories([]);
                    setEditIndex(null);
                    setModalVisible(true);
                }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋ Novo Contato</Text>
            </Pressable>

            {/* Lista de contatos */}
            <FlatList
                data={contacts}
                keyExtractor={(_, i) => String(i)}
                renderItem={({ item, index }) => (
                    <View style={styles.contactItemContainer}>
                        <View style={styles.contactItemBar} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.contactItem}>{item.nome}</Text>
                            <Text style={{ color: "#333", fontSize: 14 }}>
                                📞 {item.telefone}
                            </Text>
                            <Text style={{ color: "#555", fontSize: 12 }}>
                                Categorias: {item.categorias?.join(", ") || "Nenhuma"}
                            </Text>
                        </View>
                        <View style={styles.contactButtons}>
                            <Pressable
                                onPress={() => openEditModal(index)}
                                style={[styles.contactButton, styles.editButton]}
                            >
                                <Text style={styles.buttonText}>✏️</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => confirmDelete(index)}
                                style={[styles.contactButton, styles.deleteButton]}
                            >
                                <Text style={styles.buttonText}>🗑️</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
                }
            />

            {/* Modal para adicionar/editar contato */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: "500" }}>
                            {editIndex === null ? "Digite o nome do contato:" : "Edite os dados do contato:"}
                        </Text>

                        {/* Campo Nome */}
                        <TextInput
                            value={contactName}
                            onChangeText={setContactName}
                            placeholder="Nome do contato"
                            style={styles.input}
                        />

                        {/* Campo Telefone */}
                        <TextInput
                            value={contactPhone}
                            onChangeText={setContactPhone}
                            placeholder="Telefone"
                            keyboardType="phone-pad"
                            style={styles.input}
                        />

                        {/* Título das categorias */}
                        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Categorias:</Text>

                        {/* Chips de categorias */}
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
                            {availableCategories.map((categoria) => (
                                <View key={categoria} style={{ marginRight: 8, marginBottom: 8 }}>
                                    <Chip
                                        mode="outlined"
                                        selected={selectedCategories.includes(categoria)}
                                        onPress={() => toggleCategory(categoria)}
                                        selectedColor="#4f46e5"
                                        style={{
                                            borderColor: selectedCategories.includes(categoria)
                                                ? "#4f46e5"
                                                : "#cbd5e1",
                                            backgroundColor: selectedCategories.includes(categoria)
                                                ? "#e0e7ff"
                                                : "#fff",
                                        }}
                                        textStyle={{
                                            fontWeight: "500",
                                        }}
                                    >
                                        {categoria}
                                    </Chip>
                                </View>
                            ))}
                        </View> 

                         

                        {/* Botões de ação */}
                        <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
                            <Text style={{ color: "#6200ee", textAlign: "center" }}>
                                {editIndex === null ? "Adicionar" : "Salvar"}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{ color: "#999", textAlign: "center" }}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f2f6fc",
    },
    addButton: {
        marginBottom: 20,
        alignSelf: "center",
        backgroundColor: "#4f46e5",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
    },
    contactItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        paddingLeft: 0,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    contactItemBar: {
        width: 6,
        height: "100%",
        backgroundColor: "#4f46e5",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    contactItem: {
        fontSize: 17,
        fontWeight: 600,
        color: "#1f2937",

    },
    contactButtons: {
        flexDirection: "row",
    },
    contactButton: {
        marginLeft: 10,
        padding: 8,
        borderRadius: 6,
    },
    editButton: {
        backgroundColor: "#ffca28",
    },
    deleteButton: {
        backgroundColor: "#f44336",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#6b7280",
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContent: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        padding: 10,
        borderRadius: 8,
        marginBottom: 14,
        backgroundColor: "#f9fafb",
    },
});