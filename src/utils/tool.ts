import Store from '@src/views/container-store';


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

    let rulesLen = rules.length,
        res = false

    if (!Object.keys(obj).length || !rulesLen) return false

    for (let i = 0; i < rulesLen; i++) {
        for (const objKey in rules[i]) {
            if (typeof obj[objKey] === 'undefined') continue
            let keyRules = rules[i][objKey]

            for (let rule of keyRules) {
                if (rule.require && !obj[objKey]) {
                    Store.showNotify(rule.message || '输入有误')
                    return res
                }
                if (rule.validator) {
                    if (typeof rule.validator === 'function') {
                        if (!rule.validator(obj[objKey])) return res
                    } else {
                        if (rule.validator.test && !rule.validator.test(obj[objKey])) {
                            Store.showNotify(rule.message || '输入有误')
                            return res
                        }
                    }
                }
            }
        }
    }

    return true
}