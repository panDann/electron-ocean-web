import React from 'react';
import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import './index.styl'
interface IPorps {
    header:React.ReactElement|string
    color?:string
    children?:any
}
export default function ConvexCard({header='',color='primary',children}:IPorps) {

    return (
        <React.Fragment>
            <Paper className='convex-con'>
                <div className={`convex-common convex-${color}`}>
                    {header}
                </div>
                {children}
            </Paper>
        </React.Fragment>
    )
}