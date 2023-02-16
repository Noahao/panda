<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="dwzj" />
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
  name: 'animalIndex',
  components: {
    sectionOne,
    sectionTwo,
    sectionThree
  },
  data () {
    return {
      bannerText: {
        title: '动物之家',
        desc: '关爱熊猫，守护国宝，我们在行动',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/animal/banner.jpg'
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
