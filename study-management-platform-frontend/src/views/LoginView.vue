<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500"
  >
    <div
      class="w-[70vw] md:w-[50vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[20vw] p-4 border border-gray-300 rounded-lg shadow-md bg-white bg-opacity-80 backdrop-blur-md"
    >
      <h1 class="text-center mb-4 text-2xl font-bold text-black drop-shadow-lg">學習管理平台</h1>
      <h1 class="text-center mb-4 text-xl font-bold text-black drop-shadow-lg">
        {{ isLogin ? '登入' : '註冊' }}
      </h1>
      <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <div class="mb-4" v-if="!isLogin">
          <label for="username" class="block mb-2 text-black drop-shadow-lg">姓名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-black drop-shadow-lg">電子郵件</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2 text-black drop-shadow-lg">密碼</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {{ isLogin ? '登入' : '註冊' }}
        </button>
      </form>
      <button
        @click="toggleMode"
        class="w-full mt-4 p-3 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        {{ isLogin ? '註冊' : '登入' }}
      </button>
    </div>
  </div>
  <MessageModal
    v-if="showModal"
    :initialTitle="modalTitle"
    :initialMessage="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MessageModal from '@/components/MessageModal.vue'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const username = ref('')
const isLogin = ref(true)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const isLoginSuccess = ref(false)

const handleLogin = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: email.value,
        password: password.value
      },
      {
        withCredentials: true
      }
    )
    localStorage.setItem('accessToken', response.data.token)
    const user = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify`, {
      token: response.data.token
    })
    modalTitle.value = '登入成功'
    modalMessage.value = `歡迎, ${user.data.username}`
    showModal.value = true
    isLoginSuccess.value = true
  } catch (error) {
    modalTitle.value = '登入失敗'
    modalMessage.value = '電子郵件或密碼錯誤'
    showModal.value = true
    isLoginSuccess.value = false
  }
}

const handleRegister = () => {
  axios
    .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
      username: username.value,
      email: email.value,
      password: password.value
    })
    .then((response) => {
      console.log('Register response:', response.data)
      modalTitle.value = '註冊成功'
      modalMessage.value = `歡迎, ${username.value}`
      showModal.value = true
    })
    .catch((error) => {
      console.error('Register error:', error)
      modalTitle.value = '註冊失敗'
      modalMessage.value = '電子郵件已經被註冊'
      showModal.value = true
    })
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

watch(showModal, (newVal) => {
  if (!newVal) {
    if (isLoginSuccess.value) {
      router.push('/student/home')
    }
  }
})
</script>
