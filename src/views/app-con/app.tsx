import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter,Redirect } from 'react-router-dom'
import {
    iconProps,
    items
} from './consts'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageRoundedIcon from '@material-ui/icons/FirstPageRounded';
import RightHeader from '@src/views/app-con/conponents/right-header'
import { isFoldMenuStorage } from '@src/views/consts/localStorage-variables'
import Grow from '@material-ui/core/Grow';
import { $menuFoldWidth, $menuWidth } from "@src/styles/variables.json";
import './app.styl'

interface IState {
    activeItemIndex: number
    isFoldMenu: boolean
    isHiddenBar: boolean
    appBarTitle: string
}

let 
    scrollTimer: any = 0

class App extends React.Component<any, IState> {
    constructor(porp: any) {
        super(porp)
        this.state = {
            activeItemIndex: 0,
            isFoldMenu: !!localStorage.getItem(isFoldMenuStorage) || false,
            isHiddenBar: false,
            appBarTitle:'记账'
        }
    }

    leapTo({path='',label=''}, activeItemIndex: number) {
        const { history } = this.props
        this.setState({ activeItemIndex,appBarTitle:label })
        history.push(path)
    }
    handleBar() {

        if (scrollTimer) clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
            this.setState({ isHiddenBar: document.getElementById('rightCon').scrollTop == 0 })
        }, 100);

    }
    render(h = React.createElement) {
        // const {children} = this.props
        const { activeItemIndex, isFoldMenu,appBarTitle, isHiddenBar } = this.state
        return (
            <div className='flex-row'>
                    <Redirect  to={items[0].path}> </Redirect>
                <Paper className='side_con border-box' style={{ width: isFoldMenu ? $menuFoldWidth : $menuWidth }}>
                    <MenuList autoFocusItem variant='selectedMenu'>
                        {items.map((el, index: number) =>
                            <MenuItem
                                key={el.path} onClick={() => this.leapTo(el, index)}
                                classes={{ root:activeItemIndex == index &&  'active-item' }}
                            >
                                <ListItemIcon>
                                    {
                                        h(el.icon.tag, iconProps)
                                    }
                                </ListItemIcon>
                                <Typography variant="inherit">{el.label}</Typography>
                            </MenuItem>)}
                    </MenuList>
                    <IconButton className='fold-btn' onClick={() => (this.setState({ isFoldMenu: !isFoldMenu }), localStorage.setItem(isFoldMenuStorage, !isFoldMenu ? '1' : ''))}>
                        {h(isFoldMenu ? LastPageIcon : FirstPageRoundedIcon, iconProps)}
                    </IconButton>
                </Paper>
                <div id='rightCon' className='right-con' onScroll={this.handleBar.bind(this)}>
                    <RightHeader title={appBarTitle} className={`${!isHiddenBar && 'is-scorlling'}`} />
                    <div className='route-view paddinglr1rem'>
                            {this.props.children}
                    </div>
                </div>
            </div>

        );
    }

}

export default withRouter(App)