<template>
  <div class="test-videojs" v-if="url">
    <video id="videoPlayer" ref="myVideo" class="video-js" muted></video>
  </div>
</template>
<script>
import Videojs from 'video.js' // 引入Videojs
export default {
  name: 'videoPlayCom',
  data() {
    return {
      nowPlayVideoUrl: 'https://live.yihtc.com/hls/stream_12/stream_12_live.m3u8',
      vPlayer: null,
    }
  },
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.initVideo(this.url)
  },
  destroyed() {
    this.vPlayer.dispose()
  },
  methods: {
    initVideo(nowPlayVideoUrl) {
      // 这些options属性也可直接设置在video标签上，见 muted
      let options = {
        autoplay: true, // 设置自动播放
        controls: true, // 显示播放的控件
        sources: [
          // 注意，如果是以option方式设置的src,是不能实现 换台的 (即使监听了nowPlayVideoUrl也没实现)
          {
            src: nowPlayVideoUrl,
            type: 'application/x-mpegURL', // 告诉videojs,这是一个hls流
          },
        ],
      }
      // videojs的第一个参数表示的是，文档中video的id
      this.vPlayer = Videojs('videoPlayer', options, function onPlayerReady() {
        //  console.log(myPlyer === this) // 这里返回的是true
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#videoPlayer {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
