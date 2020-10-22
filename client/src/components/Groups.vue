<template>
  <div class="groups">
    <input
      class="groups__field"
      v-model="newGroup"
      placeholder="New group"
      @keyup.enter="createGroup" />

    <div
      class="groups__item"
      :class="{active: selectedGroupId === group.id}"
      v-for="group in groups"
      :key="group.id"
      @click="selectGroup(group.id)"
    >
      {{group.title}}

      <div class="actions" v-if="selectedGroupId === group.id">
        <icon-button @click.stop="shareGroup(group.id)" name="share" />
        <icon-button @click.stop="removeTask(group.id)" name="close" />
      </div>
    </div>
  </div>
</template>

<script>
  import IconButton from './IconButton'

  const API = 'http://localhost:5000'

  export default {
    name: 'Groups',
    props: {
      name: String
    },
    data: () => ({
      selectedGroupId: null,
      groups: [],
      newGroup: null
    }),
    components: {
      IconButton
    },
    created () {
      this.loadGroups()
    },
    methods: {
      async loadGroups () {
        const resp = await fetch(`${API}/groups`)
        if (resp.ok)
          this.groups = await resp.json()
        else
          console.warn(resp.status)
      },
      selectGroup (groupId) {
        this.selectedGroupId = this.selectedGroupId === groupId ? null: groupId
      },
      shareGroup (groupId) {
        console.debug(`Share the group ${groupId}`)
      },
      async createGroup () {
        const payload = { title: this.newGroup }
        const headers = { 'Content-Type': 'application/json' }
        const resp = await fetch(`${API}/groups`, {
          method: 'post',
          headers: headers,
          body: JSON.stringify(payload)
        })

        if (resp.ok) {
          this.groups.push(await resp.json())
          this.newGroup = null
        } else {
          console.warn(resp.status)
        }
      },
      async removeTask (id) {
        const headers = { 'Content-Type': 'application/json' }
        const resp = await fetch(`${API}/groups/${id}`, {
          method: 'delete',
          headers: headers
        })

        if (resp.ok) {
          const groupIdx = this.groups.findIndex(group => group.id === id)
          this.groups.splice(groupIdx, 1)
        } else {
          console.warn(resp.status)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .groups {
    display: flex;
    flex-direction: column;
    width: 120px;
    padding: 12px 0 12px 8px;
    border-right: 1px solid rgba(204, 204, 204, 0.22);

    &__field {
      padding: 12px 0;
      font-size: 14px;
      border-width: 0 0 1px 0;
      margin-bottom: 8px;

      &:focus {
        outline: none;
      }
    }

    &__item {
      display: flex;
      text-align: center;
      justify-content: space-between;
      font-size: 13px;
      text-align: left;
      margin-bottom: 10px;
      cursor: pointer;
    }

    &__item.active {
      font-weight: 600;
    }
  }

  .actions {
    display: flex;
    align-items: center;
  }
</style>
