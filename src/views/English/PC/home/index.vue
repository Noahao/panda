<template>
  <PClayoutEn>
    <Banner />
    <!-- about -->
    <About />
    <!-- Panda World -->
    <World />
    <!-- News -->
    <News />
    <!-- Research -->
    <div class="research">
      <div @click="$router.push('/pc/list?channelCode=ScientificResearchandConservation&tab=AcademicExchanges')">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/AR0I3098_1667289463546.png" alt="" />

        <span>Scientific Research and Conservation</span>
      </div>
      <div @click="$router.push('/pc/details?channelCode=PopularScienceEducation&tab=Introduction')">
        <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/a5870e3dc4ef95e87082a08eb889fab_1667289503166.png" alt="" />

        <span>Popular Science Education</span>
      </div>
    </div>
  </PClayoutEn>
  <!--  -->
</template>

<script>
import Banner from './components/Banner.vue'
import About from './components/About.vue'
import World from './components/World.vue'
import News from './components/News.vue'
export default {
  name: 'PCHome',
  components: {
    Banner,
    About,
    World,
    News,
  },
  data() {
    return {
      list: [
        {
          name: 'Opening hours',
          icon: 'shijian',
        },
        {
          name: 'Traffic routes',
          icon: 'daba',
        },
        {
          name: 'Guide map',
          icon: 'weizhi',
        },
        {
          name: 'Tourist notice',
          icon: 'xinfeng',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.research {
  display: flex;
  > div {
    width: 50%;
    height: 6rem;
    font-weight: 700;
    font-size: 0.5rem;
    text-align: center;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 6rem;
      transition: all 0.5s ease 0.1s;
    }
    &:hover {
      img {
        transform: scale(1.3);
      }
    }
    span {
      position: relative;
      z-index: 10;
      display: block;
      margin-top: 4.04rem;
    }
  }
}
</style>
