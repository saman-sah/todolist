<template>
    <div class="tasks-section" ref="tasks_section">
        <template v-for="(task, index) in taskItems" :key="index">
            <div :style="{backgroundColor: task.background_color}" class="task-item" >
                <nav class="task-nav">
                    <h5 :style="{color: task.title_color}">{{ task.title }}</h5>
                    <div>
                        <fa icon="fa-solid fa-edit" class="me-3" />
                        <fa @click="this.$parent.deleteTask(index)" icon="fa-solid fa-trash" />
                    </div>
                </nav>
                <template v-if="task.short_description">
                    <hr>
                    <div :style="{color: task.description_color}" class="task-body">
                        {{ task.short_description }}
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