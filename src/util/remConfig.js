// 判断是否移动端的函数
const isMobileFunc = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  if (flag === null) {
    return 0
  }
  return 1
}

//设置html的字号大小，作为rem的计算依据
const setHtmlFontSize = () => {
  // let designWidth = 750
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (isMobileFunc() === 1) {
    if (htmlWidth > 750) {
      htmlWidth = 7.5 * 50
    }
    //移动端
    document.documentElement.style.fontSize = `${htmlWidth / 7.5}px`

    // 禁止双击放大
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, false)

    let lastTouchEnd = 0
    document.documentElement.addEventListener('touchend', function (event) {
      let now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)

  } else {
    // 非移动端: 1920 / 100 = 19.2  => 1rem = 100px
    let dest = htmlWidth / 19.2

    document.documentElement.style.fontSize = `${dest}px`
  }
}

window.onresize = setHtmlFontSize
setHtmlFontSize()

