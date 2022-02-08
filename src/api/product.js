// 产品接口
import http from '@/utils/request'
const api = {
    category: '/api/appshop/getproductcategorybuildings',
    productList: '/api/assetmanage/getproductcentermodel',
    POPDetail: '/api/assetmanage/getmodeladaptposm'
}
export const getProductCategory = (params) => http.get(api.category, { params })

export const postProductList = data => http.post(api.productList, data)

export const getPOPDetail = params => http.get(api.POPDetail, { params })