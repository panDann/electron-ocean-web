import React from 'react';
import Echarts from 'echarts'
import { PieProp,
    createPieOption} from './options'
import './index.styl'

    
export type  PieProps = PieProp & {
    width?:string
    height?:string
}
export default function LineChart(param: PieProps) {
    const createId = Math.random() + '',
        {width='100%',height='300px'} = param

    setTimeout(() => {
       let pieInit =  Echarts.init(document.getElementById(createId) as any)
       pieInit.setOption(createPieOption(param))
       window.addEventListener('resize',()=>{
        pieInit.resize()
       })
    }, 0);
    return (
        <div id = {createId} style={{width,height}}>
        </div>
    )
}