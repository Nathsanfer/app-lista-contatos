// app/index.js
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    TextInput,
    FlatList,
    Alert,
    StyleSheet,
} from "react-native";

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]); // Lista de tarefas
    const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
    const [newTask, setNewTask] = useState(""); // Texto da nova tarefa
    const [editIndex, setEditIndex] = useState(null); // Índice da tarefa em edição
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);


    const categoriasDisponiveis = ["Família", "Amigos", "Trabalho", "Escola"];

    function toggleCategoria(categoria) {
        if (categoriasSelecionadas.includes(categoria)) {
            setCategoriasSelecionadas(categoriasSelecionadas.filter(c => c !== categoria));
        } else {
            setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
        }
    }


    // Função para adicionar ou editar tarefa
    function addOrEditTask() {
        if (!newTask) return; // Se o campo estiver vazio (sem espaços ou texto), não faz nada

        if (editIndex === null) {
            tasks.push({ nome: newTask, categorias: categoriasSelecionadas });
        } else {
            tasks[editIndex] = { nome: newTask, categorias: categoriasSelecionadas };
        }


        setTasks(tasks); // Atualiza o estado com a lista de tarefas modificada
        setNewTask(""); // Limpa o campo de texto
        setModalVisible(false); // Fecha o modal
    }

    // Função para confirmar exclusão de tarefa
    function confirmDelete(index) {
        Alert.alert("Excluir tarefa?", `Remover "${tasks[index]}"?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    tasks.splice(index, 1); // Remove a tarefa diretamente do array
                    setTasks(tasks); // Atualiza o estado com a lista modificada
                },
            },
        ]);
    }

    // Função para abrir o modal em modo de edição
    function openEditModal(index) {
        setNewTask(tasks[index]); // Carrega o texto da tarefa no campo de edição
        setEditIndex(index); // Define o índice da tarefa a ser editada
        setModalVisible(true); // Abre o modal
    }

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal */}
            <Pressable
                onPress={() => {
                    setNewTask("");
                    setEditIndex(null);
                    setModalVisible(true);
                }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋ Novo Contato</Text>
            </Pressable>

            {/* Lista de tarefas */}
            <FlatList
                data={tasks}
                keyExtractor={(_, i) => String(i)} // Identificador único para cada item
                renderItem={({ item, index }) => (
                    <View style={styles.taskItemContainer}>
                        <View style={styles.taskItemBar} />
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={styles.taskItem}>{item.nome}</Text>
                            <Text style={{ color: "#555", fontSize: 12 }}>
                                Categorias: {item.categorias?.join(", ") || "Nenhuma"}
                            </Text>
                        </View>
                        <View style={styles.taskButtons}>
                            {/* Botões para editar e excluir */}
                            <Pressable
                                onPress={() => openEditModal(index)} // Abre o modal para editar
                                style={[styles.taskButton, styles.editButton]}
                            >
                                <Text style={styles.buttonText}>✏️</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => confirmDelete(index)} // Exclui a tarefa
                                style={[styles.taskButton, styles.deleteButton]}
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

            {/* Modal para adicionar ou editar tarefa */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={{ marginBottom: 8 }}>
                            {editIndex === null
                                ? "Digite o nome do contato:"
                                : "Edite os dados do contato:"}
                        </Text>
                        <TextInput
                            value={newTask} // O valor do campo de texto é controlado pelo estado `newTask`
                            onChangeText={setNewTask} // Atualiza o estado com o novo texto
                            placeholder="Ex: Nome Sobrenome"
                            style={styles.input}
                        />
                        <Text style={{ marginBottom: 4 }}>Categorias:</Text>
                        {categoriasDisponiveis.map((categoria) => (
                            <Pressable
                                key={categoria}
                                onPress={() => toggleCategoria(categoria)}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 6,
                                }}
                            >
                                <View
                                    style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: "#333",
                                        marginRight: 8,
                                        backgroundColor: categoriasSelecionadas.includes(categoria)
                                            ? "#0096c7"
                                            : "#fff",
                                    }}
                                />
                                <Text>{categoria}</Text>
                            </Pressable>
                        ))}

                        <Pressable onPress={addOrEditTask} style={{ marginBottom: 8 }}>
                            <Text style={{ color: "#6200ee", textAlign: "center" }}>
                                {editIndex === null ? "Adicionar" : "Salvar alterações"}
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
    },
    addButton: {
        marginBottom: 16,
        alignSelf: "center",
        backgroundColor: "#0096c7", // Vermelho (Pantone 485)
        padding: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    taskItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        paddingLeft: 0, // Remove o padding à esquerda
        backgroundColor: "#9991", // Azul claro
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden"
    },
    taskItemBar: {
        width: 4, // Largura da barrinha
        height: "100%", // Altura total do container
        backgroundColor: "#0096c7", // Azul
        borderTopLeftRadius: 6, // Bordas arredondadas no topo
        borderBottomLeftRadius: 6, // Bordas arredondadas na base
    },
    taskItem: {
        flex: 1,
        fontSize: 16,
    },
    taskButtons: {
        flexDirection: "row",
    },
    taskButton: {
        marginLeft: 8,
        padding: 6,
        borderRadius: 4,
    },
    editButton: {
        backgroundColor: "#ffca28", // Cor de edição (amarelo)
    },
    deleteButton: {
        backgroundColor: "#f44336", // Cor de exclusão (vermelho)
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        color: "#666",
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro com transparência
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 6,
        marginBottom: 12,
    },
});