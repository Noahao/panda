<template>
  <div class="list-wrap">
    <div v-for="(item, index) in tabList" :key="index" class="list-box" :class="{active: index === currentIndex}" @click="itemClick(item, index)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCTabList',
  props: {
    tabList: {
      type: Array,
      default () {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    itemClick (item, index) {
      this.$emit('itemClick', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  max-width: 1660px;
  min-width: 1360px;
  margin: auto;
  display: flex;
  padding: 60px 0;
  flex-wrap: wrap;

  .list-box {
    width: 136px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #D8D8D8;
    color: #666666;
    font-size: 20px;
    border-radius: 20px;
    margin-right: 20px;
    cursor: pointer;

    &:first-child {
      margin-bottom: 20px;
    }
    &:hover {
      background: #15A98D;
      color: #ffffff;
    }
  }
  .active {
    color: #ffffff;
    border: 0;
    background: #15A98D;
  }
}
</style>
