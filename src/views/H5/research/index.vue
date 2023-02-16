<template>
  <H5Layout>
    <H5Banner channelCode="kybh" />
    <!-- 科研保护实验室 -->
    <div class="laboratory">
      <div class="title">科研保护实验室</div>
      <p class="text">实验室于1997年在国家计委、四川省计委、成都大熊猫繁育研究 基金会支持下建立。</p>
      <p class="text">
        2001年12月，实验室正式获批为“濒危动物繁殖与保护遗传 四川省重点实验室”。2003年，“博士后科研工作站”成立。
        2007年，成功获批“四川省濒危野生动物保护生物学重点实验室——省部共建国家重点实验室培育基地”。
      </p>
      <p class="text">2018年，院士（专家）创新工作站成立。</p>

      <div class="laboratory-list">
        <div @click="jump(item)" v-for="item in list" :key="item.id">
          <img :src="item.logo" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 图片  -->
    <img style="width: 100%" @click="jump(item)" v-for="item in imgList" :src=" item.backgroundImg || $Placeholder" :key="item.id" />
    <Academic />
  </H5Layout>
</template>
<script>
import Academic from '@/views/H5/research/components/Academic.vue'
import { getNewsList, getChannelDetail } from '@/service/apiList/common'
export default {
  name: 'ResearchIndex',
  inject: ['jumpDetails'],
  components: {
    Academic,
  },
  data() {
    return {
      list: [],
      detail: {},
      imgList: {},
    }
  },
  created() {
    this.getKepuList()
    this.getChannelDetail()
    this.getImg()
  },
  methods: {
    jump(item) {
      getNewsList({ channelCode: item.channelCode }).then((res) => {
        if (res.code === 0) {
          try {
            this.jumpDetails(res.datas[0], 'kybh')
          } catch (error) {
            return ''
          }
        }
      })
    },
    // 获取科研保护实验室下面
    getKepuList() {
      const p1 = getChannelDetail({
        channelCode: 'sysgk',
      }).then((res) => {
        return res.data
      })
      const p2 = getChannelDetail({
        channelCode: 'syszzjg',
      }).then((res) => {
        return res.data
      })
      const p3 = getChannelDetail({
        channelCode: 'yjdw',
      }).then((res) => {
        return res.data
      })
      Promise.all([p1, p2, p3]).then((res) => {
        this.list = res
      })
    },
    getImg() {
      const res1 = getChannelDetail({
        channelCode: 'yjfxjnr',
      }).then((res) => {
        return res.data
      })
      const res2 = getChannelDetail({
        channelCode: 'kyxmjcg',
      }).then((res) => {
        return res.data
      })
      Promise.all([res1, res2]).then((res) => {
        this.imgList = res
      })
    },
    async getChannelDetail() {
      const res = await getChannelDetail({
        channelCode: 'kybhsys',
      })
      if (res.code === 0) {
        this.detail = res.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.laboratory {
  padding: 0 0.36rem;
  text-align: center;
  > .title {
    font-weight: Bold;
    font-size: 0.46rem;
    line-height: 1;
    color: #333333;
    padding: 0.79rem 0 0.5rem;
  }
  > .text {
    font-size: 0.24rem;
    line-height: 0.36rem;
    color: #333;
  }
  > .laboratory-list {
    display: flex;
    justify-content: space-between;
    margin: 0.6rem 0 0.79rem;
    div {
      width: 2.16rem;
      height: 1.7rem;
      border-radius: 0.79rem 0 0.79rem 0;
      background: rgba(245, 245, 245, 0.7);
      img {
        width: 0.45rem;
        padding: 0.4rem 0 0.18rem;
      }
      p {
        font-weight: Bold;
        font-size: 0.26rem;
        text-align: center;
      }
    }
  }
}
.img1 {
  width: 7.5rem;
  height: 5rem;
}
.img2 {
  width: 7.5rem;
  height: 5.5rem;
}
</style>
