<template>
  <div>
    <h1>Teacher Courses</h1>
    <ul>
      <li v-for="course in courses" :key="course.id">
        {{ course.name }} - {{ course.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const courses = ref([
  { id: 1, name: 'Mathematics', description: 'Advanced Math Course' },
  { id: 2, name: 'Science', description: 'Physics and Chemistry' },
  { id: 3, name: 'History', description: 'World History Overview' }
])
</script>
