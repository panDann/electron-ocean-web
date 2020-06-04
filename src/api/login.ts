import Request from '@src/utils/fetch'

export const login = ({username='',password=''}) =>{

    let param = new FormData()
    param.append('username',username)
    param.append('password',password)

    return Request(`user/login`,param)
}