import QRCode from 'qrcode'
export default {
    methods: {
        /**
         * @description 为列表增加qrcode字段用来保存二维码地址
         * @param {array} list 数据列表 
         * @param {array} keyList 需要生成二维码的字段列表
         * @return {array}
         */
        generateQR(list = [], keyList = []) {
            list.forEach((item) => {
                // 获取生成二维码数据数组 [value1, value2, ...]
                const value = keyList.reduce((valueList, key) => {
                    return [...valueList, item[key]]
                }, [])
                QRCode.toDataURL(value)
                    .then((url) => {
                        item.qrcode = url
                    })
                    .catch((err) => console.log(err))
            })
            return list
        }
    }
}