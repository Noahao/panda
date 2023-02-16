<template>
  <div class="h5Layout">
    <!-- ҳͷ -->
    <Heads />
    <div class="slot">
      <slot></slot>
    </div>
    <!-- ҳβ -->
    <FooterIndex />
  </div>
</template>

<script>
import Heads from '@/components/header/H5/Heads.vue'
import FooterIndex from '@/components/header/H5/FooterIndex.vue'
export default {
  name: 'H5Layout',
  components: {
    Heads,
    FooterIndex,
  },
}
</script>

<style lang="scss" scoped>
.h5Layout {
  padding-top: 1.2rem;
  max-width: 7.5rem;
  min-height: 100vh;
  margin: auto;
  position: relative;
  overflow-y: hidden;
}
.slot {
  padding-bottom: 5.8rem;
  overflow-x: hidden;
}
::v-deep .footer-index {
  position: absolute;
  bottom: 0;
}
</style>
