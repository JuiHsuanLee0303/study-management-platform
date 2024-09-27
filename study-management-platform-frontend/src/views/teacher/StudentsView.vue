<template>
  <div>
    <h1>Teacher Students</h1>
    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }} - {{ student.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const students = ref([
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Sam Johnson', email: 'sam.johnson@example.com' }
])
</script>
