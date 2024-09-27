<template>
  <div>
    <NavigationBar userType="student" />
    <h1>Grades</h1>
    <ul>
      <li v-for="grade in grades" :key="grade.id">{{ grade.course }}: {{ grade.score }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const grades = ref([
  { id: 1, course: 'Mathematics', score: 'A' },
  { id: 2, course: 'Science', score: 'B+' },
  { id: 3, course: 'History', score: 'A-' }
])
</script>
