<template>
  <div class="tab-list" ref="tabLidt">
    <div :ref="`tab${item.channelCode}Ref`"
         @click="tabClick(item)"
         :class="tabCode === item.channelCode ? 'active item' : 'item'"
         v-for="item in tabList"
         :key="item.id">
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
  created() {
    this.getChannelSubset(this.$route.query.tab)
  },
  methods: {
    tabClick(item) {
      this.tabCode = item.channelCode
      this.$emit('activeItem', this.tabCode)
    },
    async getChannelSubset(channelCode) {
      const res = await getChannelSubset({
        channelCode,
      })
      if (res.code === 0) {
        this.tabList = res.data.subset.filter(item => {
          if(this.$route.query.kpzl) {
            return item.channelCode === 'dxmkpzs'
          }
          return item.channelCode !== 'dxmkpzs'
        })
        this.tabCode = this.tabList[0].channelCode
        this.$emit('activeItem', this.tabCode)
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
      },200)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-list {
  margin-bottom: 0.8rem;
  margin-top: -0.41rem;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-top: 0.41rem;
    word-break: break-all;
    display: inline-block;
    min-width: 2rem;
    height: 0.6rem;
    padding: 0 0.2rem;
    background: #f5f5f5;
    font-size: 0.2rem;
    color: #333333;
    text-align: center;
    line-height: 0.6rem;
    margin-right: 0.35rem;
    cursor: pointer;
    &:last-child {
      // margin: 0;
    }
    &:hover {
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
      background-size: 100% 100%;
      width: 0.39rem;
      height: 0.41rem;
    }
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
      background-size: 100% 100%;
      width: 0.39rem;
      height: 0.41rem;
    }
  }
}
</style>
