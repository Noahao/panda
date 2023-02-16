<template>
  <H5Layout>
    <H5Banner :channelCode="item.banner" />
    <List :activeItem="item" />
  </H5Layout>
</template>

<script>
import List from './components/List.vue'
export default {
  name: 'BaseDynamicList',
  components: {
    List,
  },
  watch: {
    $route: {
      handler(to) {
        this.item.channelCode = to.query.channelCode
        this.item.banner = to.query.banner
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      banner: '',
      item: {
        channelCode: '',
        banner: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
