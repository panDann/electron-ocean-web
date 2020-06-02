import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField, Button, Grid, Paper, Dialog, IconButton } from '@material-ui/core';
import ConvexCard from '@src/components/convex-card'
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

interface Categories {
    [category: string]: HTMLElement
    total: HTMLElement
    profit: HTMLElement
}

const chargeCategoriesHeader =(addFunc:Function)=> <Grid  className='charge-cat-con'>
    账务类别
    <Grid item xs></Grid>
    <IconButton className='charge-cat-add' onClick={() =>addFunc()}>
        <AddCircleOutlineIcon />
    </IconButton>
</Grid>
export default function CenteredGrid() {
    const classes = useStyles();
    const [chargeCategories, setChargeCategories] = useState([{ label: 111, number: 111, id: 11 }])
    const [todayCharges, setTodayCharges] = useState([])
    const [addModalVisible, setAaddModalVisible] = useState(false)

    const refs: Categories = {
        category: null,
        total: null,
        profit: null,
    }
    const refTypes = Object.keys(refs)

    setTimeout(() => {
        let temkey = ''
        for (temkey in refs) {
            refs[temkey] = document.getElementById('field-' + temkey)
        }
    }, 0);
    const transpondEnter = (type: string) => {
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

        // if(e.keyCode)
    }
    const deleteChargeCategory = (id: number) => {

    }
    const addChargeCategory=()=>{

    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container justify='space-around' alignItems='center'>
                            <Grid item xs={3} >
                                <TextField onKeyUp={() => transpondEnter('category')} id="field-category" label="Outlined" variant="outlined" />
                            </Grid>
                            <Grid item xs={3} >
                                <TextField onKeyUp={() => transpondEnter('total')} id="field-total" label="Outlined" variant="outlined" />
                            </Grid>
                            <Grid item xs={3} >
                                <TextField onKeyUp={() => transpondEnter('profit')} id="field-profit" label="Outlined" variant="outlined" />
                            </Grid>
                            <Grid item xs={2} >
                                <Button color='primary' variant="outlined" >添加</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <ConvexCard header={chargeCategoriesHeader(addChargeCategory)} color='primary'>
                        {
                            chargeCategories.map(el => <Alert className='margintb10' severity='info' icon={<span>{el.number}</span>} action={<IconButton onClick={() => deleteChargeCategory(el.id)}>
                                <CloseIcon />
                            </IconButton>}>
                                {el.label}</Alert>)
                        }
                    </ConvexCard>
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
                <Grid item xs={6}>
                    <ConvexCard header='今日记账' color='success'>

                    </ConvexCard>
                </Grid>
            </Grid>
        </div>
    );
}
