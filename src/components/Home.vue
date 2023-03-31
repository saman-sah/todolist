<template>

  <div class="home" id="todolist">
    <header class="header-todo-list">
      <nav class="action-buttons">
          <button class="btn btn-primary" id="addbutton" @click="modal_add_task= !modal_add_task" >Add Task</button>
          <button class="btn btn-secondary" @click="clearHistory">Clear All Tasks</button>
      </nav>
    </header>
    <div class="todo-list-wrapper">
      <section class="section content-section">
        <nav><h4>TO DO in Long Time</h4></nav>   
        <hr>
      </section>


      <section class="section content-section drop-zone" 
      @drop="onDrop($event, 1)" 
      @dragenter.prevent 
      @dragover.prevent>
        <nav><h4>TO DO</h4></nav>      
        <hr>

        <!-- Task Component -->
        <task-component 
        :taskItems="dataItems(1)" 
        @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>


      <section class="section content-section drop-zone" 
      @drop="onDrop($event, 2)" 
      @dragenter.prevent 
      @dragover.prevent>
        <nav><h4>IN PROGRESS</h4></nav>
        <hr>

        <task-component 
        :taskItems="dataItems(2)" 
        @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>


      <section class="section content-section drop-zone"  
      @drop="onDrop($event, 3)" 
      @dragenter.prevent 
      @dragover.prevent>
        <nav><h4>Done</h4></nav>  
        <hr>

        <task-component 
        :taskItems="dataItems(3)" 
        @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>
    </div>
    
    <create-task-modal v-if="modal_add_task"
    :update_task_item="update_task_item"
    @addTask="addTask($event)"
    @closeModal="closeModal()"
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
      update_task_item: null,
      
    }
  },
  components: {
    'task-component': Task,
    'list-component': List,
    'create-task-modal': CreateTaskModal,
  },
  computed: {
    
  },
  mounted() {
    this.taskItems= this.getTaskItems();    
  },
  methods: {
    dataItems(status) {
      return this.taskItems.filter((item) => item.status == status)
    },
    startDrag(evt, item, index) {      
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.task_id)
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      let item = null;
      let indexItem= null;
      this.taskItems.find((el, index) => {
        console.log('forech');
        console.log(el);
        console.log(index);
        if(el.task_id == itemID){
          item=el;
          indexItem= index
        }
      })
      if(item){
        item.status = list;
      }
      this.updateTask(item, indexItem)
    },

    // Adding tasks to the list    
    addTask(newTask) {
      console.log('add task Home');
      console.log(newTask);
        const currentDate = new Date(); 
        console.log(currentDate);
        this.taskItems.push({ 
          task_id: newTask.task_id,
          task_title: newTask.task_title,
          task_desciption: newTask.task_desciption,
          task_title_color: newTask.task_title_color,
          task_background_color: newTask.task_background_color,
          task_description_color: newTask.task_description_color,
          date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`, // get dateformat dd-m-yy
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}`, // get time format o:m
          status: newTask.status,
        });
        localStorage.setItem('todo-List', JSON.stringify(this.taskItems));
        this.modal_add_task = !this.modal_add_task;
        this.$toast.open({ 
          message: 'Your task added', 
          type: 'success', 
          position: 'bottom' 
        });
        localStorage.setItem('laset-ID', newTask.task_id);
    },
    // Deleting tasks 
    deleteTask(index) {
      if (window.confirm('Are you sure to delete this task?'))
      {
          this.taskItems.splice(index, 1);
          localStorage.setItem('todo-List', JSON.stringify(this.taskItems));
      }
      else
      {
        console.log('Discard');
        console.log(index);
      }      
    },
    
    showModalUpdateTask(task) {
      this.update_task_item= task;
      this.modal_add_task = !this.modal_add_task;    
    },
    updateTask(task, index) {
      this.taskItems[index] = task;
      localStorage.setItem('todo-List', JSON.stringify(this.taskItems));
      this.modal_add_task = false;
      this.taskItems= this.getTaskItems();
    },
    // Init data
    getTaskItems() {
      const data = localStorage.getItem('todo-List');
      return JSON.parse(data) || [];
    },
    clearHistory() {
      // Clear LocalStorage
      localStorage.clear();
      // Refresh page
      location.reload();
    },
    closeModal() {
      this.update_task_item= null;
      this.modal_add_task = !this.modal_add_task;
    }
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
#todolist button {
  font-size: 14px;
  max-height: 38px;
}
#todolist .btn-primary {
  background-color: #e62020;
  border: none;
}
#todolist .btn-secondary {
  background-color: #dcfc3c;
  border: none;
  color: #545454;
}



/* Add Tasks */
.task-item {
  background: #ccc;
  border-radius: 1em;
  padding: 1em;
  margin-top: 0.5em;
  text-align: left;
}
.task-nav,
.action-buttons {
  display: flex; 
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.action-buttons button {
  padding:1em 4em;
  display: flex;
  align-items: center;
  border-radius: 1em;
}




.content-section > nav {
  height: 40px;
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
    padding: 1em;
    border: 1px solid black;
    border-radius: 1em;
  }
  .content-section {
    flex-basis: 20%;
  }
  .header-todo-list {
    display: flex;
    justify-content: space-between;
    background: #cccccc2d;
    padding: 1em;
    border-radius: 1em;
    min-height: 70px;
    align-items: center;width: 83%;
    margin: auto;
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
    border-radius: 1em;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    min-width: 200px;
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