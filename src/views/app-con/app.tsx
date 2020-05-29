import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import { ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { withRouter } from 'react-router-dom'
import {chargePath,chargeStatisticalPath} from '@src/views/routes/path'
import './app.styl'

interface IState {
    activeItemIndex: number
}
const theme = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

const iconProps: any = {
    fontSize: 'small'
}
const items = [
    {
        icon: {
            tag: DraftsIcon,
        },
        label: '记账',
        path: chargePath
    },
    {
        icon: {
            tag: SendIcon,
        },
        label: '账务统计',
        path: chargeStatisticalPath
    },
]
class App extends React.Component<any, IState> {
    constructor(porp: any) {
        super(porp)
        this.state = {
            activeItemIndex:0
        }
    }
    leapTo(val: string,activeItemIndex:number) {
        const { history } = this.props
        this.setState({activeItemIndex})
        history.push(val)
    }
    render(h = React.createElement) {
        // const {children} = this.props
        const {activeItemIndex} = this.state
        return (
            <div className='flex-row'>
                <Paper className='side_con border-box'>
                    <MenuList  autoFocusItem variant='selectedMenu'>
                        {items.map((el,index:number) => 
                        <MenuItem 
                         key={el.path} onClick={() => this.leapTo(el.path,index)}
                         classes={activeItemIndex==index && {root:'active-item'}}
                         >
                            <ListItemIcon>
                                {
                                    h(el.icon.tag, iconProps)
                                }
                            </ListItemIcon>
                            <Typography variant="inherit">{el.label}</Typography>
                        </MenuItem>)}
                    </MenuList>
                </Paper>
                <div>
                    {this.props.children}
                </div>
            </div>

        );
    }

}

export default withRouter(App)