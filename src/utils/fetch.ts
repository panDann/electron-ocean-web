

import Store from '@src/views/container-store';

const host = process.env.NODE_ENV=='development' && `http://localhost:9002/`
const commonTag = 'ocean-web/'

interface ICommonRes<T> {
    data:T
    message:string
    code:number
}

export default function request<T>(url:string,data:FormData|string,config = {}){
    Store.showLoading()
    return fetch(host+commonTag+url,{
        method:'POST',
        body:data,
        ...config
    })
    .then((data)=>{
        return data.json()
    })
    .then((data:ICommonRes<T>)=>{
        Store.showNotify(data.message)
        Store.hiddenLoading()
        return data
    })
    .catch(err=>{
        Store.hiddenLoading()
        Store.showNotify('网络请求出错')
    })
}