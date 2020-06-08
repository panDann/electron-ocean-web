 export interface Categories {
    [category: string]: HTMLElement
    total: HTMLElement
    profit: HTMLElement
}
 
export interface Form {
    number: string
    name: string
} 

export const fieldTypes=['category','total','profit']

export const fieldLabels=['账务类别编号','收入','利润']