<template>
  <div class="dropdown" v-click-away="onClickAway">
    <div class="dropdown__button" @click.stop="toggleMenu">
      <icon name="menu" />
    </div>
    <div class="dropdown__content" @click.stop="toggleMenu" v-if="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickAway from '@/directives/click-away'
  import Icon from './Icon'

  export default {
    name: 'ODropdown',
    props: {
      direction: { type: String }
    },
    directives: {
      ClickAway
    },
    data () {
      return {
        isShow: false
      }
    },
    components: {
      Icon
    },
    methods: {
      onClickAway () {
        this.isShow = false
      },
      toggleMenu () {
        this.isShow = !this.isShow
        this.$emit('toggle', this.isShow)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dropdown {
    position: relative;
    display: inline-block;
    user-select: none;

    &__button {
      cursor: pointer;
    }

    &__content {
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.1);
      display: block;
      min-width: 120px;
      position: absolute;
      z-index: 2;
      padding: 3px;
      right: 0;
      top: 0;
    }
  }
</style>
