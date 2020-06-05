

import Axios,{AxiosRequestConfig,AxiosResponse} from 'axios';
import Store from '@src/views/container-store';
import { tokenStorage } from '@src/views/consts/localStorage-variables';

const host = process.env.NODE_ENV == 'development' && `http://localhost:9002/`
const commonTag = 'ocean-web/'

interface ICommonRes<T = any> {
    data: T
    message: string
    code: number
}
Axios.interceptors.request.use( (config:AxiosRequestConfig) =>{
    Store.showLoading()
    config.url = host + commonTag + config.url
    console.log(config.url);
    config.withCredentials = false
    config.headers.token = localStorage.getItem(tokenStorage) || ''
    return config
})
Axios.interceptors.response.use(({data:{code,data,message}}:AxiosResponse) =>{
    Store.hiddenLoading()
    if (code !== 10000) {
        Store.showNotify(message)
        return false
    }
    return data
},
 err => {
    Store.hiddenLoading()
    Store.showNotify('网络请求出错')
 }
)

const  server = Axios.create({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
// export default Axios

export default function request<T>(url: string, data?:FormData | string, config = {}) {
   
    
    return fetch(host + commonTag + url,{
        method:'POST',
        body:data,
        headers: new Headers({
            // 'content-type': 'application/json;charset=utf-8',
            //  'Content-Type':' multipart/form-data',
            //  'Content-Type': 'application/x-www-form-urlencoded',
            token: localStorage.getItem(tokenStorage) || '',
            ...config
        }),
        // credentials: 'include',
        mode:'cors'
        })
        .then((data) => {
            console.log(data);
            
            return data.json()
            // return false

        })
        .then(({ code, data, message }: ICommonRes<T>) => {
            Store.hiddenLoading()
            if (code !== 10000) {
                Store.showNotify(message)
                return false
            }
            return data
        })
        .catch(err => {
            console.log(err);
            
            Store.hiddenLoading()
            Store.showNotify('网络请求出错')
        })
}

function ckeckRes(code: number) {
    switch (code) {
        case 10031:
    }
}