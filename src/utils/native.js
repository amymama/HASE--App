/*
* [H5+]method init
* @author Sun
*/
function setStatusColor() {
  var vuex = localStorage.getItem('vuex')
  if (vuex) {
    plus.navigator.setStatusBarBackground('#2058AB')
    plus.navigator.setStatusBarStyle('light')
  } else {
    plus.navigator.setStatusBarBackground('#FFF')
    plus.navigator.setStatusBarStyle('dark')
  }
}

function backHome() {
  var first = null
  var webview = plus.webview.currentWebview()
  plus.key.addEventListener('backbutton', () => {
    webview.canBack((e) => {
      if (e.canBack) {
        webview.back()
      } else {
        if (!first) {
          first = new Date().getTime()
          plus.nativeUI.toast('Click again to exit the app', {
            duration: 'short'
          })
          setTimeout(() => {
            first = null
          }, 1000)
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit()
          }
        }
      }
    })
  })
}

document.addEventListener('plusready', () => {
  // 初始化状态栏颜色
  setStatusColor()
  // 短时间出发物理键提示退出
  backHome()
})