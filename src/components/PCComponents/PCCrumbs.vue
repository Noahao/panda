<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a @click="$router.push(crumbsSecond.url1)">{{ crumbsSecond.name || crumbsSecond.title }}</a></el-breadcrumb-item>
      <el-breadcrumb-item v-if="crumbsThird.name !== details.title"><a @click="$router.push(crumbsThird.url1)">{{ crumbsThird.name || crumbsThird.title }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ details.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'PCCrumbs',
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      crumbsSecond: {},
      crumbsThird: {}
    }
  },
  mounted() {
    this.getCrumds()
  },
  methods: {
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
    getCrumds() {
      let params = this.getQueryString(location.href)
      channelcrumbs({
        channelCode: params.channelCode
      }).then(res => {
        this.crumbsSecond = res.data
        this.crumbsThird = res.data.subset.filter(item => item.name === (this.details.channelName !== '学习园地' && this.details.channelName !== '党风廉政' ? this.details.channelName : '党的建设'))[0]
      })
    }
  }
}
</script>

<style scoped>

</style>
