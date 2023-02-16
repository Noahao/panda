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
  margin: auto;
  display: flex;
  padding: 1.1rem 0;
  flex-wrap: wrap;

  .list-box {
    width: 3.8rem;
    height: 0.98rem;
    text-align: center;
    line-height: 0.98rem;
    border: 0.01px solid #D8D8D8;
    color: #666666;
    font-size: 0.38rem;
    border-radius: 0.48rem;
    // margin-bottom: 0.8rem;
    margin-bottom: 5%;
    cursor: pointer;
    &:last-child {
      margin: 0;
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
