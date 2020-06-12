import React from 'react';
import Line from 'echarts'
import { createLineOption,LineProp } from './options'
import './index.styl'

    
export type  LineProps = LineProp & {
    width?:string
    height?:string
}
export default function LineChart(param: LineProps) {
    const createId = Math.random() + '',
        {width='100%',height='300px'} = param

    setTimeout(() => {
        let lineInit =  Line.init(document.getElementById(createId) as any)
        lineInit.setOption(createLineOption(param))
    
        window.addEventListener('resize',()=>{
         lineInit.resize()
           })
    }, 0);
    return (
        <div id = {createId} style={{width,height}}>
        </div>
    )
}