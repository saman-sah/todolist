<template>

  <div class="home" id="todolist">
    <header class="header-todo-list">
      <nav class="action-buttons">
          <button class="btn btn-primary" id="addbutton" @click="modal_add_task= !modal_add_task" >Add Task</button>
          <button class="btn btn-secondary" @click="clearHistory">Clear All Tasks</button>
      </nav>
    </header>
    <div class="tabs-header-mobile" v-if="mobile_version">
      <ul class="nav">
        <li class="nav-item" @click="selectActiveTab('todo')">
          To Do
        </li>
        <li class="nav-item" @click="selectActiveTab('inprogress')">
          In progress
        </li>
        <li class="nav-item" @click="selectActiveTab('done')">
          Done
        </li>
      </ul>
    </div>
    <div class="todo-list-wrapper">

      <section v-show="selectedTab.todo" class="section content-section drop-zone" 
      ref="todoTab"
      @drop="onDrop($event, 1)" 
      @dragenter.prevent 
      @dragover.prevent>
        <nav>
          <img src="@/assets/img/todolist.png" alt="">
          <h4>TO DO</h4>
          
        </nav>      
        <hr>

        <!-- Task Component -->
        <task-component 
        :taskItems="dataItems(1)" 
        @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>


      
      <section v-show="selectedTab.inprogress" class="section content-section drop-zone"
      ref="inprogressTab" 
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


      <section v-show="selectedTab.done" class="section content-section drop-zone" 
      ref="doneTab" 
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
      mobile_version: false,
      selectedTab:{
        todo: true,
        inprogress: true,
        done: true
      }
    }
  },
  props: [
    'screenWidth'
  ],
  components: {
    'task-component': Task,
    'list-component': List,
    'create-task-modal': CreateTaskModal,
  },
  computed: {
    
  },
  watch: {
    screenWidth(newValue) {
      if(newValue < 768) {
        this.mobile_version= true;
        this.selectedTab={
          todo: true,
          inprogress: false,
          done: false
        }
      }else {
        this.mobile_version= false;
        this.selectedTab={
          todo: true,
          inprogress: true,
          done: true
        }
      }
    }
  },
  mounted() {
    this.taskItems= this.getTaskItems(); 
  },
  methods: {
    selectActiveTab(tab) {     
      this.selectedTab={
        todo: false,
        inprogress: false,
        done: false
      }
      if(tab== 'todo'){
        this.selectedTab.todo= true;
      }else if(tab== 'inprogress'){
        this.selectedTab.inprogress= true;
      }else if(tab== 'done'){
        this.selectedTab.done= true;
      }
    },
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
      this.closeModal();
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
      this.modal_add_task = false;
    }
  },
}
</script>


<style>


  
</style>