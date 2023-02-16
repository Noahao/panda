<template>
  <div class="section-two">
    <div class="top">
      <div class="img wow bounceInLeft" :style="{'background-image': `url(${existing.backgroundImg || $Placeholder})`,'background-position': 'center', 'background-size': 'cover'}">
      </div>
      <div class="text wow bounceInRight">
        <div class="title">ÏÖ´æ´óÐÜÃ¨</div>
        <div class="line1"></div>
        <div class="classify">
          <div class="list-box" v-for="(item, index) in existingList" :key="index">
            <div class="num">{{ item.summary }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        <div class="line2"></div>
        <div class="desc">{{ existing.summary }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="text wow bounceInLeft">
        <div class="title">¹Ø°®ÐÜÃ¨¡¤·îÏ×°®ÐÄ</div>
        <div class="line1"></div>
        <div class="classify">
          <div class="list-box" v-for="(item, index) in careOfList" :key="index">
            <div class="num">{{ item.summary }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        <div class="line2"></div>
        <div class="desc">{{ careOf.summary }}</div>
      </div>
      <div class="img wow bounceInRight" :style="{'background-image': `url(${careOf.backgroundImg || $Placeholder})`, 'background-position': 'center', 'background-size': 'cover'}">
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelDetail, getChannelSubset } from '@/service/apiList/common'
export default {
  name: 'sectionOne',
  data () {
    return {
      existing: {},
      careOf: {},
      careOfList: [],
      existingList: [],
    }
  },
  mounted() {
    this.getChannelDetail()
    this.getExistingSubset()
    this.getCareOf()
    this.getCareOfSubset()
  },
  methods: {
    async getChannelDetail() {
      const res = await getChannelDetail({ channelCode: 'xcdxm' })
      if (res.code === 0) {
        this.existing = res.data
      }
    },
    async getExistingSubset() {
      const res = await getChannelSubset({ channelCode: 'xcdxm' })
      if (res.code === 0) {
        this.existingList = res.data.subset
      }
    },
    // À¸Ä¿ÏêÇé
    async getCareOf() {
      const res = await getChannelDetail({ channelCode: 'gaxmfxax' })
      if (res.code === 0) {
        this.careOf = res.data
      }
    },
    async getCareOfSubset() {
      const res = await getChannelSubset({ channelCode: 'gaxmfxax' })
      if (res.code === 0) {
        this.careOfList = res.data.subset
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-two {
  width: 100%;
  background: #ffffff;

  .img, .text {
    width: 50%;
    height: 760px;
  }

  .text {
    padding: 73px 120px;
    background: #F5F5F5;

    .title {
      font-weight: Bold;
      font-size: 40px;
      color: #333333;
    }
    .line1 {
      background: #333333;
      height: 2px;
      width: 100%;
      margin: 52px 0 40px;
    }
    .line2 {
      background: #D0D0D0;
      height: 1px;
      width: 100%;
      margin: 45px 0 40px;
    }
    .classify {
      display: flex;
      justify-content: flex-start;

      .list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 90px 0 0;
        .num {
          font-weight: Bold;
          font-size: 60px;
        }
        .name {
          color: #333333;
          font-size: 16px;
        }
      }
    }
    .desc {
      font-size: 18px;
      color: #333333;
      @include ellipsisLn(4);
      line-height: 30px;
    }
  }
  .top {
    display: flex;

    .num {
      color: #15A98D;
    }
  }
  .bottom {
    display: flex;

    .num {
      color: #FBB03F;
    }
  }
}
</style>
