// 用户接口
import http from '@/utils/request'
const api = {
    getsurveys: '/api/pmt/mobile/guestsurveymobile/getsurveys',
    getsurvey:'/api/pmt/mobile/guestsurveymobile/getsurvey',
    submitsurvey:'/api/pmt/mobile/guestsurveymobile/submitsurvey'

}

// postSurveysList
export function postSurveysList(params) {
    return http.post(api.getsurveys, params)
}

// postSurvey
export function postSurvey(data) {
    return http.post(api.getsurvey, data)
}

// postSubmitsurvey
export function postSubmitSurvey(data) {
    return http.post(api.submitsurvey, data)
}
  












