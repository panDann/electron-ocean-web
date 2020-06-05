import Request from '@src/utils/fetch'
import { tokenStorage,userInfoStorage } from '@src/views/consts/localStorage-variables';
import Store from '@src/views/container-store';

interface User {
    role: string
    token: string
    username: string
}

export const login = ({ username = '', password = '' }) => {

    let param = new FormData()
    param.append('username', username)
    param.append('password', password)

    return Request<User>(`user/login`, param)
}

export const logout = async () => {
     let res = await Request(`user/logout`)
     if(res) {
         localStorage.setItem(tokenStorage,'')
         localStorage.setItem(userInfoStorage,'')
         Store.showNotify('退出成功','success')
         Store.hasLogined = false
     }
}