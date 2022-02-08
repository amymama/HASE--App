/**
 * 下载图片[H5PLUS]
 * @param {photoUrl} <图片线上路径> 
 */

function downloadImg(photoUrl) {
  if (window.plus && window.plus.gallery) {
    window.plus.gallery.save(photoUrl, () => {
      // save successfully
      window.plus.nativeUI.toast('Save successfully')
    }, (err) => {
      // save failed
      window.plus.nativeUI.toast(`Save failed: ${err.message}`)
    })
  }
}
  
export default downloadImg