<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="ykfw" />
      <section-one />
      <section-two />
      <section-three />
      <section-four />
    </div>
  </PCLayout>
</template>

<script>
import sectionOne from './components/sectionOne.vue'
import sectionTwo from './components/sectionTwo.vue'
import sectionThree from './components/sectionThree.vue'
import sectionFour from './components/sectionFour.vue'
export default {
  name: 'touristService',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour
  },
  data () {
    return {
      bannerText: {
        title: '游客服务',
        desc: '无微不至的贴心关怀，为你的出行保驾护航',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/touristService/banner.jpg'
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  padding-top: 70px;
}
</style>
