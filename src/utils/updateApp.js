import { getAppVersion } from '@/api/app'

/**
 * APP 升级方法
 * @param ismanual <是否手动检测 类型为布尔值>
 **/
function appUpdate (ismanual) {
  if (window.plus) {
    plus.runtime.getProperty(plus.runtime.appid, (inf) => {
      getAppVersion().then((res) => {
        const { success, data } = res
        if (success) {
          var wgtUrl = process.env.VUE_APP_WGT_URL // wgt url
          var ov = inf.version // local version
          var nv = data.Items.new_version  // online version
          if (ov == nv) {
            if (ismanual) {
              var localStore = JSON.parse(localStorage.getItem('vuex'))
              const lang = localStore.app.lang || 'en'
              const latest = lang === 'en' ? 'Already the latest version' : 'هذا هو أحدث نسخة'
              plus.nativeUI.toast(latest)
            }
          } else {
            plus.nativeUI.alert(`Found new version:v${nv}`, (e) => {
              if (e.index == 0) {
                downWgt(wgtUrl)
              }
            }, 'New update', 'Update')
          }
        } else {
          plus.nativeUI.toast(message)
        }
      }).catch(() => {
        plus.nativeUI.toast('Network error')
      })
    })
  }
}
// DWONLOAD WGT
function downWgt(url) {
  var wgtWaiting = window.plus.nativeUI.showWaiting('Start downloading')
  const wgtUrl = url
  const wgtOption = { filename: '_doc/update/', retry: 1 }
  const task = window.plus.downloader.createDownload(wgtUrl, wgtOption, (download, status) => {
    if (status == 200) {
      // INSTALL WGT
      wgtWaiting.setTitle('Installing')
      plus.runtime.install(download.filename, {force: true}, () => {
        wgtWaiting.close()
        plus.nativeUI.alert('Upgrade Completed,\nRestart Application Required!', () => {
          plus.runtime.restart()
        })
      }, (e) => {
        wgtWaiting.close()
        plus.nativeUI.alert('Failed To Upgrade Application!')
      })
    } else {
      plus.nativeUI.alert('Update failed')
      wgtWaiting.close()
    }
  })
  task.addEventListener('statechanged', (download) => {
    switch (download.state) {
      case 2:
        wgtWaiting.setTitle('Connected To Server.')
        break;
      case 3:
        var percent = (download.downloadedSize / download.totalSize) * 100
        wgtWaiting.setTitle(`Downloading: ${parseInt(percent)}%`)
        break;
      case 4:
        wgtWaiting.setTitle('Downloaded')
        break;
    }
  })
  task.start()
}

export default appUpdate