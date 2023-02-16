<template>
  <H5Layout>
    <H5Banner channelCode="jddt" />
    <TabList :tabList="tabList" @activeItem="activeItem" />
    <List :activeItem="item" />
  </H5Layout>
</template>

<script>
import TabList from '@/components/TabList.vue'
import List from '@/views/H5/baseDynamicList/components/List.vue'
import { getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'BaseDynamicList',
  components: {
    TabList,
    List,
  },
  data() {
    return {
      tabList: [],
      item: {},
    }
  },
  created() {
    this.getChannelSubset()
  },
  methods: {
    async getChannelSubset() {
      const res = await getChannelSubset({
        channelCode: 'jddt',
      })
      try {
        if (res.code === 0) {
          this.tabList = res.data.subset
        }
      } catch (error) {
        return ''
      }
    },
    activeItem(item) {
      this.item = item
    },
  },
}
</script>

<style lang="scss" scoped></style>
