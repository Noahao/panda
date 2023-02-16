<template>
  <div class="footer-index">
    <div class="phone">
      <p>Copyright ? 2001-2023</p>
      <p>Chengdu Research Base of Giant Panda Breeding</p>
      <!-- <p>Record number: Shu ICP No. 1</p> -->
      <p>Technical support: Chengdu Zhongke Daqi Software Co., Ltd.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterIndexEn',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.footer-index {
  width: 7.5rem;
  min-height: 2.57rem;
  background: #000;
  text-align: center;
  .phone {
    padding-top: 0.74rem;
    p {
      font-weight: 500;
      line-height: 0.36rem;
      font-size: 0.24rem;
      color: #c9c9c9;
    }
  }
}
</style>
