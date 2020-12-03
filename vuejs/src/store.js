import { reactive } from 'vue';
import api from './services/api.js'

/* STATE */
export const state = reactive({
  selectedGroupId : null,
  newTask         : null,
  tasks           : [],
  groups          : [],
  newGroup        : null
})

/* ACTIONS */
export function setGroupId (val) {
  state.selectedGroupId = val
}

export async function createTask () {
  const payload = {
    title: state.newTask,
    groupId: state.selectedGroupId
  }
  const resp = await api.post('todos', JSON.stringify(payload))

  if (resp.ok) {
    state.tasks.push(await resp.json())
    state.newTask = null
  } else {
    console.warn(resp.status)
  }
}

export async function loadTasks () {
  const resp = await api.get('todos')

  if (resp.ok)
    state.tasks = await resp.json()
  else
    console.warn(resp.status)
}

export async function toggleTaskStatus (task) {
  const payload = { completed: !task.completed }
  const resp = await api.put(`todos/${task.id}`, JSON.stringify(payload))

  if (resp.ok)
    task.completed = payload.completed
  else
    console.warn(resp.status)
}

export async function removeTask (id) {
  const resp = await api.delete(`todos/${id}`)

  if (resp.ok) {
    const taskIdx = state.tasks.findIndex(task => task.id === id)
    state.tasks.splice(taskIdx, 1)
  } else {
    console.warn(resp.status)
  }
}

export async function colorTask (color, task) {
  const payload = { color: color }
  const resp = await api.put(`todos/${task.id}`, JSON.stringify(payload))

  if (resp.ok)
    task.color = color
  else
    console.warn(resp.status)
}

export async function onDrop (ev, groupId) {
  const taskId = parseInt(ev.dataTransfer.getData('taskId'))
  const payload = { groupId: groupId }
  const resp = await api.put(`todos/${taskId}`, JSON.stringify(payload))

  if (resp.ok) {
    const task = state.tasks.find(task => task.id === taskId)
    task.groupId = groupId
  } else {
    console.warn(resp.status)
  }
}

export async function removeGroup (id) {
  const resp = await api.delete(`groups/${id}`)
  if (resp.ok) {
    const groupIdx = state.groups.findIndex(group => group.id === id)
    state.groups.splice(groupIdx, 1)
    state.selectedGroupId = null
    state.tasks = state.tasks.filter(task => task.groupId != id)
  } else {
    console.warn(resp.status)
  }
}

export async function createGroup () {
  const payload = { title: state.newGroup }
  const resp = await api.post('groups', JSON.stringify(payload))

  if (resp.ok) {
    state.groups.push(await resp.json())
    state.newGroup = null
  } else {
    console.warn(resp.status)
  }
}

export async function loadGroups () {
  const resp = await api.get('groups')

  if (resp.ok)
    state.groups = await resp.json()
  else
    console.warn(resp.status)
}
