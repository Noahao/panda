export default {  data() {    return {      top: 0,      fullPath:'',      pageObj: {}    }  },  mounted() {//可以在这里面直接进行滚动条的获取    window.addEventListener('scroll', this.handleScroll, true)    this.fullPath = this.$route.fullPath  },  methods: {    handleScroll() {      this.top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)    },    removeCache() {      setTimeout(() => {        sessionStorage.removeItem('cache')      },500)    }  },  destroyed() {    if(['H5homeDetails','Details','PChomeDetails'].includes(this.$route.name)) {      const obj = {        params: this.params,        top: this.top,        name: this.fullPath,      }      sessionStorage.setItem('cache',JSON.stringify(obj))    }  },}