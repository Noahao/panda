<template>
  <div class="section1" ref="welcomeWrap">
    <div class="logo-content">
      <div class="logo-box wow fadeIn" data-wow-duration="1s"></div>
      <img
        class="home-logo wow fadeIn"
        data-wow-duration="1s"
        data-wow-delay="1s"
        src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/home-logo.png"
        ref="homeLogoWrap"
      />
    </div>
    <div class="btn-content wow fadeIn" data-wow-duration="1s" data-wow-delay="1.5s">
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick" />
      <p>备案号：蜀ICP备11021125号-3</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { TimelineMax } from 'gsap'
import { routeCodeJump } from '@/util/routerConfig'
import TabList from './TabList.vue'
export default {
  name: 'SectionOne',
  data() {
    return {
      num: 0,
      homeLogoWrap: null,
      welcomeWrap: null,
      tabList: [
        {
          name: '简体中文',
          siteCode: 'site757910',
        },
        {
          name: '繁體中文',
          siteCode: 'site757910',
        },
        {
          name: 'English',
          siteCode: 'site376781',
        },
        {
          name: '日本語',
          siteCode: 'site199825',
        },
      ],
      currentIndex: 0,
      btnShow: false,
    }
  },
  components: {
    TabList,
  },
  computed: {
    ...mapState({
      font: (state) => state.home.font,
    }),
  },
  mounted() {
    // 页面的 dom 进行赋值
    this.homeLogoWrap = this.$refs.homeLogoWrap
    this.welcomeWrap = this.$refs.welcomeWrap
    this.defaultFont()
  },

  methods: {
    ...mapMutations({
      addFont: 'home/addFont',
    }),
    itemClick(item, index) {
      this.currentIndex = index
      this.addFont('')
      localStorage.setItem('siteCode', item.siteCode)
      if (item.name === '繁體中文') {
        this.addFont('繁體中文')
      }
      this.$emit('completePage', '整个页面的动画完成')
      if (item.name !== '简体中文' && item.name !== '繁體中文') {
        window.location.href = '/'
      }
      sessionStorage.setItem('fontDefault', true)
      routeCodeJump(item)
    },
    defaultFont() {
      this.tabList.forEach((item, index) => {
        if (item.name === (this.font || '简体中文')) {
          this.currentIndex = index
        }
      })
    },
    // 初始化动画
    initAni() {
      const tl = new TimelineMax({
        onComplete: this.animatePageComplete,
      })

      tl.fromTo(
        this.homeLogoWrap,
        1,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.section1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/背景装饰.png') no-repeat;
  background-size: 100%;
  background-position-y: calc(100vh - 1.44rem);
  z-index: 99;

  .logo-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 6rem;
    margin: 0 auto;
    padding-top: 15%;
    .logo-box {
      width: 1.3rem;
      height: 1.88rem;
      background-image: url('https://file.daqsoft.com/uploadfile/server/geekui/xmjd/熊猫基地logo.png');
      background-repeat: no-repeat;
      background-size: 100% auto;
      .logo-img {
        width: 1.3rem;
        height: auto;
      }
    }

    .home-logo {
      margin-top: 0.2rem;
      height: auto;
      width: 100%;
    }
  }

  .btn-content {
    transition: all 0.5s;
    ::v-deep .list-wrap {
      justify-content: center;
    }
    p {
      text-align: center;
      font-size: 0.24rem;
      color: #999999;
    }
  }
  .show {
    opacity: 1;
  }
}

@keyframes go {
  0% {
    background-position-y: 0px;
  }
  100% {
    background-position-y: -136.62rem;
  }
}
</style>
