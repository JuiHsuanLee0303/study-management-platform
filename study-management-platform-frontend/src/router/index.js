import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StudentHome from '@/views/student/StudentHome.vue'
import StudentCourses from '@/views/student/CoursesView.vue'
import StudentAssignments from '@/views/student/AssignmentsView.vue'
import StudentGrades from '@/views/student/GradesView.vue'
import TeacherCourses from '@/views/teacher/CoursesView.vue'
import TeacherAssignments from '@/views/teacher/AssignmentsView.vue'
import TeacherStudents from '@/views/teacher/StudentsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/student',
    children: [
      {
        path: 'home',
        name: 'StudentHome',
        component: StudentHome
      },
      {
        path: 'courses',
        name: 'StudentCourses',
        component: StudentCourses
      },
      {
        path: 'assignments',
        name: 'StudentAssignments',
        component: StudentAssignments
      },
      {
        path: 'grades',
        name: 'StudentGrades',
        component: StudentGrades
      }
    ]
  },
  {
    path: '/teacher',
    component: TeacherCourses, // 這裡可以是教師主頁或其他適當的組件
    children: [
      {
        path: 'courses',
        name: 'TeacherCourses',
        component: TeacherCourses
      },
      {
        path: 'assignments',
        name: 'TeacherAssignments',
        component: TeacherAssignments
      },
      {
        path: 'students',
        name: 'TeacherStudents',
        component: TeacherStudents
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
