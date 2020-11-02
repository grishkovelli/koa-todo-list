<template>
  <div class="groups">
    <input
      class="groups__field"
      v-model="state.newGroup"
      placeholder="New group"
      @keyup.enter="createGroup" />

    <div
      class="groups__item"
      :class="{active: state.selectedGroupId === group.id}"
      v-for="group in state.groups"
      :key="group.id"
      @click="selectGroup(group.id)"
      @dragover.prevent
      @drop.stop.prevent="onDrop($event, group.id)"
    >
      {{group.title}}
      <div class="actions" v-if="state.selectedGroupId === group.id">
        <icon-button @click.stop="shareGroup(group.id)" name="share" />
        <icon-button @click.stop="removeGroup(group.id)" name="close" />
      </div>
    </div>
  </div>
</template>

<script>
  import IconButton from './IconButton'
  import {
    state,
    setGroupId,
    onDrop,
    removeGroup,
    createGroup,
    loadGroups
  } from '../store'

  export default {
    name: 'Groups',
    setup () {
      return {
        state,
        setGroupId,
        onDrop,
        removeGroup,
        createGroup,
        loadGroups
      }
    },
    props: {
      name: String
    },
    components: {
      IconButton
    },
    created () {
      this.loadGroups()
    },
    methods: {
      selectGroup (groupId) {
        this.setGroupId(this.state.selectedGroupId === groupId ? null: groupId)
      },
      shareGroup (groupId) {
        console.debug(`Share the group ${groupId}`)
      }
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
      padding: 10px;
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
