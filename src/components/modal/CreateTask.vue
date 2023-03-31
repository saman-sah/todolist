<template>
  <div class="bg-modal" @click.self="$emit('closeModal')">
    <div class="modal-content-add-task">
        <div class="flex-container">
            <div class="left-section">
                <div class="title-task mb-4">
                    <!-- Title input -->
                    <input :style="{color: newTask.task_title_color}" 
                    v-model="newTask.task_title" id="input-task-title" 
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
                    <textarea :style="{color: newTask.task_description_color}" 
                    v-model="newTask.task_desciption" 
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
                <div class="background-color mb-4" :style="{color: newTask.task_background_color}">
                    BackgroundColor
                    <input type="color" v-model="newTask.task_background_color" id="colorPicker_task-bg">
                    <fa :style="{color: newTask.task_background_color}" class="palete-color-picker palette-icon-background" icon="fa-solid fa-palette" />
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
        }
    },
    mounted() {
        if(localStorage.getItem('laset-ID')) {
            this.lasetID= localStorage.getItem('laset-ID')
        }else{
            this.lasetID=0
        }
        
        if(this.update_task_item != null) {
            console.log('this.update_task_item');
        console.log(this.update_task_item);
            this.action_button= 'Update'
            this.newTask= this.update_task_item.task;
        }else {
            this.action_button= 'Create'
        }
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
                    console.log('this.lasetID');
                    console.log(this.lasetID);
                    console.log(this.newTask.task_id);
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
</style>