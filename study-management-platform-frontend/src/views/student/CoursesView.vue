<template>
  <div>
    <NavigationBar userType="student" />
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4">課程</h1>
      <div class="flex flex-wrap justify-center gap-4">
        <CardItem
          class="hover:cursor-pointer"
          v-for="lesson in lessons"
          :key="lesson.id"
          :title="lesson.name"
          :content="lesson.time"
          @cardClick="handleCardClick(lesson)"
        />
      </div>
    </div>
    <LessonModal
      v-if="selectedLesson"
      :lesson="selectedLesson"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import CardItem from '@/components/CardItem.vue'
import LessonModal from '@/components/LessonModal.vue'

const lessons = ref([
  { id: 1, name: '8/18 上課', time: '2024/08/18 10:00' },
  { id: 2, name: '8/25 上課', time: '2024/08/25 10:00' },
  { id: 3, name: '9/1 上課', time: '2024/09/01 10:00' }
])

const selectedLesson = ref(null)
const isModalVisible = ref(false)

const handleCardClick = (lesson) => {
  selectedLesson.value = lesson
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
  selectedLesson.value = null
}
</script>
