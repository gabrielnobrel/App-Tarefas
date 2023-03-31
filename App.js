import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import {
  ref,
  push,
  set,
  onValue,
  remove,
  child,
  update,
} from "firebase/database";
import { AntDesign } from "@expo/vector-icons";

import database from "./src/firebaseConnection";
import TaskList from "./src/TaskList";

console.disableYellowBox = true;

export default function App() {
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = ref(database, "tarefas");
      await onValue(tasksRef, (snapshot) => {
        const tasksList = [];
        snapshot.forEach((childSnapshot) => {
          tasksList.push({
            key: childSnapshot.key,
            nome: childSnapshot.val().nome,
          });
        });
        setTasks(tasksList);
      });
    }

    loadTasks();
  }, []);

  async function handleAdd() {
    if (newTask !== "") {
      //Edição de tarefa
      if (key !== "") {
        const tarefas = ref(database, "tarefas");
        await update(child(tarefas, key), {
          nome: newTask,
        });

        Keyboard.dismiss();
        setNewTask("");
        setKey("");
        return;
      }

      // let tarefas = await database.database().ref("tarefas");
      // let chave = tarefas.push().key;

      // tarefas.child(chave).set({
      //   nome: newTask,
      // });

      const tarefas = ref(database, "tarefas");
      const chave = push(tarefas);
      await set(chave, {
        nome: newTask,
      });

      Keyboard.dismiss();
      setNewTask("");
    }
  }

  async function handleDelete(key) {
    const tarefas = ref(database, "tarefas");
    await remove(child(tarefas, key));
  }

  function handleEdit(data) {
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey("");
    setNewTask("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      {key.length > 0 && (
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <TouchableOpacity>
            <AntDesign
              name="closecircleo"
              size={20}
              color="#ff0000"
              onPress={cancelEdit}
            />
          </TouchableOpacity>

          <Text style={{ marginLeft: 5, color: "#FF0000" }}>
            Você estáditando uma tarefa
          </Text>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          underlineColorAndroid="transparent"
          onChangeText={(texto) => {
            setNewTask(texto);
          }}
          value={newTask}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  },

  containerTask: {
    flexDirection: "row",
  },

  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 40,
    fontSize: 17,
  },

  buttonAdd: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: "#121212",
    marginLeft: 5,
  },

  buttonText: {
    fontSize: 23,
    color: "#fff",
  },
});
