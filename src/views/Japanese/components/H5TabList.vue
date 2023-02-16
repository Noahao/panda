<template>
  <div class="content">
    <div v-if="current === 'dxmkpzs'"  class="list-wrap">
      <div class="list-box active">
        ¿ÆÑ§ÆÕ¼°¥Ç©`¥¿¥Ù©`¥¹
      </div>
    </div>
    <div v-else class="list-wrap" ref="tabLidt">
      <div class="list-box" v-for="(item, index) in tabList" :ref="`tab${item.channelCode}Ref`" :key="index" :class="{active: current === item.channelCode}" @click="tabClick(item)">
        {{ strIntercept(item.name) }}
      </div>
    </div>
    <div class="gradient"></div>
  </div>
</template>

<script>
import { getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'H5TabList',
  data() {
    return {
      tabList: [],
      current: ''
    }
  },
  computed: {
    strIntercept() {
      return (item) => {
        try {
          return item.substring(0, item.indexOf('£¨'))
        } catch (error) {
          return item
        }
      }
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.getChannelSubset(to.query.channelCode)
        this.current = to.query.tab
        this.$nextTick(() => {
          this.scrollLeftTo(to.query.tab)
        })
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.current = this.$route.query.tab
  },
  methods: {
    tabClick(item) {
      this.current = item.channelCode
      this.$emit('activeItem', this.current)
      if(this.$route.meta.title === 'details') {
        this.$router.push({
          path: item.url,
        })
      }else {
        this.$router.replace({
          path: item.url,
        })
      }
    },
    scrollLeftTo(name) {
      setTimeout(() => {
        const ref = `tab${name}Ref`
        const nav = this.$refs.tabLidt
        if(this.$refs[ref]) {
          const title = this.$refs[ref][0]
          const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2
          nav.scrollLeft = to
        }
      },100)
    },
    async getChannelSubset(channelCode) {
      const res = await getChannelSubset({
        channelCode,
      })
      if (res.code === 0) {
        this.tabList = res.data.subset

        if (!this.$route.query.tab) {
          this.$router.replace({
            path: this.tabList[0].url,
            query: {
              channelCode: this.$route.query.channelCode,
              tab: this.tabList[0].channelCode,
            },
          })
        }

        this.$emit('activeItem', this.current)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 6.7rem;
  height: 1rem;
  margin: auto;
  background: #ffffff;
  overflow: hidden;
  position: relative;
  bottom: .5rem;
  box-shadow: 0 0 .4rem 0 rgba(0, 0, 0, 0.1);

  .list-wrap {
    width: auto;
    padding: .3rem;
    height: 100%;
    white-space: nowrap;
    overflow-x: scroll;

    .list-box {
      display: inline-block;
      font-size: .24rem;
      font-weight: bold;
      margin: 0 .4rem;
      position: relative;
    }
    /*&::-webkit-scrollbar {
      display: none;
    }*/
    &::-webkit-scrollbar-thumb {
      background: #333333;
    }
    .active {
      color: #15a98d;

      &::before {
        width: 0.06rem;
        height: 0.06rem;
        content: '';
        position: absolute;
        top: 0.16rem;
        left: -0.16rem;
        background: #00AC35;
        border-radius: 50%;
      }
    }
  }
  .gradient {
    height: 100%;
    width: .5rem;
    position: absolute;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
  }
}
</style>
