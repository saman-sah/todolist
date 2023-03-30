<template>
    <div class="tasks-section">
        <template v-for="(task, index) in taskItems" :key="index">
            <div :style="{backgroundColor: task.task_background_color}" class="task-item drag-el" 
            @dragstart="$parent.startDrag($event, task)" draggable="true">
                <nav class="task-nav">
                    <h5 :style="{color: task.task_title_color}">{{ task.task_title }}</h5>
                    <div>
                        <fa @click="$emit('showModalUpdateTask', {index, task})" icon="fa-solid fa-edit" class="me-3" />
                        <fa @click="this.$parent.deleteTask(index)" icon="fa-solid fa-trash" />
                    </div>
                </nav>
                <template v-if="task.task_desciption">
                    <hr>
                    <div :style="{color: task.task_description_color}" class="task-body">
                        {{ task.task_desciption }}
                    </div>
                </template>  
                <!-- <div class="task-date-section">
                    <div>
                        <p>{{ task.date }}</p>
                        <p>{{ task.time }}</p>
                    </div>
                </div>           -->
            </div>
        </template>
        
    </div>
</template>

<script>
export default {
    props:[        
        'taskItems'
    ],
}
</script>

<style>

</style>