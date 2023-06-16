<script setup>  
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($userId: Int!, $todoId: Int!) {
    delete_todos(where: { id: { _eq: $todoId }, user_id: { _eq: $userId } }) {
      affected_rows
      returning {
        id
        title
      }
    }
  }
`;

const { mutate: deleteTodo, loading} = useMutation(DELETE_TODO_MUTATION);

const successMessage = ref(""); // Reactive variable for success message 
const deletingTodo = ref(false); // Reactive variable for loading state insteady of the return peroperty of the useMutation hook

const { userId, todoId } = defineProps({
    userId: Number,
    todoId: Number,
});

const emit = defineEmits(['deletetodo_refetch']);

/*Here, $userId and $todoId are the variables defined in the mutation.
 so this mutation definition expects these variables to be passed with the corresponding names when executing the mutation in deleteTodo(i.e aliasing of mutate).
Then, in the deleteTodo executing the mutation , you can pass the variables using the same names(userId,todoId):
or 
 we explicitly pass    deleteTodo({ userId: userId, todoId: todoId }) like this 
 */

function deleteTodoItem() {      // i can pass it like this insteady of doing with object property liek the other i did
  deletingTodo.value = true; // Set loading state
  deleteTodo({ userId, todoId })
    .then(() => {
      // Todo deleted successfully
      // successMessage.value = "Todo deleted successfully";
      emit('deletetodo_refetch')
    })
    .catch((error) => {
      // Error occurred while deleting the todo
      console.error("Error deleting todo:", error);
      successMessage.value = "Failed to delete todo";
    })
    .finally(() => {
      deletingTodo.value = false; // Reset loading state
    });
}

</script>


<template>
    <div>
        <img class="delete" src="../../assets/delete.png" @click="deleteTodoItem()">
        <div class="message">
           <div v-if="deletingTodo">Deleting todo...</div>
            <div v-if="successMessage">{{ successMessage }}</div>
        </div>

      </div>
   
</template>


<style scoped>
.delete {
  width: 18px;
  position: absolute;
  top: 30%;
  right: 20px;
 cursor: pointer;
}

.message{
    position: absolute;
    top: 0;
    color: black;
    font-size: 1rem;
    text-decoration: none;
    
}

</style>