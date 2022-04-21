// TAKE PHOTO
function takePhoto(waterObj, callback) {
  var cmr = plus.camera.getCamera();
  cmr.captureImage(
    function(p) {
      plus.io.resolveLocalFileSystemURL(
        p,
        function(entry) {
          entry.file((file) => {
            const fileReader = new window.plus.io.FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = (e) => {
              const base64Data = e.target.result.toString()
              dealImage(
                base64Data,
                {
                  width: 640,
                  quality: 0.7
                },
                waterObj,
                function(base64) {
                  callback(base64)
                }
              )
            }
          })
        },
        function(e) {
          outLine('Read pic error：' + e.message)
        }
      );
    },
    function() {},
    { filename: '_doc/camera/', index: 1 }
  )
}

// SELECT PIC FROM GALERY
function takefromgalery(waterObj, callback) {
  plus.gallery.pick(
    function(e) {
      for (var i in e.files) {
        plus.io.resolveLocalFileSystemURL(
          e.files[i],
          function(entry) {
            entry.file((file) => {
              const fileReader = new window.plus.io.FileReader()
              fileReader.readAsDataURL(file)
              fileReader.onloadend = (e) => {
                const base64Data = e.target.result.toString()
                dealImage(
                  base64Data,
                  {
                    width: 640,
                    quality: 0.7
                  },
                  waterObj,
                  function(base64) {
                    callback(base64)
                  }
                )
              }
            })
          },
          function(e) {
            outLine('Error reading photo file:' + e.message)
          }
        )
      }
    },
    function() {},
    { filter: 'image', multiple: true }
  )
}

// COMPRESS IMG AND ADD WATER
function dealImage(path, obj, waterObj, callback) {
  var img = new Image()
  img.src = path
  //设置图片跨域
  img.setAttribute('crossOrigin','anoymous')
  img.onload = function() {
    var that = this
    var w = that.width,
      h = that.height,
      scale = w / h
    w = obj.width || w
    h = obj.height || w / scale
    var quality = 0.9
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // add water
    if (waterObj && waterObj.length > 0) {
      ctx.font = '20px Arial'
      ctx.fillStyle = '#FFF'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'Middle'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      // add water text
      waterObj.map((item, index) => {
        ctx.fillText(item, 24, 24 * (index+1))
      })
    }
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    try {
      var base64 = canvas.toDataURL('image/jpeg', quality)
      callback(base64)
    } catch (error) {
      console.log('error'+error)
    }
  }
}


export { takePhoto, takefromgalery, dealImage }