<template>
  <PCLayout>
    <div class="wrap">
      <PCBanner channelCode="xmwh" />
      <TabList :tabList="tabList" :currentIndex="currentIndex" @itemClick="itemClick"/>
      <div class="list-wrap">
        <div v-for="(item, index) in list" :key="index" class="list-box">
          <div class="img" :style="{'background': `url(${item.cover}) center top no-repeat`, 'background-size': 'cover'}"></div>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="summary">{{ item.summary }}</div>
            <div class="nav">
              <p class="nav-text">查看作品</p>
              <img src="https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaCulture/right-btn2.png" alt="" />
            </div>
          </div>
        </div>
        <pagination :pagination="pagination" @pageChange="pageChange"/>
      </div>
    </div>
  </PCLayout>
</template>

<script>
import TabList from '@/components/PCComponents/PCTabList.vue'
import pagination from '@/components/PCComponents/PCPagination.vue'
export default {
  name: 'pandaCultureList',
  components: {
    TabList,
    pagination
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
          cover: 'https://file.daqsoft.com/uploadfile/server/geekui/panda/PC/pandaCultureList/img03.jpg',
          name: '吴长江',
          summary: '吴长江，男，汉族，四川省南江县人，文学硕士，现为香港特别行政区对外文化交流协会会长，香港特别行政区文学艺术界联合会副主席、香港美术家协会常务副主席、香港艺术研究院院长、香港香江书画院院长，中共中央直属机关党校客座教授，四川省硬笔书法家协会名誉主席，国家一级美术师。'
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 30,
        sizes: [5, 10 ,15, 20]
      },
      newPagination: {}
    }
  },
  methods: {
    itemClick (item, index) {
      this.currentIndex = index
    },
    pageChange (val) {
      this.newPagination = val
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  max-width: 1660px;
  min-width: 1360px;
  margin: auto;

  .list-box {
    width: 100%;
    height: 292px;
    padding: 34px 49px 34px 24px;
    display: flex;
    background: #F5F5F5;
    margin-bottom: 50px;
    cursor: pointer;
    transition: 0.35s all linear;

    .img {
      width: 160px;
      height: 224px;
      margin-right: 24px;
      flex-shrink: 0;
    }

    .text {
      .name {
        color: #333333;
        font-weight: bold;
        font-size: 30px;
        margin-top: 10px;
      }
      .summary {
        font-size: 16px;
        color: #666666;
        @include ellipsisLn(2);
        margin: 25px 0 50px;
        line-height: 28px;
      }
      .nav {
        display: flex;
        color: #666666;
        align-items: center;

        .nav-text {
          font-size: 16px;
          margin-right: 16px;
        }
      }
    }

    &:hover {
      background: white;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
