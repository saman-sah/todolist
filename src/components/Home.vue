<template>
  <div class="home">
    <div class="container todo-list-wrapper">
      <section class="section sidebar-section">
        <input type="text" placeholder="Enter your task here" ref="input_title_task" v-model="task_title">
        <textarea name="task_short_desciption" id="task_short_desciption" cols="30" rows="10" v-model="task_short_desciption"></textarea>
        <button id="addbutton" @click="addTask" >Add Task</button>
        <hr>
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
        <list-component  />
      </section>
    </div>
  </div>
</template>

<script>
import Task from './partial/Task.vue'
import List from './partial/List.vue'
export default {
  data() {
    return {
      // Task Data
      taskItems:[],
      task_title: '',
      task_short_desciption:'',
      title_color:'',
      background_color:'',
      short_description_color:''


      // List Data
    }
  },
  components: {
    'task-component': Task,
    'list-component': List,
  },
  mounted() {
    this.taskItems= this.getTaskItems();
  },
  methods: {
    createNewList() {
    },
    addTask() {
      console.log('task wrapper');
      if(this.task_title=='') {
        this.$toast.open({ 
          message: 'Enter your task title', 
          type: 'warning', 
          position: 'bottom' 
        }); 
      }else {

        const currentDate = new Date(); 
        console.log(currentDate);
        this.taskItems.push({ title: this.task_title,
          short_description: this.task_short_desciption,
          done: false,
          title_color: this.title_color,
          colorPickerDialog: false,
          status: "to do", 
          date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`, // get dateformat dd-m-yy
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}` // get time format o:m
        });
        this.task_title = '';
        this.task_short_desciption = '';
        // console.log('JSON.stringify(this.taskItems)');
        // console.log(this.taskItems);
        // console.log(JSON.stringify(this.taskItems));
        // var data=JSON.stringify(this.taskItems);
        
        // console.log(JSON.parse(data));
        localStorage.setItem('todo-List', JSON.stringify(this.taskItems));




        this.$toast.open({ 
          message: 'Your task added', 
          type: 'success', 
          position: 'bottom' 
        }); 
      }
      
    },
    // Initialisation of data
    getTaskItems() {
      const data = localStorage.getItem('todo-List');
      return JSON.parse(data) || [];
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