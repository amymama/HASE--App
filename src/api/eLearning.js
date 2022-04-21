

import http from '@/utils/request'
const api = {
    getcourselist: '/api/pmt/mobile/elearning/getcourselist',
    getelearningcourse:'/api/pmt/mobile/elearning/getelearningcourse',
    elearningcoursefavorite:'/api/pmt/mobile/elearning/elearningcoursefavorite',
    courseclicked:'/api/pmt/mobile/elearning/courseclicked',
    coursefinished:'/api/pmt/mobile/elearning/coursefinished',
    gettest:'/api/pmt/mobile/elearning/gettestpage',
    testclicked:'/api/pmt/mobile/elearning/testclicked',
    getquestionpage:'/api/pmt/mobile/elearning/getquestionpage',
    addtestrecord:'/api/pmt/mobile/elearning/addtestrecord',
    getsharingpage:'/api/pmt/mobile/elearning/getsharingpage',
    getsharing:'/api/pmt/mobile/elearning/getsharing',
    sharingclicked:'/api/pmt/mobile/elearning/sharingclicked'
}

// getCourseList
export function postCourseList(data) {
    return http.post(api.getcourselist,data)
}

// getElearningCourse
export function getElearningCourse(params) {
    return http.get(api.getelearningcourse,{params:params})
}

// postElearningCourseFavorite
export function postElearningCourseFavorite(params) {
    return http.post(api.elearningcoursefavorite,{},{params:params})
}

// getCourseClicked
export function getCourseClicked(params) {
    return http.get(api.courseclicked,{params:params})
}

// getCourseFinished
export function getCourseFinished(params) {
    return http.get(api.coursefinished,{params:params})
}

// postTestList
export function postTestList(data) {
    return http.post(api.gettest,data)
}

// getTestClicked
export function getTestClicked(params) {
    return http.get(api.testclicked,{params:params})
}

// postQuestionPage
export function postQuestionPage(data) {
    return http.post(api.getquestionpage,data)
}

// postAddTestRecord
export function postAddTestRecord(data) {
    return http.post(api.addtestrecord,data)
}

// postSharingPage
export function postSharingPage(data) {
    return http.post(api.getsharingpage,data)
}

// getSharing
export function getSharing(params) {
    return http.get(api.getsharing,{params:params})
}

// getTestClicked
export function getSharingClicked(params) {
    return http.get(api.sharingclicked,{params:params})
}


