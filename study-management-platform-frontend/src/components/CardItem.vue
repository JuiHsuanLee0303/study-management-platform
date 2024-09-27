<template>
  <div
    class="card-item p-10 border-2 rounded-lg shadow-lg flex flex-col items-center"
    @click="$emit('cardClick')"
  >
    <h2 class="text-3xl font-bold mb-4 text-center">{{ title }}</h2>
    <p class="text-base text-center">{{ content }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
})
</script>

<style scoped>
.card-item {
  transition: transform 0.3s;
}

.card-item:hover {
  transform: scale(1.1);
}
</style>
