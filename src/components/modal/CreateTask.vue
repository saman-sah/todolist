<template>
  <div class="bg-modal" @click.self="$emit('closeModal')">
    <div class="modal-content-add-task">
        <div class="flex-container">
            <div class="left-section">
                <div class="title-task mb-4">
                    <!-- Title input -->
                    <input v-model="newTask.task_title" id="input-task-title" 
                    type="text" placeholder="Enter your task here" 
                    ref="input_title_task" >
                    <!-- ColorPicker input -->
                    <input type="color" v-model="newTask.task_title_color" id="colorPicker_task-title">
                    <!-- ColorPicker icon -->
                    <fa :style="{color: newTask.task_title_color}" 
                    class="palete-color-picker palette-icon-title" 
                    icon="fa-solid fa-palette" />
                </div>
                <div class="description-task">
                    <!-- Description textarea -->
                    <textarea v-model="newTask.task_desciption"  placeholder="Task Description"
                    name="task_short_desciption" id="task_short_desciption" 
                    cols="30" rows="5" ></textarea>
                    <!-- ColorPicker input -->
                    <input type="color" v-model="newTask.task_description_color" id="colorPicker_task-description">
                    <!-- ColorPicker icon -->
                    <fa :style="{color: newTask.task_description_color}" 
                    class="palete-color-picker palette-icon-desciption" 
                    icon="fa-solid fa-palette" />
                </div>
            </div>
            
            <div class="right-section">
                <div class="background-color mb-4">
                    BackgroundColor
                    <input type="color" v-model="newTask.task_background_color" id="colorPicker_task-bg">
                    <fa :style="{color: newTask.task_background_color}" class="palete-color-picker palette-icon-background" icon="fa-solid fa-palette" />
                </div>
                <div class="select-status-task">
                     <div class="status_select">
                        <input id="todo" type="radio" name="radios" :value="option.todo" v-model="newTask.status" >
                        <input id="inprogress" type="radio" name="radios" :value="option.inprogress" v-model="newTask.status" >
                        <input id="Done" type="radio" name="radios" :value="option.done" v-model="newTask.status" >
                        <span></span>
                        <label for="todo">todo</label>
                        <label for="inprogress">inprogress</label>
                        <label for="Done">Done</label>
                    </div>
                </div>
            </div>
        </div>
        
        <hr>
        
        <!-- <hr> -->
        <!-- <input type="date" id="select_date_to_done" name="select_date_to_done"> -->
        <button id="addbutton" @click="actionTask()" >{{ action_button }}</button>
    </div>
    
  </div>
</template>

<script>
export default {
    props: [
        'update_task_item'
    ],
    data() {
        return {
            newTask:{
                task_id: 0,
                task_title: '',
                task_desciption:'',
                task_title_color:'#000000',
                task_background_color:'#cccccc',
                task_description_color:'#000000',
                date: null,
                time: null,
                status: 1,
            },
            action_button: 'Create' ,
            lasetID: null,
            option: {
                'todo': 1,
                'inprogress': 2,
                'done': 3,
            }          
        }
    },
    mounted() {
        if(localStorage.getItem('laset-ID')) {
            this.lasetID= localStorage.getItem('laset-ID')
        }else{
            this.lasetID=0
        }
        
        if(this.update_task_item != null) {
            this.action_button= 'Update'
            this.newTask= this.update_task_item.task;
        }else {
            this.action_button= 'Create'
        }
    },
    updated() {
        console.log(this.newTask.status);
    },
    watch: {
        
    },
    methods: {
        actionTask(){            
            if(this.action_button== 'Create'){
                // If task is empty, return alert with message "Please write a task"
                if(this.newTask.task_title=='') {
                    this.$toast.open({ 
                    message: 'Enter your task title', 
                    type: 'warning', 
                    position: 'bottom' 
                    }); 
                }else {
                    this.newTask.task_id=parseInt(this.lasetID)+1;
                    this.$parent.addTask(this.newTask);
                }
            }else {
                this.$parent.updateTask(this.newTask, this.update_task_item.index);
            }

        }
    },
}
</script>

<style>
.bg-modal {
    width: 100%;
    height: 100vh;
    background: #0006;
    display: flex;
    z-index: 98;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
}
.modal-content-add-task {
    width: 40%;
    height: 70%;
    background: #fff;
    border-radius: 1em;
    display: block;
    padding: 1em;
    z-index: 99;    
}
.flex-container {
    display: flex;
    text-align: left;
}
.left-section,
.right-section {
    padding: 0.5em;
}
::placeholder { 
  color: #545454;
  opacity: 0.5; 
}



/* -------------------------   Left Section    ---------------------- */
.left-section {
    flex-basis: 60%;
}
/* color inputs and color pickers */
input[type=color], 
.palete-color-picker {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 40px;
    font-size: 25px;    
}
/*TITLE: color inputs and color pickers */
.title-task input[type=color], 
.title-task .palete-color-picker {
    bottom: 5px;
}
/*DESCRIPTION: color inputs and color pickers */
.description-task input[type=color], 
.description-task .palete-color-picker {
    bottom: 15px;
}

/* Title-Description wrapper */
.title-task,
.description-task,
.background-color {
    position: relative;
}
/* Title-Description inputs */
#input-task-title,
#task_short_desciption,
.select-status-task  {
    width: 100%;
    padding: 1em;
    border-radius: 1em;
    border: 1px solid #cccccc8a;
    color: #545454;
    outline: none;
}
#task_short_desciption {
    resize: none;
    height: 150px;
}
#task_short_desciption:focus,
#input-task-title:focus {
    border: none;
    border-bottom: 1px solid #545454;
    border-radius: 0;
}
/*TITLE: input */
#input-task-title {
    height: 38px;
}
/* ColorPicker --- Iputs */
#colorPicker_task-description,
#colorPicker_task-title,
#colorPicker_task-bg {
    z-index: 9;
    opacity: 0;
    color: #54545483;
}
/* ColorPicker --- Icons */
.palete-color-picker {
    z-index: 8;
}


/* -------------------------   Right Section    ---------------------- */
.right-section {
    flex-basis: 40%;
}
.background-color {
    height: 38px;
    width: 100%;
    padding: 0 1em;
    border-radius: 1em;
    border: 1px solid #cccccc8a;
    color: #545454;
    outline: none;
    display: flex;
    align-items: center;    
}
.select-status-task {
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}



/* -------------------------   Select Status    ---------------------- */
.select-status-task .status_select {
  /* margin: auto; */
  max-width: 10em;
  /* padding: 1.5em 0; */
  position: relative;
}
.select-status-task .status_select label:before, .select-status-task .status_select span:before {
  border-radius: 50%;
  content: "";
}
.select-status-task .status_select label {
  cursor: pointer;
  display: flex;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.select-status-task .status_select label:before {
  background: radial-gradient(100% 100% at 33% 33%, rgba(220, 252, 60, 0.25) 25%, rgba(220, 252, 60, 0) 50%), radial-gradient(100% 100% at 67% 67%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0) 50%);
  box-shadow: 0 0 0.75em #b0c932 inset;
  display: inline-block;
  margin-right: 0.375em;
  width: 1.5em;
  height: 1.5em;
}
.select-status-task .status_select label:not(:last-of-type) {
  margin-bottom: 1.5em;
}
.select-status-task .status_select span {
  position: absolute;
  top: 1.75em;
  left: 0.25em;
  width: 1em;
  height: 1em;
  transition: transform 0.25s linear;
  z-index: 1;
}
.select-status-task .status_select span, .select-status-task .status_select span:before {
  display: block;
}
.select-status-task .status_select span:before {
  background-color: #e62020;
  background-image: radial-gradient(10% 10% at 50% 50%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0)), radial-gradient(12% 12% at 60% 25%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0)), radial-gradient(100% 100% at 60% 50%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.25) 50%);
  border-radius: 50%;
  box-shadow: 0 0.1em 0.1em 0 rgba(0, 0, 0, 0.5), 0 0 0.1em 0.1em rgba(0, 0, 0, 0.25) inset;
  width: 100%;
  height: 100%;
}

.select-status-task input {
  position: fixed;
  top: -1.5em;
  left: -1.5em;
}

.select-status-task input:nth-of-type(1):checked ~ span {
  transform: translateY(-1.5em);
}
.select-status-task input:nth-of-type(1):checked ~ span:before {
  animation: wobble1 0.5s linear forwards;
}

@keyframes wobble1 {
  from, to {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(0) scale(1.33);
  }
  50% {
    transform: translateY(0.25em) scale(1);
  }
  67% {
    transform: translateY(-0.15em) scale(1);
  }
  83% {
    transform: translateY(0.07em) scale(1);
  }
}
.select-status-task input:nth-of-type(2):checked ~ span {
  transform: translateY(1.5em);
}
.select-status-task input:nth-of-type(2):checked ~ span:before {
  animation: wobble2 0.5s linear forwards;
}

@keyframes wobble2 {
  from, to {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(0) scale(1.33);
  }
  50% {
    transform: translateY(0.25em) scale(1);
  }
  67% {
    transform: translateY(-0.15em) scale(1);
  }
  83% {
    transform: translateY(0.07em) scale(1);
  }
}
.select-status-task input:nth-of-type(3):checked ~ span {
  transform: translateY(4.5em);
}
.select-status-task input:nth-of-type(3):checked ~ span:before {
  animation: wobble3 0.5s linear forwards;
}

@keyframes wobble3 {
  from, to {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(0) scale(1.33);
  }
  50% {
    transform: translateY(0.25em) scale(1);
  }
  67% {
    transform: translateY(-0.15em) scale(1);
  }
  83% {
    transform: translateY(0.07em) scale(1);
  }
}



</style>