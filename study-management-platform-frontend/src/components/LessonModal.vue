<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
      <h2 class="text-2xl font-bold mb-4">{{ lesson.title }}</h2>
      <p class="mb-4">{{ lesson.description }}</p>
      <p class="mb-4">時間: {{ lesson.time }}</p>
      <p class="mb-4">地點: {{ lesson.location }}</p>
      <p class="mb-4">講師: {{ lesson.instructor }}</p>
      <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded">關閉</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  lesson: {
    type: Object,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
