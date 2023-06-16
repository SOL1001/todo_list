<script setup>
import { ref, watchEffect } from "vue";
import { useQuery,useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";

import AddTodos from '../components/mutation/AddTodos.vue'
import DeleteTodos from "../components/mutation/DeleteTodos.vue";
import UpdateTodos from "../components/mutation/UpdateTodos.vue";

const { result, refetch } = useQuery(gql`
  query MyQuery {
    users {
      id
      name
      todos {
        id
        title
        user_id
      }
    }
  }
`);

const users = ref(result.value ? result.value.users : []);

const route = useRoute();

const userID = ref(parseInt(route.params.id));

const selectedUser = ref(null);

watchEffect(() => {
  if (result.value && result.value.users) {
    users.value = result.value.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        todos: user.todos.map((todo) => {
          return {
            id: todo.id,
            user_id: todo.user_id,
            title: todo.title,
          };
        }),
      };
    });

    selectedUser.value = users.value.find((user) => user.id === userID.value);
  }
});



const showModal = ref(false)
const showModalAddTodo = ref(false)
// const showModalUpdateTodo = ref(false)
const selectedTodoId = ref(null);

function showModals(modalType,todoId){
    if(modalType === 1){
      showModalAddTodo.value = true;
      // showModalUpdateTodo.value = false;
    }else if(modalType === 2){
      showModalAddTodo.value = false;
      // showModalUpdateTodo.value = true;
      selectedTodoId.value = todoId;
      console.log(  selectedTodoId.value, todoId);
    }
    showModal.value =!showModal.value
}



function closeForm() {
  showModal.value =!showModal.value
}

</script>

<template>
  <!-- <h1 class="text-center m-10 text-4xl">hello user wellcome </h1> -->
  <main>
    
    <div v-show="showModal" class="overlay">                                                                                        <!-- here we are using the :userId props to send the userID to the child componet and-->
      <AddTodos  v-if="showModalAddTodo" :userId="userID" @addtodo_Refetch="refetch()" @closeForm="closeForm"></AddTodos>  <!--and accpting the emitted addtodo_Refetch and closeForm from the child componet to notify the parent componet -->
      <template v-else-if="selectedTodoId">
      <UpdateTodos  :userId="userID" :todoId="selectedTodoId"  @updatetodo_refetch="refetch()" @closeForm="closeForm"></UpdateTodos>  
    </template>
    </div>
    
    <header>
        <h2>add todo</h2>
        <img @click="showModals(1)" src="../assets/menu.png" alt="menu-img" class="menu-img">
    </header>

    <div class="container">

      <div class="user-card">
        <img src="../assets/user.png" alt="user_img" />
        <h2 class="text-lg font-semibold">{{ selectedUser &&  selectedUser.name }}</h2>
        <!-- <h2 class="text-lg font-semibold">{{ selectedUser.name }}</h2> -->
        <ul>
          <li v-for="todo in selectedUser && selectedUser.todos" :key="todo.id">
            <!-- <li v-for="todo in  selectedUser.todos" :key="todo.id">{{ todo.title }}</li> -->
            {{ todo.title }} 
            <img class="edit-todo" src="../assets/edit-pen.png" @click="showModals(2,todo.id)">
            <!-- <img class="delete" src="../assets/delete.png" @click="deleteTodoItem(selectedUser.id, todo.id)"> -->
          <DeleteTodos  :userId="selectedUser.id" :todoId="todo.id"  @deletetodo_refetch="refetch()"></DeleteTodos>
          </li> 
          <RouterLink :to="{ name: 'home' }" style="color: red; text-decoration-line: underline;">Go Back</RouterLink>
        </ul>
      </div>

    </div>

  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  /* @apply w-screen h-screen */
}

main .container {
  max-width: 1000px;
  margin: auto; 
  /* margin-top: 2px; */
  /* padding: 10px; */
   
  /* @apply  mx-auto px-10; */
}


.user-card {
  width: 150px;
  height: 500px;
  background: conic-gradient(from .5turn at bottom center, lightblue, white);
  padding: 10px;
  margin-top: 10px;
  /* border-radius: 15px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* margin-right: 20px;
  margin-left: 20px; */
  @apply w-full  flex flex-col space-y-10 rounded-md shadow-lg shadow-indigo-500/50;
}

.user-card img {
  /* width: 56px; */
  /* margin: auto; */
  @apply mx-auto w-36;
}

.user-card h2 {
  text-transform: uppercase;
  text-align: center;
  padding: 5px;
  font-size: 2rem;
  /* color: white; */
}

.user-card ul{
  text-align: center;
  width: 100%;
}

.user-card ul li{
  position: relative;
  text-transform: uppercase;
  /* text-align: center; */
  @apply text-2xl p-2 pl-4 m-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 
}

.user-card ul li .edit-todo {
  width: 20px;
  position: absolute;
  top: 30%;
  right: 60px;
 cursor: pointer;
}
/* .user-card ul li .delete {
  width: 18px;
  position: absolute;
  top: 30%;
  right: 20px;
 cursor: pointer;
}
*/


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



header {
  display: flex;
  /* align-items: end; */
  text-align: center;
}

header h2{
  text-align: center;
  padding-top: 10px;
  padding-left: 28%;
  text-transform: capitalize;
  font-size: 1.5rem;
  
}

header img{
  position: absolute;
  top: 0;
  right: 20%;
  margin: 10px;
  text-align: end;
  width: 35px;
 
}
</style>



<!--
1 result.value.users is an array of users obtained from the GraphQL query response.
2 By using the map function on result.value.users, we iterate over each user object.
3 For each user object, we create a new object that contains the desired properties (id, name, and todos).
4 Inside the todos property, we use the map function again to iterate over each todo object of the current user.
5 We create a new object for each todo object, including the desired properties (id, user_id, and title).
6 The transformed user object, with the updated todos array, is returned for each user.
7 The resulting array of transformed user objects is assigned to users.value.

The purpose of this mapping is to structure the data in a way that is more convenient for the template to iterate over and display.
It allows you to access the properties of each user and their associated todos easily within the template.

So, the map function is used here to transform the data structure and create a new array of objects that suits the specific requirements of the template -->