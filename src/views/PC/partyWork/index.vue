<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="djgz" />
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
        title: '党建工作',
        desc: '传播党的声音，推动党的工作，展现党的形象',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/partyWork/banner.jpg'
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
