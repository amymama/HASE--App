import http from '@/utils/request'
const api = {
    brand: '/api/shoppromotion/competitorbrand',
    promotionList: '/api/shoppromotion/promotionlist',
    newPromotion: '/api/shoppromotion/newpromotion',
    promotionDetail: '/api/shoppromotion/editpromotion',
    searchModel: '/api/shoppromotion/getcompetitormodel'
}

export const getBrand = params => http.get(api.brand, { params })

export const postPromotionList = data => http.post(api.promotionList, data)

export const postAddPromotion = data => http.post(api.newPromotion, data)

export const getPromotionDetail = params => http.get(api.promotionDetail, { params })

export const getModel = params => http.get(api.searchModel, { params })