import request from '@/utils/request';


export function clickOne(planet, authorization) {
    if (!authorization) {
        authorization = ''
    }
    request({url: "/addPlanet", method: 'post', headers: {'Authorization': authorization}, data: planet})
}

export function clickOne1(data){
    return request({
        url:"/addPlanet",
        method: 'post',
        data
    })
}

export function getAllPlanet(callback) {
    request.get("/allPlanet").then(res => {
        callback(res)
    })
}

export function getGameCd(callback) {
    request.get("/cd").then(res => {
        callback(res)
    })
}


export function addMsg(msg, callback) {
    request.post("/add/msg", msg).then(res => callback(res))
}

export function addQA(question, callback) {
    request.post("/add/question", question).then(res => callback(res))
}

export function getAllNotice(callback) {
    request.get('/all/notice').then(res => callback(res))
}

export function getAllPlayer(callback) {
    request.get('/all/player').then(res => {
        callback(res)
    })
}

export function getAllPlayer100(callback) {
    request.get('/all/player100').then(res => {
        callback(res)
    })
}

//分享
export function share(authorization) {
    request({url: "/a3", method: 'post', headers: {'Authorization': authorization}})
}

export function getPlayer(authorization, callback) {
    request({url: "/player", method: 'get', headers: {'Authorization': authorization}}).then(res => callback(res))
}

export function getCommunity(callback) {
    request.get('/com').then(res => {
        callback(res)
    })
}

export function submitCode(authorization, str, callback) {
    request({
        url: "/code",
        method: 'post',
        headers: {'Authorization': authorization},
        data: str
    }).then(res => callback(res))
}

export function a2(authorization) {
    request({url: "/a2", method: 'post', headers: {'Authorization': authorization}})
}


// 修改密码
export function getUsers(){
    return request({
        url: `/user/getUsers`,
        method: 'get',
    });
}