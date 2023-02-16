<template>
  <div class="section-one">
    <div class="time-wrap">
      <p class="time">開園時間：<span>07：30-18：00</span></p>
      <p>開園時間：</p>
      <p style="margin-top: 0.1rem;">午前7時30分 ～午後6時、入園は午後5 時までです</p>
    </div>
    <div class="main-wrap">
      <p class="title">Service</p>
      <p class="text3">ご利用案内</p>
      <div class="list-one-wrap">
        <div class="list-one-box" v-for="(item, index) in listOne" :key="index" @click="jump(item)">
          <MyIcon :name="item.icon" color="#999999" size="0.34rem"/>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="picture-wrap">
        <div class="big-picture">
          <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/H5/index/img01.png" alt="" />
        </div>
        <div class="small-picture">
          <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/H5/index/img02.png" alt="" />
        </div>
      </div>
      <div class="list-two-wrap">
        <div class="list-two-box" v-for="(item, index) in listTwo" :key="index" @click="tabClick(item)">
          <span>{{ strIntercept(item.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { channelcrumbs } from '@/service/apiList/common'
export default {
  name: 'SectionOne',
  data() {
    return {
      listOne: [
        {
          name: '園内カート案内',
          icon: 'jiaotong'
        },
        {
          name: 'ガイドツアー',
          icon: 'yule1'
        },
        {
          name: '園内マップ',
          icon: 'quanjing'
        },
        {
          name: 'アクセス',
          icon: 'luxian'
        }
      ],
      listTwo: []
    }
  },
  computed: {
    strIntercept() {
      return (name) => {
        try {
          return name.includes('（') ? name.substring(0, name.indexOf('（')) : name
        } catch (error) {
          return name
        }
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    tabClick(item) {
      this.$router.push(item.url)
    },
    getList () {
      channelcrumbs({
        channelCode: 'pandaCulture'
      }).then(res => {
        if(res.code === 0) {
          this.listTwo = res.data.subset
        }
      })
    },
    jump(item) {
      channelcrumbs({
        channelCode: 'touristService'
      }).then(res => {
        if(res.code === 0) {
          res.data.subset.forEach(item2 => {
            if(item2.name.includes(item.name)) {
              this.$router.push(item2.url)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-one {

  .time-wrap {
    background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/H5/index/bg1.jpg') no-repeat;
    width: 7.5rem;
    height: 2.8rem;
    background-size: 100%;
    position: relative;
    font-size: .24rem;
    padding: .79rem 0;
    text-align: center;

    .time {
      margin-bottom: .4rem;
      span {
        color: #00AC35;
        display: inline-block;
        border-bottom: 1px solid #00AC35;
      }
    }
  }
  .main-wrap {
    background: url('https://file.daqsoft.com/uploadfile/server/geekui/panda/Japanese/H5/index/bg2.jpg') no-repeat;
    width: 7.5rem;
    min-height: 15.9rem;
    background-size: 100%;
    position: relative;
    padding: .6rem 0 0;

    .text1 {
      text-align: center;
      font-size: .24rem;
      color: #00AC35;
      font-weight: bold;
    }
    .text2 {
      text-align: center;
      margin: .18rem 0 .36rem;
      font-size: .24rem;
      color: #333333;
    }
    .title {
      font-family: 'Edwardian Script ITC';
      color: #eeeeee;
      font-size: 1.6rem;
      text-align: center;
    }
    .text3 {
      font-weight: bold;
      font-size: .24rem;
      text-align: center;
      margin: -0.4rem 0 .5rem;
    }
    .list-one-wrap {
      display: flex;
      justify-content: space-between;
      padding: 0 .39rem;
      .list-one-box {
        text-align: center;
        color: #666666;
        font-size: .24rem;

        p {
          margin-top: .12rem;
        }
      }
    }
    .picture-wrap {
      margin: .7rem auto 1rem;
      position: relative;
      width: 7.1rem;
      height: 7.1rem;
      .big-picture {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 0.01rem solid #EEEEEE;
        padding: .2rem;
        background: #ffffff;

        img {
          width: 100%;
        }
      }
      .small-picture {
        position: absolute;
        top: -0.09rem;
        left: 0.39rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid #EEEEEE;
        padding: .2rem;
        background: transparent;

        img {
          width: 100%;
        }
      }
    }
    .list-two-wrap {
      display: flex;
      justify-content: space-between;
      color: #333333;
      overflow-x: scroll;

      .list-two-box {
        font-size: .24rem;
        padding: .1rem .49rem .1rem .3rem;
        writing-mode: vertical-lr;

        &:not(:last-child) {
          border-right: 0.01rem solid #D2D2D2;
        }
      }
    }
  }
}
</style>
