<script setup>
import { defineProps} from "vue";
import { RouterLink } from "vue-router";
import { useQuery,useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

// import { GET_USERS_QUERY } from "../components/graphql/graphql-queries.js"
import DeleteUser from "../components/mutation/DeleteUser.vue"

const { user } = defineProps(["user"]);


// const { data, loading: deleteLoading, error, refetch } = useQuery(GET_USERS_QUERY);  //this are mainly used for refetch(), loading method and some of the other method we use deleteLoading here without accpeing from the deleteuser componet 


// const DELETE_USER_MUTATION = gql`
//   mutation DeleteUser($userId: Int!) {       # modify the foreign key constraint on the todos table ON DELETE CASCADE, which would automatically delete all associated todos when a user is deleted.    
//     delete_users_by_pk(id: $userId) {        # unless it will say Foreign key violation. update or delete on table "users" violates foreign key constraint "todos_user_id_fkey" on table "todos"
//       id
//     }
//   }
// `;

// const { mutate } = useMutation(DELETE_USER_MUTATION);

// function deleteUser() {
//   const confirmDelete = confirm("Are you sure you want to delete this user?");
//   if (confirmDelete) {              //The mutate function provided by the useMutation hook is used to execute the mutation operation defined in DELETE_USER_MUTATION
//     mutate({ userId: user.id })    //is used to pass the userId data to the mutation function.
//       .then(() => {                  // 
//         // User deleted successfully
//         // You can perform any additional actions, such as showing a success message
//         console.log("User deleted successfully");
//         refetch(); // Trigger a refetch of the GET_USERS_QUERY to update the user list
//       })
//       .catch((error) => {
//         // Error occurred while deleting the user
//         // You can handle the error and show an appropriate message
//         console.error("Error deleting user:", error);
//       });
//   }
// }
</script>

<template>
  <div class="user-card">
    <img src="../assets/user.png" alt="user_img" />
    <!-- <img  @click="deleteUser" class="delete" src="../assets/delete.png" alt="delete_user_img" /> -->
    <DeleteUser   :userID="user.id"></DeleteUser>
    <div>
      <h2 class="text-lg font-semibold">{{ user.name }}</h2>
      <RouterLink :to="`/users/${user.id}`">
        <button class="bg-rose-700 text-fuchsia-50" @click="hello">Show todos </button>
      </RouterLink>     
    </div>
    <!-- <div class="delete-user" v-if="deleteLoading">Deleting user...</div> -->

  </div>
</template>

<style scoped>

.user-card {
  /* width: 150px; */
  /* height: 150px; */
  background: conic-gradient(from -.5turn at bottom right, deeppink, cyan, rebeccapurple);
  padding: 10px;
  margin: 10px;
  /* border-radius: 15px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-between; */
  margin-right: 20px; 
  margin-left: 20px;
  position: relative;
  @apply  w-52 h-40 flex flex-col justify-between rounded-md
}

.user-card  img{
    /* width: 56px; */
    /* margin: auto; */
    @apply mx-auto w-14
    
}
/* 
.user-card  .delete {
  width: 18px;
 position: absolute;
 right: 8px;
 cursor: pointer;
} */

.user-card h2 {
    text-transform: uppercase;
    text-align: center;
    padding: 5px
    
}

.user-card button {
    padding: 2px 5px;
    display: block;
    margin: auto;
    margin-top: 8px;
    border: 1px solid white;
    border-radius: 5px;
   
}

.delete-user{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
