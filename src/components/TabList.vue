<template>
  <div class="tab-list" ref="tabLidt">
    <div :class="active === item.channelCode ? 'active item' : 'item'" @click="activeClick(item)" v-for="item in tabList" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabList',
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: null,
    }
  },
  created() {
    if (this.$route.query.channelCode) {
      this.active = this.$route.query.channelCode
      this.$nextTick(() => {
        // this.handleScroll()
      })
    }
  },
  watch: {
    tabList: {
      handler(val) {
        try {
          this.active = this.$route.query.channelCode || val[0].channelCode
          if (this.$route.query.channelCode) {
            const item = val.find((res) => res.channelCode === this.$route.query.channelCode)
            this.$emit('activeItem', item)
          } else {
            this.$emit('activeItem', val[0])
          }
        } catch (error) {
          return ''
        }
      },
      deep: true,
    },
    $route: {
      handler(to) {
        this.$emit('activeItem', {
          channelCode: to.query.channelCode,
        })
        this.active = to.query.channelCode
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    activeClick(item) {
      this.active = item.channelCode
      this.$emit('activeItem', item)
    },
    handleScroll() {
      setTimeout(() => {
        try {
          this.$refs.tabLidt.scrollLeft = 50
          this.$refs.tabLidt.scrollLeft = document.getElementsByClassName('active')[0].offsetLeft - 200
        } catch (error) {
          return ''
        }
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-list {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  // padding-left: 0.1rem;
  padding: 0 0.3rem;
  .item {
    white-space: nowrap;
    // margin-left: 0.2rem;
    font-weight: 500;
    font-size: 0.24rem;
    line-height: 1;
    color: #666666;
    padding: 0.18rem 0.32rem;
    border: 00.01rem solid #d8d8d8;
    border-radius: 0.3rem;
  }
  .active {
    color: #fff;
    background: #15a98d;
    border: 0.01rem solid #15a98d;
  }
}
</style>
