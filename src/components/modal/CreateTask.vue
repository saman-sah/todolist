<template>
  <div class="bg-modal" @click.self="$emit('closeModal')">
    <div class="modal-content-add-task">
        <input v-model="newTask.task_title" type="text" placeholder="Enter your task here" ref="input_title_task" >
        <input type="color" v-model="newTask.task_title_color" id="colorPicker_task-title">
        <!-- <fa icon="fa-solid fa-palette" /> -->
        <textarea v-model="newTask.task_desciption" name="task_short_desciption" id="task_short_desciption" cols="30" rows="10" ></textarea>
        <input type="color" v-model="newTask.task_description_color" id="colorPicker_task-description">
        <hr>
        <input type="color" v-model="newTask.task_background_color" id="colorPicker_task-bg">
        <!-- <hr> -->
        <!-- <input type="date" id="select_date_to_done" name="select_date_to_done"> -->
        <button id="addbutton" @click="addTask()" >Add Task</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            newTask:{
                task_title: '',
                task_desciption:'',
                task_title_color:'#000000',
                task_background_color:'#cccccc',
                task_description_color:'#000000',
            }            
        }
    },
    methods: {
        addTask(){
            // If task is empty, return alert with message "Please write a task"
            if(this.newTask.task_title=='') {
                this.$toast.open({ 
                message: 'Enter your task title', 
                type: 'warning', 
                position: 'bottom' 
                }); 
            }else {
                this.$parent.addTask(this.newTask);
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
    border-radius: 0.5em;
    display: block;
    padding: 2em;
    z-index: 99;
}
</style>