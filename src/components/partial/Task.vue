<template>
    <div class="tasks-section" ref="tasks_section">
        <template v-for="(task, index) in taskItems" :key="index">
            <div :style="{backgroundColor: task.background_color}" class="task-item" >
                <nav class="task-nav">
                    <h5 :style="{color: task.title_color}">{{ task.title }}</h5>
                    <fa icon="fa-solid fa-edit" />
                </nav>
                <template v-if="task.short_description">
                    <hr>
                    <div :style="{color: task.description_color}" class="task-body">
                        {{ task.short_description }}
                    </div>
                </template>            
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