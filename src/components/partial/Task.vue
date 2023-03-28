<template>
    <div class="tasks-section" ref="tasks_section">
        <div v-for="(task, index) in taskItems" class="task-item" :key="index">
        <nav class="task-nav">
            <h5>{{ task.title }}</h5>
            <fa icon="fa-solid fa-edit" />
        </nav>
        <template v-if="task.short_description">
            <hr>
            <div class="task-body">
            {{ task.short_description }}
            </div>
        </template>
        
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'taskItems'
    ]
}
</script>

<style>

</style>