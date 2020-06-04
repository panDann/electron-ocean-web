import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import { TextField, Card, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { login } from '@src/api/login'
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
    let [state, setState] = useState({
        isRecordAccount: false,
        form: {
            username: '',
            password: ''
        }
    })
    const handelLogin = async () => {
        let res = await login(state.form)

        console.log(res);
        
    }
    return (
        <Card className={`absolute-center flex-column ${classes.card}`}>
            <form className={` flex-column ${classes.root}`} autoComplete="on">
                <TextField id="username" autoFocus onChange={({target:{value}})=>state.form.username=value} required label="用户名" variant="outlined" />
                <TextField id="password" type='password' onChange={({target:{value}})=>state.form.password=value} required label="密码" variant="outlined" />
            </form>
            <div className='flex-row justify-between width50'>
                <Button variant="contained" size='large' color="primary" onClick={handelLogin} >登录</Button>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.isRecordAccount}
                            onChange={({ target: { checked } }) => setState({ ...state, isRecordAccount: checked })}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="记住账号"
                />
            </div>
        </Card>
    );
}
