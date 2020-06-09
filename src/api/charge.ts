import Request from '@src/utils/fetch'
import {$notify} from '@src/views/container-store';
import { Validator, IRule } from '@src/utils/tool'

export interface Category {
    id: number
    name: string
    number: string
}

const chargeCategoriesRules: IRule = [
    {
        name: [
            { require: true, message: '请输入账务类别名称' },
        ],
        number: [
            { require: true, message: '请输入账务类别编号' },
            { validator: new RegExp(/\d+/g), message: '编号只能是数字' },
        ],
    }
]

export const addCategory = async (data: Record<string, any>) => {
     
    if (!Validator(data, chargeCategoriesRules)) return

    let res = await Request<string>(`charge/category`, {data})
    $notify(res+'','success')
    return true
}


export const getCategory = (page: number, limit: number) => {

    return Request<Category>(`charge/category?page=${page}&limit=${limit}`, { method: 'GET' })
}


export const deleteCategory = (id: number) => {

    return Request<Category>(`charge/category`, { data: { id }, method: 'DELETE' })
}