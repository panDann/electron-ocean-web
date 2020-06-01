import React from 'react';
import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { TextField, Button, Grid, Paper } from '@material-ui/core';

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
export default function CenteredGrid() {
    const classes = useStyles();
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
                    <Paper className={classes.paper}>
                        <Button color="primary">账务类别</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
