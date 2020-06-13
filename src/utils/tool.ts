import {$notify} from '@src/views/container-store';


export function obj2formdata(obj: Record<string, any>): FormData {
    let formdata = new FormData(),
        temkey = ''
    for (temkey in obj) {
        formdata.append(temkey, obj[temkey])
    }
    return formdata
}

interface Rule {
    require?: boolean
    message: string
    validator?: Function | RegExp
}

export type IRule = Record<string, Rule[]>[]


export function Validator(obj: Record<string, any> = {}, rules:IRule):boolean {

    let rulesLen = rules.length
    if (!Object.keys(obj).length || !rulesLen) return false

    for (let i = 0; i < rulesLen; i++) {
            let currentIRule = rules[i]
        for (const objKey in currentIRule) {
            if (typeof obj[objKey] === 'undefined') continue
            let keyRules = currentIRule[objKey]
            for (let rule of keyRules) {
               return authRule(obj[objKey],rule)
            }
        }
    }

    return true
}

function authRule(value:any, rule:Rule):boolean{
    if (rule.require && !value) {
        $notify(rule.message || '输入有误')
        return false
    }
    if (rule.validator) {
        if (typeof rule.validator === 'function') {
             return rule.validator(value)
        } else {
            if (rule.validator.test && !rule.validator.test(value)) {
                $notify(rule.message || '输入有误')
                return false
            }
        }
    }
    return true
}

type Formatter = 'MMMM/mm/dd'|'MMMM-mm-dd'
export function formatDate(time:Date|string, formatter:Formatter){

    let date = new Date(time)
    if(!date)return ''
    return formatter.replace('MMMM',date.getFullYear()+'').replace('mm',date.getMonth()+1+'').replace('dd',date.getDate()+'')
}