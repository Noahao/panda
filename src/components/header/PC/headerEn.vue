<template>
  <div :class="bg ? 'header-en-bg header-en' : 'header-en'">
    <div class="left">
      <MyIcon
        @click="
          maskShow = true
          isOverflow()
        "
        name="caidan2"
        size="0.12rem"
      />
      <div class="title" @click="$router.push('/')">
        <MyIcon
          name="logo"
          size="0.6rem
        "
        />
        <div>Chengdu Research Base of Giant Panda Breeding</div>
      </div>
    </div>
    <div class="right">
      <MyIcon class="icones" name="yuyan" size="0.32rem" />

      <div class="language">
        English
        <div class="list-child">
          <p v-for="(options, id) in language" :key="id" @click.stop="selectClass(options)">{{ options.name }}</p>
        </div>
      </div>
    </div>

    <div class="mask" :class="{ maskShow: maskShow }">
      <div class="mask-left">
        <div  v-for="item in menuList" :key="item.id" @click="jump(item)">
          {{ item.name }}
          <div class="mask-list-child" v-if="item.subset.length">
            <p v-for="(item2, index2) in item.subset" :key="index2" @click.stop="jump(item2)">{{item2.name}}</p>
          </div>
        </div>
      </div>
      <img class="mask-right wow slideInLeft" data-wow-duration="1s" data-wow-delay=".5s" src="https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/矩形8拷贝.png" alt="" />
      <MyIcon
        @click="
          maskShow = false
          isOverflow()
        "
        name="guanbi-"
        class="back"
        color="#666666"
        size="0.3rem"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { routeCodeJump } from '@/util/routerConfig'
import { channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'HeaderEN',
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  data() {
    return {
      bg: false,
      maskShow: false,
      menuList: [],
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
    }
  },
  created() {
    this.getMenuList()
  },
  computed: {
    ...mapState({
      menuListStore: (state) => state.home.menuListStore,
    }),
  },
  methods: {
    ...mapMutations({
      addMenuList: 'home/addMenuList',
      addFont: 'home/addFont',
    }),
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.bg = scrollTop > 100 ? true : false
    },
    isOverflow() {
      document.body.style.overflow = this.maskShow ? 'hidden' : ''
    },
    async getMenuList() {
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
    selectClass(e) {
      this.languageName = e.name
      localStorage.setItem('siteCode', e.siteCode)
      if(e.name === '繁體中文') {
        this.addFont('繁體中文')
      }
      sessionStorage.setItem('fontDefault', true)
      routeCodeJump(e)
    },
    jump(item) {
      this.$router.push(item.url1)
      this.maskShow = false
      this.isOverflow()
    },
  },
}
</script>

<style lang="scss" scoped>
.header-en {
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 1.4rem;
  padding: 0 0.5rem;
  border-bottom: 0.01rem solid #fff;
  display: flex;
  justify-content: space-between;
  .left {
    padding-top: 0.4rem;
    padding-left: 0.46rem;

    display: flex;
    // align-items: center;
    .iconfont {
      cursor: pointer;
    }
    .icon-caidan2 {
      margin-top: 0.4rem;
    }
    .title {
      cursor: pointer;
      padding-left: 0.2rem;
      margin-left: 0.34rem;
      height: 1rem;
      display: flex;
      position: relative;
      padding-top: 0.11rem;
      border-left: 0.01rem solid #fff;
      div {
        margin-left: 0.19rem;
        font-size: 0.3rem;
        color: #fff;
        margin-top: 0.1rem;
      }
    }
  }
  .right {
    margin-top: 0.3rem;
    height: 1rem;
    display: flex;
    align-items: center;
    &:hover {
        .list-child {
          transform: rotateY(0deg);
          opacity: 1;
        }
        .sign {
          transform: rotateZ(180deg);
        }
      }
    .language {
      font-weight: 400;
      font-size: 0.24rem;
      color: #fff;
      margin-left: 0.3rem;
      border-left: 0.01rem solid #fff;
      padding-left: 0.3rem;
      position: relative;
      cursor: pointer;
      &:hover {
        .list-child {
          transform: rotateY(0deg);
          opacity: 1;
        }
        .sign {
          transform: rotateZ(180deg);
        }
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -0.03rem;
        left: 0.31rem;
        width: 0.8rem;
        height: 0.01rem;
        background: #fff;
      }
    }
    .icones {
      cursor: pointer;
    }
    .list-child {
      padding: 0.25rem 0.6rem 0.1rem 0.25rem;
      background: #ffffff;
      position: absolute;
      top: 0.5rem;
      left: -0.52rem;
      transform: rotateY(90deg);
      opacity: 0;
      transform-origin: 33%;
      transition: all 0.25s;
      border-radius: 0.05rem;
      box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.1);

      p {
        color: #333333;
        margin-bottom: 0.15rem;
        white-space: nowrap;
        font-size: 0.16rem;

        &:hover {
          color: #15a98d;
        }
      }

      &::before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-left: 0.09rem solid transparent;
        border-right: 0.09rem solid transparent;
        border-bottom: 0.12rem solid #ffffff;
        top: -0.11rem;
        left: 0.9rem;
      }
    }
  }
  .iconfont {
    color: #fff;
  }
}
.header-en-bg {
  background: #fff !important;
  .left {
    padding-top: 0rem;
    .title {
      height: 1.4rem;
      // margin-top: -2.8em;
      padding-top: 0.51rem;
      border-left: 0.01rem solid #333 !important;
      div {
        color: #333 !important;
      }
    }
    .icon-caidan2 {
      margin-top: 0.8rem;
    }
  }
  .right {
    .language {
      color: #333 !important;
      border-left: 0.01rem solid #333 !important;
      &::after {
        content: '';
        position: absolute;
        bottom: -0.03rem;
        left: 0.31rem;
        width: 0.8rem;
        height: 0.01rem;
        background: #333 !important;
      }
    }
  }
  .iconfont {
    color: #333 !important;
  }
}
.maskShow {
  width: 100vw !important;
  transition: width 1s;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .back {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      transform: rotateZ(180deg);
    }
  }
  &-left {
    width: 13.4rem;
    height: 100vh;
    height: 90%;
    padding: 0.5rem 0;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: auto 0;
    margin-right: 0.3rem;
    > div {
      word-break: break-all;
      cursor: pointer;
      margin-left: 2.38rem;
      width: 10.02rem;
      // font-size: 0.54rem;
      font-size: 0.32rem;
      font-weight: bold;
      color: #333;
      text-align: right;
      padding: 0.28rem 0;
      line-height: 1;
      &:hover {
        color: #15a98d;
      }
    }
  }
  &-right {
    width: 5.8rem;
    height: 100vh;
  }
  .mask-list-child {
    margin-top: 0.18rem;
    color: #666666;
    font-weight: 500;
    font-size: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    cursor: pointer;
    p {
      margin-top: 10px;
      margin-left: 0.4rem;
      &:hover {
        color: #15A98D;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0.06rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #15a98d;
    height: 1.2rem;
    border-radius: 6rem;
  }
  ::-webkit-scrollbar-track {
    background: #e5e5e5;
    border-radius: 6rem;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:  #15a98d;
  }
}
</style>
