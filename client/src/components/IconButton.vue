<template>
  <div class="icon-button">
    <icon :name="name" />
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 'IconButton',
    props: {
      name: String
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  .icon-button {
    width: 16px;
    height: 16px;
    cursor: pointer;
    border-radius: 3px;
    opacity: 0.5;
    padding: 2px;

    &:hover {
      opacity: 1;
      background-color: rgba(204, 204, 204, 0.22);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
