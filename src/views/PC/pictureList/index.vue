<template>
  <PCLayout>
    <div class="wrap">
      <Banner :bannerText="bannerText"/>
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <el-row :gutter="20" class="list-wrap">
        <el-col :span="8" v-for="(item, index) in list" :key="index" class="list-box">
          <div class="box">
            <div class="img-box">
              <img class="cloud-img" :src="item.img"/>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </PCLayout>
</template>

<script>
import Banner from '@/components/myComponents/PCBanner.vue'
import TabList from '@/components/PCComponents/PCTabList.vue'
export default {
  name: 'pictureList',
  components: {
    Banner,
    TabList
  },
  data () {
    return {
      bannerText: {
        title: '熊猫文化',
        desc: '了解大熊猫文化，传播大熊猫文化',
        banner: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaCulture/banner.jpg'
      },
      tabList: [
        {
          name: '基地公告'
        },
        {
          name: '基地动态'
        },
        {
          name: '焦点活动'
        },
        {
          name: '熊猫趣闻'
        }
      ],
      currentIndex: 1,
      list: [
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        },
        {
          img: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pictureList/img04.jpg',
          name: '明星熊猫'
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 30,
        sizes: [5, 10 ,15, 20]
      }
    }
  },
  methods: {
    itemClick (item, index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-wrap {
    max-width: 1660px;
    min-width: 1360px;
    margin: auto !important;

    .list-box {
      margin-bottom: 50px;
      .box {
        width: 426px;
        height: 240px;
        margin: auto;
        position: relative;

        img {
          width: 100%;
        }
      }
      .name {
        text-align: center;
        font-weight: Bold;
        font-size: 18px;
        color: #ffffff;
        height: 60px;
        background: rgba(0, 0, 0, 0.3);
        line-height: 60px;
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  }
</style>
