<template>
  <H5Layout>
    <H5Banner channelCode="jddt" />
    <!-- 基地动态 -->
    <Dynamic />
    <!-- 熊猫趣闻 -->
    <PandaAnecdotes />
    <!-- 焦点活动  -->
    <FocusActivity />
  </H5Layout>
</template>
<script>
import Dynamic from '@/views/H5/baseDynamic/components/Dynamic.vue'
import PandaAnecdotes from '@/views/H5/baseDynamic/components/PandaAnecdotes.vue'
import FocusActivity from '@/views/H5/baseDynamic/components/FocusActivity.vue'
export default {
  name: 'BaseDynamic',
  components: {
    Dynamic,
    PandaAnecdotes,
    FocusActivity,
  },
}
</script>

<style lang="scss" scoped></style>
