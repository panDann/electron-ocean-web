import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField, Button, Grid, Paper, Dialog, IconButton } from '@material-ui/core';
import ConvexCard from '@src/components/convex-card'
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCategory, addCategory, deleteCategory } from '@src/api/charge'
import ChargeTable from './components/table'
import {
    Categories,
    fieldTypes,
    fieldLabels,
    Form,
} from './types'
import './index.styl'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


const chargeCategoriesHeader = (addFunc: Function) => <Grid className='charge-cat-con'>
    账务类别
    <Grid item xs></Grid>
    <IconButton className='charge-cat-add' onClick={() => addFunc()}>
        <AddCircleOutlineIcon />
    </IconButton>
</Grid>
export default function CenteredGrid() {
    const classes = useStyles();
    const [chargeCategories, setChargeCategories] = useState([{ label: 111, number: 111, id: 11 }])
    const [todayCharges, setTodayCharges] = useState([
        {
            number: 11,
            name: '1111',
            total: 11,
            profit: 11,
        }
    ])
    const {
        dialogEl,
        dialogClose,
        dialogOpen,
    } = DialogContent({ handleSubmit })

    async function  handleSubmit(form: Form) {
        let res = await addCategory(form)
        if(res){
          dialogClose()
        }
    }
    const deleteChargeCategory = (id: number) => {

    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container justify='space-around' alignItems='center'>
                           {fieldTypes.map((el,index)=> <Grid item xs={3} key={el} >
                                <TextField onKeyUp={() => transpondEnter(el)} id={'field-'+el} label={fieldLabels[index]} variant="outlined" />
                            </Grid>)}
                            <Grid item xs={2} >
                                <Button color='primary' variant="outlined" >添加</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} key='category-con'>
                    <ConvexCard header={chargeCategoriesHeader(() => dialogOpen())} color='primary'>
                        {
                            chargeCategories.map(el => <Alert className='margintb10' severity='info' icon={<span>{el.number}</span>} action={<IconButton onClick={() => deleteChargeCategory(el.id)}>
                                <CloseIcon />
                            </IconButton>}>
                                {el.label}</Alert>)
                        }
                    </ConvexCard>
                </Grid>
                {dialogEl}
                <Grid item xs={6} key='today-con'>
                    <ConvexCard header='今日记账' color='success'>
                        <ChargeTable rows={todayCharges} />
                    </ConvexCard>
                </Grid>
            </Grid>
        </div>
    );
}
function transpondEnter(type: string) {
    const refs: Categories = {
        category: null,
        total: null,
        profit: null,
    }
    const refTypes = Object.keys(refs)
    let temkey = ''
    for (temkey in refs) {
        refs[temkey] = document.getElementById('field-' + temkey)
    }
    let e: any = window.event
    if (e.keyCode && e.keyCode === 13) {
        switch (type) {
            case refTypes[0]:
                refs[refTypes[1]].focus()
                break
            case refTypes[1]:
                refs[refTypes[2]].focus()
                break
            case refTypes[2]:
                refs[refTypes[0]].focus()
                break
            default: break
        }
    }
}

function DialogContent({ handleSubmit }: any) {
    const [addModalVisible, setAaddModalVisible] = useState(false)
    const dialogClose = () => setAaddModalVisible(false)
    const dialogOpen = () => setAaddModalVisible(true)
    const [form, setForm] = useState({
        number: '',
        name: ''
    })

    const dialogEl = <Dialog open={addModalVisible} aria-labelledby="form-dialog-title">
        <div className='padding1rem'>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

            <TextField
                autoFocus
                margin="dense"
                value={form.number}
                id="number"
                onChange={({ target: { value } }) => setForm({...form,number:value})}
                label="编号"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                value={form.name}
                id="name"
                onChange={({ target: { value } }) => setForm({...form,name:value})}
                label="名称"
                fullWidth
            />
        </div>
        <DialogActions>
            <Button onClick={dialogClose} color="primary">
                取消
            </Button>
            <Button onClick={() => handleSubmit(form)} color="primary">
                提交
             </Button>
        </DialogActions>
    </Dialog>
    return {
        dialogEl,
        dialogClose,
        dialogOpen,
    }
}