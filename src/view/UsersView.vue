<script setup>
import { ref, watchEffect } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

import UserCard from "../components/UserCard.vue";
import AddUserForm from "../components/mutation/AddUserForm.vue";

const { result, refetch } = useQuery(gql`
  query getUsers {
    users {
      id
      name
    }
  }
`);


const users = ref(result.value ? result.value.users : []);


// Update users when the result value changes
watchEffect(() => {
  users.value = result.value ? result.value.users : [];
  // const emoji = emojiFlags.userCode(user.code)?.emoji || '';
});

const search = ref("");
watchEffect(() => {
  if (result.value && result.value.users) {
  users.value = result.value.users.filter(user => user.name.toLowerCase().includes(search.value.toLowerCase()))
  }
})

// const ADD_USER_MUTATION = gql`
//   mutation AddUser($name: String!) {
//     insert_users(objects: [{ name: $name }]) {
//       returning {
//         id
//         name
//       }
//     }
//   }
// `;

 const showModal = ref(false);
// const name = ref("");

// const { mutate, loading, error } = useMutation(ADD_USER_MUTATION);

// function closeNote() {
//   showModal.value = false;
//   name.value = "";
// }

// function addUser() {
//   if (name.value.trim() !== "") {
//     mutate({ name: name.value })
//       .then(() => {
//         // console.log("User added successfully!");
//         name.value = "";
//         showModal.value = false;
//         refetch()  // Trigger a refetch of the getUsers query
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//       });
//       // console.log(name.value);
//   }
// }

</script>

<template>
  <main>

    <div v-show="showModal" class="overlay">
      <!-- <div class="modal">
        <h2>Add User Name</h2>
        <input v-model="name" type="text">
        <button @click="addUser" :disabled="loading">Add user</button>
        <button @click="closeNote">close From</button>
        <div v-if="loading">Adding user...</div>
        <div v-if="error">{{ error.message }}</div>
      </div> -->
      <AddUserForm @close="showModal = false" @userAdded_refetch="refetch(),showModal = false" />
    </div>

    <div class="container"  style="background-color:grey;">
     
    <header>
      <h1 style="color:chartreuse;">Viwe user info Or Add a user</h1><br> 
       <input v-model.trim="search" type="text" placeholder="search..."> 
       <button @click="showModal =!showModal">+</button>
    </header>

    <div class="user-contianer">
      <UserCard v-for="user in users" :key="user.id" :user="user"/>
    </div>

    </div>
  </main>
</template>

<style scope>

main {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
}

main .container {
  max-width: 1000px;
  border: 1px solid black;
  border-top: none;
  border-bottom: none;
  /* padding: 10px;
  margin: 0 auto;    */
  @apply  mx-auto px-10;
}

header {
    position: relative;
    @apply flex items-center justify-center mb-8
}
header h1 {
    @apply  text-2xl font-bold mb-4  pr-10
}

header input {
    width: 300px;
   @apply  py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 
}

header button {
position: absolute;
right: 3px;
width: 40px;
height: 40px;
cursor: pointer;
background-color: rgb(21, 20, 20);
border-radius: 50%;
color: white;
font-size: 1.3rem;
}


.user-contianer{   
    @apply flex  justify-center items-center flex-wrap gap-5 ;  
}

.overlay{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
 }
/* 
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
} */

</style>
