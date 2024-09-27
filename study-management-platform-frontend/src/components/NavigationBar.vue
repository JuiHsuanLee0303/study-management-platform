<template>
  <nav class="navigation-bar flex justify-between items-center p-4 bg-gray-800 shadow-md">
    <button
      class="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <ul :class="['flex space-x-6', { hidden: isSmallScreen }]" class="md:flex">
      <template v-if="userType === 'student'">
        <li>
          <router-link
            :to="{ path: '/student/home' }"
            :class="{
              'text-yellow-500': isActive('/student/home'),
              'text-gray-300': !isActive('/student/home')
            }"
            class="hover:text-white transition-colors duration-300"
            >首頁</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/student/courses' }"
            :class="{
              'text-yellow-500': isActive('/student/courses'),
              'text-gray-300': !isActive('/student/courses')
            }"
            class="hover:text-white transition-colors duration-300"
            >課程</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/student/assignments' }"
            :class="{
              'text-yellow-500': isActive('/student/assignments'),
              'text-gray-300': !isActive('/student/assignments')
            }"
            class="hover:text-white transition-colors duration-300"
            >作業</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/student/grades' }"
            :class="{
              'text-yellow-500': isActive('/student/grades'),
              'text-gray-300': !isActive('/student/grades')
            }"
            class="hover:text-white transition-colors duration-300"
            >成績</router-link
          >
        </li>
      </template>
      <template v-if="userType === 'teacher'">
        <li>
          <router-link
            :to="{ path: '/teacher/courses' }"
            :class="{
              'text-yellow-500': isActive('/teacher/courses'),
              'text-gray-300': !isActive('/teacher/courses')
            }"
            class="hover:text-white transition-colors duration-300"
            >教師課程</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/teacher/assignments' }"
            :class="{
              'text-yellow-500': isActive('/teacher/assignments'),
              'text-gray-300': !isActive('/teacher/assignments')
            }"
            class="hover:text-white transition-colors duration-300"
            >教師作業</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/teacher/students' }"
            :class="{
              'text-yellow-500': isActive('/teacher/students'),
              'text-gray-300': !isActive('/teacher/students')
            }"
            class="hover:text-white transition-colors duration-300"
            >教師學生</router-link
          >
        </li>
      </template>
    </ul>
    <ul class="flex space-x-6">
      <li class="text-gray-300">您好，{{ userName }}</li>
      <li>
        <router-link
          to="/login"
          class="text-gray-300 hover:text-white transition-colors duration-300"
          >登出</router-link
        >
      </li>
    </ul>
    <div
      v-if="isMenuOpen && isSmallScreen"
      class="absolute top-full left-0 w-full bg-gray-800 shadow-md"
    >
      <ul class="flex flex-col space-y-4 p-4">
        <template v-if="userType === 'student'">
          <li>
            <router-link
              :to="{ path: '/student/home' }"
              :class="{
                'text-yellow-500': isActive('/student/home'),
                'text-gray-300': !isActive('/student/home')
              }"
              class="hover:text-white transition-colors duration-300"
              >首頁</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/student/courses' }"
              :class="{
                'text-yellow-500': isActive('/student/courses'),
                'text-gray-300': !isActive('/student/courses')
              }"
              class="hover:text-white transition-colors duration-300"
              >課程</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/student/assignments' }"
              :class="{
                'text-yellow-500': isActive('/student/assignments'),
                'text-gray-300': !isActive('/student/assignments')
              }"
              class="hover:text-white transition-colors duration-300"
              >作業</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/student/grades' }"
              :class="{
                'text-yellow-500': isActive('/student/grades'),
                'text-gray-300': !isActive('/student/grades')
              }"
              class="hover:text-white transition-colors duration-300"
              >成績</router-link
            >
          </li>
        </template>
        <template v-if="userType === 'teacher'">
          <li>
            <router-link
              :to="{ path: '/teacher/courses' }"
              :class="{
                'text-yellow-500': isActive('/teacher/courses'),
                'text-gray-300': !isActive('/teacher/courses')
              }"
              class="hover:text-white transition-colors duration-300"
              >教師課程</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/teacher/assignments' }"
              :class="{
                'text-yellow-500': isActive('/teacher/assignments'),
                'text-gray-300': !isActive('/teacher/assignments')
              }"
              class="hover:text-white transition-colors duration-300"
              >教師作業</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/teacher/students' }"
              :class="{
                'text-yellow-500': isActive('/teacher/students'),
                'text-gray-300': !isActive('/teacher/students')
              }"
              class="hover:text-white transition-colors duration-300"
              >教師學生</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  userType: {
    type: String,
    required: true
  }
})

const userName = ref('test')
const route = useRoute()
const isMenuOpen = ref(false)
const isSmallScreen = ref(window.innerWidth < 768)

const isActive = (path) => {
  return route.path === path
}

onMounted(() => {
  // userName.value = localStorage.getItem('userName')
  window.addEventListener('resize', () => {
    isSmallScreen.value = window.innerWidth < 768
  })
})
</script>

<style scoped>
.navigation-bar {
  background-color: #333;
  padding: 1rem;
  position: relative;
}
</style>
