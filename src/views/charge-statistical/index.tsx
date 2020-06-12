import React from 'react';
// import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField, Button, Grid, Paper, Chip, IconButton, Divider, Typography } from '@material-ui/core';
import ConvexCard from '@src/components/convex-card'
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { $notify } from '@src/views/container-store';
import LineChart,{LineProps} from '@src/components/charts/line'
import PieChart,{PieProps} from '@src/components/charts/Pie'
import {
    getCategory, addCategory, deleteCategory, Category,
    addChargeToday,
    getChargeToday,
    deleteChargeToday,
    ChargeToday
} from '@src/api/charge'
import ChargeTable from './components/table'
import {
    Categories,
    fieldTypes,
    fieldLabels,
    Form,
    ChargeForm
} from './types'
import './index.styl'


interface State {
    totalAndProfitProps:LineProps
    totalPieProps:PieProps
    profitPieProps:PieProps
    startDate: Date
    endDate: Date
}
export default class CenteredGrid extends React.Component<any, State> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            totalAndProfitProps:{
                legend:['收入','利润'],
                xAxis:['2020/03/03','2020/03/03','2020/03/03'],
                data:[
                    [11,11,11],
                    [33,11,11]
                ]
            },
            totalPieProps:{
                title:'各账务收入比例',
                legend:['收入','利润'],
                height:'150px',
                data:[
                   {name:'收入',value:22},
                   {name:'利润',value:22},
                ]
            },
            profitPieProps:{
                title:'各账务利润比例',
                legend:['收入','利润'],
                height:'150px',
                data:[
                    {name:'收入',value:22},
                    {name:'利润',value:22},
                ]
            },
        }
    }

    handleDateChange(param:any, type:string) {

    }
    render() {
        const { startDate, endDate,totalPieProps,
            profitPieProps,totalAndProfitProps } = this.state
        return (
            <div className='root'>

                <Grid container spacing={2}>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                    <Grid item xs={12} md={12}>
                        <Paper className='paper'>
                            <TextField
                                id="date"
                                label="开始时间"
                                type="date"
                                defaultValue="2017-05-24"
                                // className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="date"
                                label="结束时间"
                                type="date"
                                defaultValue="2017-05-24"
                                className='marginlr1rem'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Paper>

                    </Grid>
                    {/* </MuiPickersUtilsProvider> */}
                    <Grid item xs={8}>
                        <Paper className='paper'>
                            <Typography className='primary-color weight600' >
                                收入与利润曲线
                            </Typography>
                            <Divider />
                            
                            <LineChart  {...totalAndProfitProps} />
                        </Paper>
                    </Grid>

                    <Grid item xs={4} key='today-con'>
                        <Paper className='paper'>
                            <PieChart {...totalPieProps} />
                        </Paper>
                        <Paper className='paper margintb1rem'>
                            <PieChart {...profitPieProps} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}