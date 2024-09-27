<template>
  <div class="w-screen">
    <NavigationBar userType="student" />
    <div class="student-home">
      <div
        class="notification-area bg-white shadow-lg rounded-lg p-6 mb-6 w-[90%] border-2 border-gray-300"
      >
        <h2 class="text-2xl font-bold mb-4">最新消息</h2>
        <hr class="mb-4" />
        <div class="notification-content">
          <ul class="list-disc list-inside space-y-2">
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="text-gray-700 flex justify-between items-center"
            >
              <div>
                <span
                  :class="['badge', notification.category]"
                  :style="badgeStyle(notification.category)"
                  class="mr-2"
                  >{{ notification.category }}</span
                >
                <span class="ml-2">{{ notification.content }}</span>
              </div>
              <span class="text-sm text-gray-500 ml-2">{{ notification.date }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="flex justify-center items-center w-[90%]">
        <vue-cal
          class="h-[80vh] w-full bg-gray-100 rounded-lg shadow-md p-4"
          locale="zh-hk"
          :time-from="8 * 60"
          :time-to="17 * 60"
          :disable-views="['years']"
          :events="events"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
// import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue'

// 定義事件
// const events = [{ start: '2024-09-21 10:00', end: '2024-09-21 12:00', title: '上課' }]

// 增加最新消息列表
const notifications = ref([
  {
    content: '此系統目前為測試版本，若有任何問題，請聯絡管理員。',
    date: '2024-09-20',
    category: '系統'
  },
  {
    content: '本週課程已經更新，請同學們注意查看。',
    date: '2024-09-18',
    category: '課程'
  },
  {
    content: '本週作業已經發布，請同學們在規定時間內完成。',
    date: '2024-09-15',
    category: '作業'
  },
  {
    content: '上週作業已經截止，請同學們注意查看。',
    date: '2024-09-15',
    category: '作業'
  }
])

// 根據消息類別設置不同的badge顏色
const badgeStyle = (category) => {
  switch (category) {
    case '系統':
      return { backgroundColor: '#f39c12' } // 橙色
    case '課程':
      return { backgroundColor: '#3498db' } // 藍色
    case '作業':
      return { backgroundColor: '#2ecc71' } // 綠色
    default:
      return { backgroundColor: '#95a5a6' } // 灰色
  }
}
</script>

<style scoped>
.student-home {
  @apply flex flex-col items-center justify-center pt-10 w-full;
}

/* 覆寫全局行事曆的背景顏色 */
.vuecal {
  @apply bg-gray-100 rounded-lg shadow-md p-4;
}

/* 自訂日期格子背景 */
.vuecal__cell-date {
  @apply bg-blue-100;
}

/* 自訂 hover 效果 */
.vuecal__cell-date:hover {
  @apply bg-blue-200;
}

/* 自訂事件顏色 */
.vuecal__event {
  @apply bg-red-400 text-white !important;
}

/* 針對今天的日期特別標註 */
.vuecal__cell--today {
  @apply bg-orange-500;
}

.badge {
  @apply inline-block text-white text-xs px-2 py-1 rounded-full;
}
</style>
