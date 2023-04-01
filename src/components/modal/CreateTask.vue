<template>
  <div class="bg-modal" @click.self="$emit('closeModal')">
    <div class="modal-content-add-task">
        <div class="flex-container">
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
            
            <div class="right-section">
                <div class="background-color">
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
