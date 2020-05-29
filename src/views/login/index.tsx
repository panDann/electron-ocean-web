import React from 'react';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import { TextField, Card,Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2rem 0',
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        card: {
            width: '400px',
            height: '350px',
        }
    }),
);

export default function BasicTextFields() {
    const classes = useStyles();

    return (
        <Card className={`absolute-center flex-column ${classes.card}`}>
            <form className={` flex-column ${classes.root}`} autoComplete="off">
                <TextField id="username" required label="用户名" variant="outlined" />
                <TextField id="password" required label="密码" variant="outlined" />
            </form>
            <Button variant="contained" size='large' color="primary">登录</Button>
        </Card>
    );
}
