<template>
  <H5LayoutEn>
    <Banner />
    <!-- ±³¾°Í¼ -->
    <!-- <div class="img"></div> -->
    <List />
  </H5LayoutEn>
</template>

<script>
import List from './components/List.vue'
import Banner from '@/views/English/components/Banner.vue'
export default {
  name: 'educationList',
  components: {
    Banner,
    List,
  },
}
</script>

<style lang="scss" scoped>
.img {
  width: 7.5rem;
  height: calc(100vh - 1.2rem);
  position: sticky;
  top: 1.2rem;
  left: 0;
  z-index: -1;
}
</style>
