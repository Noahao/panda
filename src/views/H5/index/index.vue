<template>
  <div>
    <!-- 欢迎页面 -->
    <Welcome v-show="show" @completePage="completeSectionOnePage"/>
    <H5Layout v-show="!show">
      <!-- Banner -->
      <Banner />
      <!-- 基本动态 -->
      <Dynamic />
      <!-- 单位公告 -->
      <Announcement />
      <!-- 焦点活动 -->
      <FocusOf />
      <!-- 熊猫趣闻 -->
      <Interesting />
      <!-- 游客服务 -->
      <TouristService />
      <!-- 熊猫Live秀 -->
      <PandaLv />
    </H5Layout>
  </div>
</template>

<script>
import Banner from '@/views/H5/index/components/Banner.vue'
import Dynamic from '@/views/H5/index/components/Dynamic.vue'
import Announcement from '@/views/H5/index/components/Announcement.vue'
import FocusOf from '@/views/H5/index/components/FocusOf.vue'
import Interesting from '@/views/H5/index/components/Interesting.vue'
import TouristService from '@/views/H5/index/components/TouristService.vue'
import PandaLv from '@/views/H5/index/components/PandaLv.vue'
import Welcome from '@/views/H5/index/components/Welcome.vue'
export default {
  name: 'IndexHome',
  components: {
    Banner,
    Dynamic,
    Announcement,
    FocusOf,
    Interesting,
    TouristService,
    PandaLv,
    Welcome,
  },
  data() {
    return {
      show: true,
    }
  },
  created() {
    this.show = !sessionStorage.getItem('fontDefault')
  },
  methods: {
    completeSectionOnePage() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  .title {
    font-size: 0.5rem;
    width: 7.5rem;
    background: red;
  }
  p {
    font-weight: 500;
    height: 0.27rem;
    font-size: 0.28rem;
  }
}
</style>
