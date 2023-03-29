<template>
  <div class="home">
    <button @click="clearHistory">Clear All </button>
    <div class="container todo-list-wrapper">
      <section class="section sidebar-section">
        <button id="addbutton" @click="modal_add_task= !modal_add_task" >Add Task</button>
        <hr>
        <!-- Task Component -->
        <task-component :taskItems="taskItems" />
      </section>
      <section class="section content-section">
        <nav class="nav-hearder-board">
          <div class="nav-left">
            Board
          </div>
          <div class="nav-right">
            <div class="btn-add-list" @click="createNewList">+ Add another list</div>
          </div>
        </nav>  
        
        <hr>
        <!-- List Component -->
        <list-component  />
      </section>
    </div>
    <create-task-modal v-if="modal_add_task"
    @addTask="addTask($event)"
    @closeModal="modal_add_task= !modal_add_task"
    />
  </div>
</template>

<script>
import Task from './partial/Task.vue'
import List from './partial/List.vue'
import CreateTaskModal from './modal/CreateTask.vue'
export default {
  data() {
    return {
      taskItems:[],
      modal_add_task: false,
      task_component: 0,
    }
  },
  components: {
    'task-component': Task,
    'list-component': List,
    'create-task-modal': CreateTaskModal,
  },
  mounted() {
    this.taskItems= this.getTaskItems();
  },
  methods: {
    createNewList() {
    },
    // Adding tasks to the list
    // If task is empty, return alert with message "Please write a task"
    addTask(newTask) {
      console.log('add task Home');
      console.log(newTask);
        const currentDate = new Date(); 
        console.log(currentDate);
        this.taskItems.push({ 
          title: newTask.task_title,
          short_description: newTask.task_desciption,
          title_color: newTask.task_title_color,
          background_color: newTask.task_background_color,
          description_color: newTask.task_description_color,
          colorPickerDialog: false,
          date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`, // get dateformat dd-m-yy
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}`, // get time format o:m
          status: "to do", 
          done: false,
        });
        localStorage.setItem('todo-List', JSON.stringify(this.taskItems));

        this.$toast.open({ 
          message: 'Your task added', 
          type: 'success', 
          position: 'bottom' 
        }); 
      
    },
    // Deleting tasks from the list and from de LocalStorage
    deleteTask(index) {
      this.taskList.splice(index, 1);
      this.saveData(this.taskList);
    },
    // Initialisation of data
    getTaskItems() {
      const data = localStorage.getItem('todo-List');
      return JSON.parse(data) || [];
    },
    clearHistory() {
      // Réinitialiser le LocalStorage
    localStorage.clear();
    // Refresh page
    location.reload();
    },
  },
}
</script>


<style>
/* Global CSS */
.home h1, .home  h2, .home  h3, .home  h4, .home  h5, .home  h6 {
  margin-bottom: 0;
}
.home hr {
  margin: 0.5em 0;
}



/* Add Tasks */
.task-item {
  background: #ccc;
  border-radius: 0.5em;
  padding: 1em;
  margin-top: 0.5em;
  text-align: left;
}
.task-nav {
  display: flex; 
  justify-content: space-between;
} 





.nav-hearder-board {
  display: flex;
  justify-content: space-between;
}
  .home .todo-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 90vh;
  }
  .section {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 8px;
  }
  .sidebar-section {
    flex-basis: 25%;
  }
  .content-section {
    flex-basis: 70%;
    overflow: auto;
  }



  .lists-section {
    display: flex;
    flex-wrap: nowrap;
    gap: 1em;
    overflow: auto;
    padding: 1em;
    height: 90%;
  }
  .list-item {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    min-width: 200px;
    border-radius: 8px;
    height: max-content;
    padding: 1em;
  }





  @media (max-width: 768px) {
    .column {
      flex-basis: 100%;
      order: 3;
    }
  }
</style>