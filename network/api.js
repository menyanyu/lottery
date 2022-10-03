import {request} from './request.js'
//根据号码查询
export function winningQuery(data){
    return request({
        method:'GET',
        url:'/lottery/numbers',
        data,
    })
}

//根据期号查询
export function periodQuery(data){
    return request({
        method:'GET',
        url:'/lottery/period',
        data,
    })
}

//测试按钮
// export function test() {
//     return request({
//         method:'GET',
//         url:'/test',
//     })
// }