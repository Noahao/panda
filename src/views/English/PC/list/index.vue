<template>
  <PClayoutEn>
    <BannerPc />
    <!-- ????ͼ -->
    <img class="img" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/bodybg1.jpg" alt="" />
    <List />
  </PClayoutEn>
</template>

<script>
import BannerPc from '@/views/English/components/BannerPc.vue'
import List from './components/List.vue'
export default {
  name: 'listIndex',
  components: {
    BannerPc,
    List,
  },
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: calc(100vh - 1.4rem);
  position: sticky;
  top: 1.4rem;
  left: 0;
  z-index: -1;
}
</style>
