<template>
  <div class="PCIndexLayout">
    <!-- ҳͷ -->
    <HeaderCom :bgType="bgType"/>
    <slot></slot>
    <ToTop />
    <FooterCom />
  </div>
</template>

<script>
import HeaderCom from '../header/PC/header.vue'
import FooterCom from '../header/PC/footer.vue'
import ToTop from '../PCComponents/ToTop.vue'
export default {
  name: 'PCLayout',
  components: {
    HeaderCom,
    ToTop,
    FooterCom
  },
  props: {
    bgType: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .PCIndexLayout {
    width: 100%;
    height: 100vh;
    position: relative;
  }
</style>
