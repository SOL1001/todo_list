<script setup>
import { defineProps} from "vue";
// import { useRouter, RouterLink } from "vue-router";
import { useQuery,useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

import { GET_USERS_QUERY } from "../graphql/graphql-queries.js"


// const { user } = defineProps(["user"]);

const { data, loading: deleteLoading, error, refetch } = useQuery(GET_USERS_QUERY);


const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: Int!) {       # modify the foreign key constraint on the todos table ON DELETE CASCADE, which would automatically delete all associated todos when a user is deleted.    
    delete_users_by_pk(id: $userId) {        # unless it will say Foreign key violation. update or delete on table "users" violates foreign key constraint "todos_user_id_fkey" on table "todos"
      id
    }
  }
`;

const { mutate } = useMutation(DELETE_USER_MUTATION);

const props = defineProps(['userID']);   // you can also use the desturing {userID} method 

function deleteUser() {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
 
  if (confirmDelete) {              //The mutate function provided by the useMutation hook is used to execute the mutation operation defined in DELETE_USER_MUTATION
    mutate({ userId: props.userID })    //is used to pass the userId data to the mutation function.
      .then(() => {                  // 
        // User deleted successfully
        // You can perform any additional actions, such as showing a success message
        console.log("User deleted successfully");
        refetch(); // Trigger a refetch of the GET_USERS_QUERY to update the user list   this is a method found in useQuery
      })
      .catch((error) => {
        // Error occurred while deleting the user
        // You can handle the error and show an appropriate message
        console.error("Error deleting user:", error);
      });
  }
}
</script>

<template>
    <div>
        <img  @click="deleteUser" class="delete" src="../../assets/delete.png" alt="delete_user_img" />
        <div class="delete-user" v-if="deleteLoading">Deleting user...</div>
    </div>
</template>

<style scoped>
 .delete {
 width: 18px;
 position: absolute;
 top: 11px;
 right: 8px;
 cursor: pointer;
}
</style>