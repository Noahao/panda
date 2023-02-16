<template>
  <div class="header" ref="header">
    <div class="header-box">
      <div class="left">
        <!-- <myIcon size="0.6rem" name="logo" color="#000" />
        <div
          class="title-box"
          @click="
            isOverflow()
            $router.push('/h5')
          "
        >
          <div>成都大熊猫繁育研究基地</div>
          <div>Chengdu Research Base of Giant Panda Breeding</div>
        </div> -->
        <img @click="logoClick" src="https://file.daqsoft.com/uploadfile/server/geekui/padna/h5/en/LOGO.png" alt="" />
      </div>

      <div class="right">
        <!-- 语言 -->
        <div class="language-box" @click="openMore">
          <div class="language">{{this.font || languageName }}</div>
          <myIcon size="0.18rem" name="sanjiao" color="#000" :style="{ transform: isLanguage ? 'rotate(180deg)' : '' }" />
        </div>
        <!-- 菜单 -->
        <img @click="openMenu" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/菜单.png" alt="" />
      </div>
    </div>
    <!-- 语言 -->
    <div ref="languageSelection" :class="isLanguage ? 'language-selection popup' : 'language-selection'">
      <div :class="{ active: languageIndex === index }" @click="languageClick(index)" v-for="(item, index) in language" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    <!-- 菜单 -->
    <div ref="menu" :class="isMenu ? 'menu popup' : 'menu'">
      <div v-for="item in menuList" :key="item.id">
        <p :class="activeCode === item.channelCode ? 'title active' : 'title'" @click.stop="jump(item)">{{ item.name }}</p>
        <ul>
          <li
            :style="{
              marginRight: data.name.length >= 7 ? '0.4rem' : '',
            }"
            :class="activeCode === data.channelCode ? 'active' : ''"
            @click.stop="jump(data)"
            v-for="data in item.subset"
            v-show="!showList.includes(data.channelCode)"
            :key="data.id"
          >
            {{ data.name }}
          </li>
        </ul>
      </div>
    </div>
    <div @click="ishow" v-show="isLanguage || isMenu" class="bg"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { routeCodeJump } from '@/util/routerConfig'
import { channelcrumbs, getNewsList } from '@/service/apiList/common'
import Toast from '@/components/toast'
export default {
  inject: ['jumpDetails'],
  name: 'HeadModule',
  data() {
    return {
      language: [
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
      languageName: '简体中文',
      languageIndex: 0,
      isLanguage: false,
      menuList: [],
      showList: ['axzc1', 'xcdxm', 'gaxmfxax', 'jdxcp', 'lxwm'],
      isMenu: false,
    }
  },
  created() {
    this.channelcrumbs()
    // this.languageName = this.font || '简体中文'
  },
  computed: {
    ...mapState({
      menuListStore: (state) => state.home.menuListStore,
      activeCode: (state) => state.home.activeCode,
      font: (state) => state.home.font,
    }),
  },
  methods: {
    ...mapMutations({
      addMenuList: 'home/addMenuList',
      addActive: 'home/addActive',
      addFont: 'home/addFont',
    }),
    logoClick() {
      this.isOverflow()
      if(this.$route.path === '/h5') {
        this.addFont('')
        sessionStorage.removeItem('fontDefault')
        this.$router.push('/h5')
      } else {
        this.$router.push('/h5')
      }
    },
    openMore() {
      this.isLanguage = !this.isLanguage
      this.isMenu = false
      this.isOverflow(this.isLanguage)
    },
    ishow() {
      this.isMenu = false
      this.isLanguage = false
      this.isOverflow(this.isLanguage)
    },
    openMenu() {
      this.isMenu = !this.isMenu
      this.isLanguage = false
      this.isOverflow(this.isMenu)
    },
    languageClick(i) {
      this.languageIndex = i
      this.isLanguage = false
      this.isOverflow(this.isLanguage)
      this.languageName = this.language[i].name
      localStorage.setItem('siteCode', this.language[i].siteCode)
      sessionStorage.setItem('fontDefault', true)
      this.addFont(this.languageName)
      if(this.languageName !== '繁體中文' && this.languageName !== '简体中文') {
        window.location.href = '/'
      }
      routeCodeJump(this.language[i])
    },
    async channelcrumbs() {
      if (this.menuListStore.length !== 0) {
        this.menuList = this.menuListStore
      } else {
        const res = await channelcrumbs({ channelCode: 'xmjdgw' })
        if (res.code === 0) {
          this.addMenuList(res.data.subset)
          this.menuList = res.data.subset
        }
      }
    },
    isOverflow(show = false) {
      document.body.style.overflow = show ? 'hidden' : ''
    },
    jump(item) {
      this.addActive(item.channelCode)
      this.isMenu = false
      this.isOverflow(this.isMenu)
      if (item.url && item.url.includes('?details')) {
        const params = this.getQueryString(item.url)
        getNewsList({ channelCode: params.details }).then((res) => {
          try {
            if (res.datas.length === 0) {
              Toast({ message: '敬请期待' })
              return
            }
            this.jumpDetails(res.datas[0], params.channelCode)
          } catch (error) {
            return ''
          }
        })
        return
      }
      if (item.url) {
        this.$router.push(item.url)
      }
    },
    getQueryString(url) {
      let ItemArr = []
      let ItemObj = {}
      url
        .substring(url.lastIndexOf('?') + 1, url.length)
        .split('&')
        .map((item) => {
          ItemArr.push(item.split('='))
        })
      ItemArr.map((item) => {
        ItemObj[item[0]] = item[1]
      })
      return ItemObj
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .header-box {
    width: 7.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0 0.3rem 0 0.2rem;
    background: rgba(255, 255, 255, 1);
    justify-content: space-between;
    position: relative;
    z-index: 50;
  }
  .left {
    display: flex;
    img {
      width: 3.87rem;
    }
    > .title-box {
      div {
        margin-left: 0.08rem;
        &:first-child {
          font-weight: 500;
          font-size: 0.28rem;
        }
        &:last-child {
          margin-top: 0.06rem;
          font-weight: 500;
          font-size: 0.14rem;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .language-box {
      display: flex;
      align-items: center;
      .language {
        font-weight: 500;
        font-size: 0.18rem;
        position: relative;
        padding-right: 0.1rem;
        &::after {
          position: absolute;
          top: 0.02rem;
          right: 0;
          content: '';
          width: 0.01rem;
          height: 0.2rem;
          background: rgba(143, 143, 143, 1);
        }
      }
      .iconfont {
        margin-left: 0.1rem;
      }
    }

    > img {
      width: 0.33rem;
      margin-left: 0.3rem;
    }
  }
  > .language-selection {
    z-index: 10;
    position: absolute;
    left: 0;
    top: -4.3rem;
    height: 5.42rem;
    width: 100%;
    background: #fff;
    padding: 0.33rem 0;
    transition: all 0.5s;
    div {
      text-align: center;
      font-size: 0.3rem;
      color: #333333;
      padding: 0.4rem 0;
    }
  }
  .popup {
    top: 1.2rem !important;
  }
  > .menu {
    width: 100%;
    height: 80vh;
    overflow-y: auto;
    background: #fff;
    z-index: 10;
    position: absolute;
    left: 0;
    top: -100vh;
    padding: 0 0.3rem 0.3rem;
    transition: all 0.5s;
    .title {
      font-weight: Bold;
      margin-top: 0.59rem;
      font-size: 0.3rem;
      color: #333333;
      line-height: 1;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        line-height: 1;
        margin-top: 0.39rem;
        min-width: 1.71rem;
        font-weight: 500;
        font-size: 0.24rem;
        color: #666666;
      }
    }
  }
  .bg {
    position: absolute;
    left: 0;
    top: 1.2rem;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .active {
    // color: #15a98d !important;
  }
}
</style>
