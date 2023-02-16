<template>
  <H5LayoutJp>
    <Banner />
    <H5TabList @activeItem="activeItem"/>
    <List :channelCode="channelCode"/>
  </H5LayoutJp>
</template>

<script>
import Banner from '@/views/Japanese/components/Banner.vue'
import H5TabList from '@/views/Japanese/components/H5TabList.vue'
import List from './components/List.vue'
export default {
  name: 'listIndex',
  components: {
    Banner,
    H5TabList,
    List
  },
  data() {
    return {
      channelCode: ''
    }
  },
  methods: {
    activeItem(val) {
      try {
        if(val) {
          this.channelCode = val
        }
      } catch {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
