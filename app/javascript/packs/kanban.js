import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../stores/kanban'
import VueRouter from 'vue-router';
import KanbanPage from '../pages/KanbanPage'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('content')
  const projectId = rootElement.dataset.projectId
  const sprintId = rootElement.dataset.sprintId
  Vue.use(VueRouter)
  Vue.use(VueI18n)

  const router = new VueRouter({
    routes: [
      {
        name: 'NewTask',
        path: '/story/:storyId/tasks/new/',
        component: KanbanPage,
        meta: {
          newTask: true,
          projectId: projectId,
          sprintId: sprintId
        }
      },
      {
        name: 'ShowStory',
        path: '/story/:storyId',
        component: KanbanPage,
        meta: {
          newTask: false,
          projectId: projectId,
          sprintId: sprintId
        }
      },
      {
        name: 'ShowTask',
        path: '/story/:storyId/tasks/:taskId',
        component: KanbanPage,
        meta: {
          newTask: false,
          projectId: projectId,
          sprintId: sprintId
        }
      },
      {
        path: '*',
        component: KanbanPage,
        meta: {
          newTask: false,
          projectId: projectId,
          sprintId: sprintId
        }
      },
    ]
  })

  let locale = (window.navigator.languages && window.navigator.languages[0]) ||
                window.navigator.language ||
                window.navigator.userLanguage ||
                window.navigator.browserLanguage;
  if (locale.includes('-')) {
    locale = locale.split('-')[0];
  }

  const i18n = new VueI18n({
    locale: locale,
    messages: require('../i18n/globals.json')
  })

  const app = new Vue({
    i18n,
    router,
    store,
    el: "#content",
    render: h => h(KanbanPage)
  });
})