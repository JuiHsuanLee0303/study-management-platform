<template>
  <div>
    <h1>Teacher Assignments</h1>
    <ul>
      <li v-for="assignment in assignments" :key="assignment.id">
        {{ assignment.title }} - {{ assignment.dueDate }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const assignments = ref([
  { id: 1, title: 'Grade Math Homework', dueDate: '2022-09-15' },
  { id: 2, title: 'Review Science Project', dueDate: '2022-09-20' },
  { id: 3, title: 'Evaluate History Essay', dueDate: '2022-09-25' }
])
</script>
