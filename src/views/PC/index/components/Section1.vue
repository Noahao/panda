<template>
  <div class="section1" ref="welcomeWrap">
    <div class="logo-content">
      <div class="logo-box" @animationend="animationEnd">
      </div>
      <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/home-logo.png" class="home-logo" ref="homeLogoWrap" />
    </div>
    <div class="btn-content" v-if="btnShow" :class="{show: btnShow}">
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <p class="beian">蜀ICP备11021125号-3</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { TimelineMax } from 'gsap'
import { routeCodeJump } from '@/util/routerConfig'
import TabList from '@/components/PCComponents/PCTabList.vue'
export default {
  name: 'SectionOne',
  data () {
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
    TabList
  },
  computed: {
    ...mapState({
      font: (state) => state.home.font,
    }),
  },
  mounted () {
    // 页面的 dom 进行赋值
    this.homeLogoWrap = this.$refs.homeLogoWrap
    this.welcomeWrap = this.$refs.welcomeWrap
    this.defaultFont()
  },

  methods: {
    ...mapMutations({
      addFont: 'home/addFont',
    }),
    itemClick (item, index) {
      this.currentIndex = index
      localStorage.setItem('siteCode', item.siteCode)
      if(item.name === '繁體中文') {
        this.addFont('繁體中文')
      }
      if(item.name === '简体中文') {
        sessionStorage.setItem('fontDefault', true)
      }
      this.$emit('completePage', '整个页面的动画完成')
      if(item.name !== '简体中文' && item.name !== '繁體中文') {
        window.location.href = '/'
      }
      routeCodeJump(item)
    },
    defaultFont() {
      this.tabList.forEach((item, index) => {
        if(item.name === (this.font || '简体中文')) {
          this.currentIndex = index
        }
      })
    },
    // 初始化动画
    initAni() {
      const tl = new TimelineMax({
        onComplete: this.animatePageComplete
      })

      tl.fromTo(this.homeLogoWrap, 1, {
        opacity: 0
      }, {
        opacity: 1,
      })
    },

    // logo 动画执行结束
    animationEnd() {
      this.initAni()
    },

    // 整个页面的动画完成
    animatePageComplete () {
      this.btnShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.section1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/bg.png') no-repeat;
  background-size: cover;
  z-index: 99;

  .logo-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    padding-top: 15%;

    .logo-box {
      width: 130px;
      height: 188px;
      background-image: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/panda.png');
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% auto;
      animation: 4s go steps(73) 1 forwards;
      .logo-img {
        width: 130px;
        height: auto;
      }
    }

    .home-logo {
      margin-top: 20px;
      height: auto;
      width: 100%;
      opacity: 0;
    }
  }

  .btn-content {
    opacity: 0;
    transition: all .5s;

    ::v-deep .list-wrap {
      justify-content: center;
    }
  }
  .show {
    opacity: 1;
  }
  .beian {
    text-align: center;
    font-size: .24rem;
    color: #666666;
  }
}

@keyframes go {
  0% {
    background-position-y: 0px;
  }
  100% {
    background-position-y: -13662px;
  }
}
</style>
