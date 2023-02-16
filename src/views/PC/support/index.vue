<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="axzc" />
      <section-one />
      <section-two />
      <section-three />
    </div>
  </PCLayout>
</template>

<script>
import sectionOne from './components/sectionOne.vue'
import sectionTwo from './components/sectionTwo.vue'
import sectionThree from './components/sectionThree.vue'
export default {
  name: 'baseDynamic',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree
  },
  data () {
    return {
      bannerText: {
        title: '爱心支持',
        desc: '帮助可爱的大熊猫，奉献一份爱心，增添一份希望',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/support/banner.jpg'
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
