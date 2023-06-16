<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const ADD_USER_MUTATION = gql`
  mutation AddUser($name: String!) {
    insert_users(objects: [{ name: $name }]) {
      returning {
        id
        name
      }
    }
  }
`;

const { mutate, loading, error } = useMutation(ADD_USER_MUTATION);

const name = ref("");

const emit = defineEmits('close','userAdded_refetch');

function addUser() {
  if (name.value.trim() !== "") {
    mutate({ name: name.value })
      .then(() => {
        name.value = "";
        // Emit an event to notify the parent component that a user has been added and to call function refetch() 
        emit("userAdded_refetch");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  }
}

function closeForm() {
  name.value = "";
  // Emit an event to notify the parent component to close the modal
  emit("close");
}

</script>

<template>
    <div class="modal" style="background-color:black;">
      <h2>Add User Name</h2>
      <input v-model.trim="name" type="text">
      <button @click="addUser" :disabled="loading">Add user</button>
      <button @click="closeForm">Close Form</button>
      <div v-if="loading">Adding user...</div>
      <div v-if="error">{{ error.message }}</div>
    </div>
  </template>
  

<style scoped>

.modal {
  width: 500px;
  background-color: rgb(83, 86, 109);
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
 }

 .modal input{
  padding: 10px;
  border: 2px solid rgb(226, 95, 95);
 }
.modal button{
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: rgb(186, 25, 130);
  border: none;
  color: rgb(62, 57, 57);
  cursor: pointer;
  margin-top: 15px;
}

.modal .close {
  color: rgb(255, 242, 0);
  font-weight: bold;
  background-color: rgb(127, 255, 161);
}
</style>