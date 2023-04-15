<template>
  <div class="home" id="todolist">
    <header class="header-todo-list">
      <!-- Action Button Add Task and Clear all Task(localStorage) -->
      <nav class="action-buttons">
        <div class="cards-buttons">
          <button class="btn btn-primary"  @click="modal_add_task= !modal_add_task" >
            Add Task
          </button>
          <button class="btn btn-secondary" @click="clearHistory">
            Clear All Tasks
          </button>
        </div>
        <div v-if="user" class="user-logout">
          <h4>{{ user.displayName }}</h4>
          <div class="log-out">
            <button @click="logout()">Log Out</button>
          </div>        
        </div>
        <div v-else class="login-register-buttons">
          <button class="btn btn-primary" @click="toggle_login_register= !toggle_login_register">
            Login/Register
          </button>
        </div>
        
      </nav>
    </header>
    <!-- Tabs for Mobile version -->
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
      <!-- Todo cards section -->
      <section v-show="selectedTab.todo" class="section content-section drop-zone" 
        ref="todoTab"
        @drop="onDrop($event, 1)" 
        @dragenter.prevent 
        @dragover.prevent>
        <!-- Nav title todo section -->
        <nav>
          <img src="@/assets/img/1.png" alt="">
          <h4>TO DO</h4>          
        </nav>      
        <hr>
        <!-- Task Component---(Showing Todo Cards) -->
        <task-component 
          :taskItems="dataItems(1)" 
          @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>

      <!-- In progress cards section -->
      <section v-show="selectedTab.inprogress" class="section content-section drop-zone"
        ref="inprogressTab" 
        @drop="onDrop($event, 2)" 
        @dragenter.prevent 
        @dragover.prevent>
        <!-- Nav title in progress section -->
        <nav>
          <img src="@/assets/img/2.png" alt="">
          <h4>IN PROGRESS</h4>
        </nav>
        <hr>
        <!-- Task Component---(Showing Inprogress Cards) -->
        <task-component 
          :taskItems="dataItems(2)" 
          @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>

      <!-- Done cards sections -->
      <section v-show="selectedTab.done" class="section content-section drop-zone" 
        ref="doneTab" 
        @drop="onDrop($event, 3)" 
        @dragenter.prevent 
        @dragover.prevent>
        <!-- Nav title done section -->
        <nav>
          <img src="@/assets/img/3.png" alt="">
          <h4>Done</h4>
        </nav>  
        <hr>
        <!-- Task Component---(Showing Done Cards) -->
        <task-component 
          :taskItems="dataItems(3)" 
          @showModalUpdateTask="showModalUpdateTask($event)"
        />
      </section>
    </div>

    <!-- Create and Update task Modal Component     -->
    <create-task-modal v-if="modal_add_task"
      :update_task_item="update_task_item"
      @addTask="addTask($event)"/>
      <login-register
      v-if="toggle_login_register"
      @register="register($event)"
      @login="login($event)"
      @closeModal="toggle_login_register= !toggle_login_register"
      />
  </div>
</template>

<script>
import Task from './partial/Task.vue'
import CreateTaskModal from './modal/CreateTask.vue'
import LoginRegister from './modal/LoginRegister.vue'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'


export default {
  data() {
    return {
      toggle_login_register: false,
      taskItems:[],
      modal_add_task: false,
      task_component: 0,
      update_task_item: null,
      mobile_version: false,
      selectedTab:{
        todo: true,
        inprogress: true,
        done: true
      },
      user: null,
    }
  },
  props: [
    'screenWidth'
  ],
  components: {
    'task-component': Task,
    'create-task-modal': CreateTaskModal,
    'login-register': LoginRegister,
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
  beforeMount() {
    this.fetchUser;
  },
  mounted() {
    this.taskItems= this.getTaskItems(); 
  },
  computed: {
    fetchUser(){
      auth.onAuthStateChanged(async user=> {
        if(user=== null) {
          this.clearUser();
        }else {
          this.setUser(user)
        }
      })
    }
  },
  methods: {
    async login(data){
      const {email, password}= data;
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not Found")
            break;
          case 'auth/wrong-password':
            alert("Wrong Password")
            break;
        
          default:
            alert("Something went Wrong")
            
        }
        return
      }
      this.setUser(auth.currentUser);
      this.toggle_login_register= false;
    },
    
    async register(data){
      console.log(data);
      const {email, password, name }= data;
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break;
          case 'auth/invalid-email':
            alert("Invalid Email")
            break;
          case 'auth/operation-not-allowed':
            alert("Operation not allowes")
            break;
          case 'auth/weak-password':
            alert("Week Password")
            break;
        
          default:
            alert("Something went Wrong")
            
        }
        return
      }
      
      try {
        await updateProfile(auth.currentUser, {displayName: name})
      }catch (error){
        console.log('Something went wrong');
        return
      }
      console.log('auth.currentUser');
      console.log(auth.currentUser);
      this.setUser(auth.currentUser)
      this.toggle_login_register= false;
    },
    async logout() {
      await signOut(auth);
      this.clearUser();
    },
    
    setUser(user) {
      this.user= user;
    },
    clearUser() {
      this.user= null;
    },











    
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
      const currentDate = new Date();
      this.taskItems.push({ 
        task_id: newTask.task_id,
        task_title: newTask.task_title,
        task_desciption: newTask.task_desciption,
        task_title_color: newTask.task_title_color,
        task_background_color: newTask.task_background_color,
        task_description_color: newTask.task_description_color,
        // Get Date with format dd--mm--yy
        date: `${currentDate.getDate()}/
        ${currentDate.getMonth() + 1}/
        ${currentDate.getFullYear()}`, 
        // Get time format O:M
        time: `${currentDate.getHours()}:
        ${currentDate.getMinutes()}`,
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
      if (window.confirm('Are you sure to delete this task?')) {
        this.taskItems.splice(index, 1);
        localStorage.setItem('todo-List', JSON.stringify(this.taskItems));
      }
      else{
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
<style scoped>
.login-register {
    height: 400px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: 300px;
}
</style>