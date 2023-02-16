<template>
  <div class="tab-list" ref="tabLidt">
    <div
      :ref="`tab${item.channelCode}Ref`"
      :class="tabCode === item.channelCode ? 'active item' : 'item'"
      @click="tabClick(item)"
      v-for="item in tabList"
      :key="item.id"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'TabList',
  data() {
    return {
      tabList: [],
      tabCode: '',
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.getChannelSubset(to.query.channelCode)
        this.tabCode = to.query.tab
        this.$nextTick(() => {
          this.scrollLeftTo(to.query.tab)
        })
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.tabCode = this.$route.query.tab
  },
  methods: {
    tabClick(item) {
      this.tabCode = item.channelCode
      this.$emit('activeItem', this.tabCode)
      if (this.$route.meta.title === 'details') {
        this.$router.push({
          path: item.url,
        })
      } else {
        this.$router.replace({
          path: item.url,
        })
      }
    },
    scrollLeftTo(name) {
      setTimeout(() => {
        const ref = `tab${name}Ref`
        // 获取tabLidt的DOM元素，即类名为my-tab的标签
        const nav = this.$refs.tabLidt
        // 获取当前点击的某一个tab的的DOM元素，即类名为my-tab-item的标签
        if(this.$refs[ref]) {
          const title = this.$refs[ref][0]
          // 计算位移偏差
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
        this.$emit('activeItem', this.tabCode)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-list {
  margin-top: -0.41rem;
  width: 100%;
  padding: 0 0.4rem;
  margin-bottom: 0.48rem;
  overflow-x: auto;
  // display: flex;
  white-space: nowrap;
  .item {
    margin-top: 0.41rem;
    word-break: break-all;
    display: inline-block;
    min-width: 2rem;
    height: 0.8rem;
    background: #f5f5f5;
    padding: 0 0.2rem;
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 0.8rem;
    margin-right: 0.35rem;
    // box-shadow: 0 0 0.5rem -0.2rem #7b7b7b;
    &:last-child {
      margin: 0;
    }
  }
  .active {
    background: #15a98d;
    color: #fff;
    position: relative;
    &::after {
      position: absolute;
      top: -0.3rem;
      left: 50%;
      transform: translateX(-50%);
      background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/H5/en/图层 26.png') no-repeat;
      content: '';
      background-size: 100%;
      width: 0.39rem;
      height: 0.41rem;
    }
  }
}
</style>
