// �ж��Ƿ��ƶ��˵ĺ���
const isMobileFunc = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  if (flag === null) {
    return 0
  }
  return 1
}

//����html���ֺŴ�С����Ϊrem�ļ�������
const setHtmlFontSize = () => {
  // let designWidth = 750
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (isMobileFunc() === 1) {
    if (htmlWidth > 750) {
      htmlWidth = 7.5 * 50
    }
    //�ƶ���
    document.documentElement.style.fontSize = `${htmlWidth / 7.5}px`

    // ��ֹ˫���Ŵ�
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
    // ���ƶ���: 1920 / 100 = 19.2  => 1rem = 100px
    let dest = htmlWidth / 19.2

    document.documentElement.style.fontSize = `${dest}px`
  }
}

window.onresize = setHtmlFontSize
setHtmlFontSize()

