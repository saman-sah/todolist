<template>
  <div class="bg-modal" @click.self="this.$parent.closeModal()">
    <div class="modal-content-add-task">
        <div class="header-modal-component">
            <h4>{{ header_title }}</h4>
            <fa @click="this.$parent.closeModal()" class="close-modal" icon="fa-solid fa-times" />
        </div>
        <div class="flex-container">
            <!-- Left Section title & description -->
            <div class="left-section">
                <div class="title-task">
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
            <!--End---- Left Section title & description -->

            <!-- Right Section Background Color & Status -->
            <div class="right-section">
                <div class="background-color">
                    BackgroundColor
                    <input type="color" v-model="newTask.task_background_color" id="colorPicker_task-bg">
                    <fa :style="{color: newTask.task_background_color}" class="palete-color-picker palette-icon-background" icon="fa-solid fa-palette" />
                </div>
                <!-- Status radio button items -->
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
            <!--End------- Right Section Background Color & Status -->
        </div>
        
        <hr>
        
        <!-- <hr> -->
        <!-- <input type="date" id="select_date_to_done" name="select_date_to_done"> -->
        <button id="addbutton" class="btn btn-primary" @click="actionTask()" >{{ action_button }}</button>
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
            action_button: 'Create New Task' ,
            lasetID: null,
            header_title: 'Create New Task',
            option: {
                'todo': 1,
                'inprogress': 2,
                'done': 3,
            }          
        }
    },
    mounted() {
        // Set Last Id for creat new task
        if(localStorage.getItem('laset-ID')) {
            this.lasetID= localStorage.getItem('laset-ID')
        }else{
            this.lasetID=0
        }
        // Value of action button--- Create and Update
        if(this.update_task_item != null) {
            this.action_button= 'Update Task'
            this.newTask= this.update_task_item.task;
            this.header_title= 'Update  '+this.update_task_item.task.task_title;
        }else {
            this.action_button= 'Create New Task';
            this.header_title= 'Create New Task';
        }
    },
    methods: {
        actionTask(){            
            if(this.update_task_item == null){
                // If task title is empty, return alert with message "Enter your task title"
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
<style scoped>
hr {
    color: black;
}
</style>
