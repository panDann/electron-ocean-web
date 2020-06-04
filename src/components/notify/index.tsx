import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notify({msg, type}:{msg:string,type:Color}) {
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(!!msg);
   console.log(3333,open);
   
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div className={classes.root}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
            {msg}
        </Alert>
    </Snackbar>
    </div>
}


