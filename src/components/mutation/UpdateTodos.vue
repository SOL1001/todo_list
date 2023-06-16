<script setup>
import { ref,watchEffect } from "vue";
import {useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag"; 
import { GET_USERS_QUERY } from "../graphql/graphql-queries.js"


const {  refetch } = useQuery(GET_USERS_QUERY);

const UPDATE_TODO_MUTATION = gql`
mutation UpdateTodo($todoId: Int!, $userId: Int!, $title: String!) {
  update_todos(where: {id: {_eq: $todoId}, user_id: {_eq: $userId}}, _set: {title: $title}) {
    affected_rows
    returning {
      title
    }
  }
}
`;

const { mutate, loading, error } = useMutation(UPDATE_TODO_MUTATION);

const { todoId, userId } = defineProps({
    todoId: Number,
    userId: Number,
});

const title = ref("");
const emit = defineEmits(['updatetodo_refetch', 'closeForm']);  // or const emit = defineEmits('addtodo_Refetch','close');


watchEffect(() => {
  console.log("UpdateTodos component received todoId prop value:", todoId);
});

function updateTodo() {
  console.log("Updating todo with todoId:", todoId, "and userId:", userId);
  if (todoId && userId && title.value.trim() !== "") {
    mutate({
      todoId: todoId,
      userId: userId,
      title: title.value.trim(),
    })
      .then(() => {
        refetch();
        emit("updatetodo_refetch");
        closeForm();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  }
}

function closeForm() {
   title.value = "";
  // Emit an event to notify the parent component to close the modal
  emit("closeForm");
}
</script>


<template>
      <div class="modal">
      <h2>Update Todo List</h2>
      <input v-model.trim="title" type="text">
      <button @click="updateTodo" :disabled="loading">Update Todo</button>
      <button @click="closeForm">Close Form</button>
      <div v-if="loading">updating todo...</div>
      <div v-if="error">{{ error.message }}</div>
    </div>
</template>

<style scoped>

.modal {
  width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
 }

 .modal input{
  padding: 10px;
  border: 2px solid black;
 }
.modal button{
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: blueviolet;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
}

.modal .close {
  color: red;
  font-weight: bold;
  background-color: aquamarine;
}

</style>