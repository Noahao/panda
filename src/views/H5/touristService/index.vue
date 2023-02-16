<template>
  <H5Layout>
    <H5Banner channelCode="ykfw" />
    <!-- 开放时间 -->
    <OpenTime />
    <!-- 票务服务 -->
    <Ticketing />
    <!-- 观光车服务 -->
    <Sightseeing />
    <!-- 导览地图 -->
    <NavigationMap />
    <!-- 便民服务 -->
    <Convenience />
  </H5Layout>
</template>

<script>
import OpenTime from '@/views/H5/touristService/components/OpenTime.vue'
import Ticketing from '@/views/H5/touristService/components/Ticketing.vue'
import Sightseeing from '@/views/H5/touristService/components/Sightseeing.vue'
import NavigationMap from '@/views/H5/touristService/components/NavigationMap.vue'
import Convenience from '@/views/H5/touristService/components/Convenience.vue'
export default {
  name: 'TouristService',
  components: {
    OpenTime,
    Ticketing,
    Sightseeing,
    NavigationMap,
    Convenience,
  },
}
</script>

<style lang="scss" scoped></style>
