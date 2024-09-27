<template>
  <div>
    <NavigationBar userType="student" />
    <h1>Assignments</h1>
    <ul>
      <li v-for="assignment in assignments" :key="assignment.id">
        {{ assignment.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const assignments = ref([
  { id: 1, title: 'Math Homework' },
  { id: 2, title: 'Science Project' },
  { id: 3, title: 'History Essay' }
])
</script>
