<script setup>
import { defineProps,ref, watchEffect } from "vue";
import { useQuery,useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";




// Define the mutation
const ADD_TODO_MUTATION = gql`
  mutation AddTodo($userId: Int!, $title: String!) {
    insert_todos(objects: [{ user_id: $userId, title: $title }]) {
      returning {
        id
        title
        user_id
      }
    }
  }
`;

// Use the mutation
const { mutate: addTodo, loading: addTodoLoading, error: addTodoError } = useMutation(ADD_TODO_MUTATION);

const {userId} = defineProps(['userId']);     // wer accpeing the userId
const title = ref('');

const emit = defineEmits(['addtodo_Refetch', 'closeForm']);  // or const emit = defineEmits('addtodo_Refetch','close');



// Add Todo method
function AddTodo() { 
  // Perform validation if needed   if (title.value.trim() !== "")

  // Call the mutation  addTodo is the alias for the mutation function. if you want you can use mutate
  addTodo({ userId: userId, title: title.value })
    .then(() => {
      // Todo added successfully
      // You can perform additional actions, such as showing a success message or refetching the todos(in this case we are passing to the parent compoment)
      title.value = "";
      emit("addtodo_Refetch")
    })
    .catch((error) => {
      // Error occurred while adding the todo
      // You can handle the error and show an appropriate message
      console.error("Error adding todo:", error);
    });
}

function closeForm() {
  title.value = "";
  // Emit an event to notify the parent component to close the modal
  emit("closeForm");
}

</script>


<template>
     <div class="modal">
      <h2>Add Todo List</h2>
      <input v-model.trim="title" type="text">
      <button @click="AddTodo" :disabled="addTodoLoading">Add Todo</button>
      <button @click="closeForm">Close Form</button>
      <div v-if="addTodoLoading">Adding todo...</div>
      <div v-if="addTodoError">{{ addTodoError.message }}</div>
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