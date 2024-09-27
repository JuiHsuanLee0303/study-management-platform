<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-5 rounded-lg shadow-lg text-center">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <button
        @click="closeModal"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const props = defineProps({
  initialTitle: String,
  initialMessage: String
})

const emit = defineEmits(['close'])

const title = ref(props.initialTitle || '')
const message = ref(props.initialMessage || '')

// const showModal = (modalTitle, modalMessage) => {
//   title.value = modalTitle
//   message.value = modalMessage
//   isVisible.value = true
// }

const closeModal = () => {
  emit('close')
}
</script>
