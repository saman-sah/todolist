<template>
  <div class="home" id="todolist">
    <header class="header-todo-list">
      <!-- Action Button Add Task and Clear all Task(localStorage) -->
      <nav class="action-buttons">
        <div v-if="user" class="cards-buttons">
          <button class="btn btn-primary"  @click="modal_add_task= !modal_add_task" >
            Add Task
          </button>
          <button class="btn btn-secondary" @click="deleteAllTasks(user.uid)">
            Delete All Tasks
          </button>
          <div class="log-out">
            <button class="btn btn-primary" @click="logout()">Log Out</button>
          </div>   
        </div>
        <div v-if="user" class="user_profile mb-3">
          <h4>{{ user.displayName }} Todos</h4>               
        </div>
        <div v-else class="login-register-buttons">
          <button class="btn btn-primary" @click="toggle_login_register= !toggle_login_register">
            Login  /  Register
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
import { collection, onSnapshot, query, where, addDoc, deleteDoc, doc, updateDoc   } from "firebase/firestore";
import { db } from '@/firebase/index'
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
    this.getDataFirebase();
  },
  computed: {
    fetchUser(){
      auth.onAuthStateChanged(async user=> {
        if(user=== null) {
          this.clearUser();
        }else {
          this.setUser(user);
           this.getDataFirebase(user.uid);
        }
      })
    }
  },
  methods: {
     // Deleting tasks from Firebase Database 
    deleteTask(taskId) {
      if (window.confirm('Are you sure to delete this task?')) {
          deleteDoc(doc(db, "todos", taskId));
      }
      else{        
        return
      }      
    },
    //End--- Deleting tasks from Firebase Database 
     deleteAllTasks(userUId) {
      var fbDoc= doc;
      if (window.confirm('Are you sure to delete all task?')) {
        if(userUId){
          const q=query(collection(db, "todos"), where('user_uid', '==', userUId));        
          onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc)=> {
              const todo_id= doc.id;
              deleteDoc(fbDoc(db, "todos", todo_id));
            })
          })
        }
      }
      else{        
        return
      }
      // Refresh page
      // location.reload();
    },
    // Get Data From Firestore Database
    getDataFirebase(userUId) {
      if(userUId){
        const q=query(collection(db, "todos"), where('user_uid', '==', userUId))
        onSnapshot(q, (querySnapshot) => {
          const todos=[];
          querySnapshot.forEach((doc) => {
            let item= doc.data();
            const todo= {
              task_id: doc.id,
              task_title: item.title,
              task_desciption: item.description,
              task_title_color: item.title_color,
              task_background_color: item.bg_color,
              task_description_color: item.des_color,
              status: item.status,
            }
            todos.push(todo)
          });
          this.taskItems= todos
        })
      }
      
    },
    //End--- Get Data From Firestore Database

    // Login Firebase Auth
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
    //End--- Login Firebase Auth

    // Register Firebase Auth
    async register(data){
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
      this.setUser(auth.currentUser)
      this.toggle_login_register= false;
    },
    //End--- Register Firebase Auth

    //Logout Firebase Auth
    async logout() {
      await signOut(auth);
      this.clearUser();
    },
    //End--- Logout Firebase Auth

    //SetUser 
    setUser(user) {
      this.user= user;
    },
    //End--- SetUser 

    // ClearUser 
    clearUser() {
      this.user= null;
      this.taskItems= null;
    }, 
    //End--- ClearUser 
    
    //End--- selectActiveTab
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
    //End--- selectActiveTab    
    dataItems(status) {
      if(this.taskItems){
        return this.taskItems.filter((item) => item.status == status)
      }
    },
    //--- startDrag
    startDrag(evt, item, index) {      
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.task_id)
    },
    //End--- startDrag

    //--- onDrop
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
    //End--- onDrop

    // Adding tasks to the list    
    addTask(newTask) {
      // const currentDate = new Date();
      const docRef =addDoc(collection(db, "todos"), {
        title: newTask.task_title,
        description: newTask.task_desciption,
        title_color: newTask.task_title_color,
        bg_color: newTask.task_background_color,
        des_color: newTask.task_description_color,
        status: newTask.status,
        user_uid: this.user.uid
      });
      this.modal_add_task = !this.modal_add_task;
      this.$toast.open({ 
        message: 'Your task added', 
        type: 'success', 
        position: 'bottom' 
      });      
    },

   
    
    showModalUpdateTask(task) {
      this.update_task_item= task;
      this.modal_add_task = !this.modal_add_task;    
    },
    updateTask(task) {
      const todoDoc = doc(db, "todos", task.task_id);
      updateDoc(todoDoc, {
        title: task.task_title,
        description: task.task_desciption,
        title_color: task.task_title_color,
        bg_color: task.task_background_color,
        des_color: task.task_description_color,
        status: task.status,
      });
      this.closeModal();
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