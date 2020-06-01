import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
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
            let rightCon = document.getElementById('rightCon')
            if (rightCon.scrollTop == 0) {
                this.setState({ isHiddenBar: false })
            } else {
                this.setState({ isHiddenBar: true })
            }
        }, 100);

    }
    render(h = React.createElement) {
        // const {children} = this.props
        const { activeItemIndex, isFoldMenu,appBarTitle, isHiddenBar } = this.state
        return (
            <div className='flex-row'>
                <Paper className='side_con border-box' style={{ width: isFoldMenu ? $menuFoldWidth : $menuWidth }}>
                    <MenuList autoFocusItem variant='selectedMenu'>
                        {items.map((el, index: number) =>
                            <MenuItem
                                key={el.path} onClick={() => this.leapTo(el, index)}
                                classes={activeItemIndex == index && { root: 'active-item' }}
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
                    <RightHeader title={appBarTitle} className={isHiddenBar && 'is-scorlling'} />
                    <div className='route-view paddinglr1rem'>
                        {/* <Grow
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                        > */}
                            {this.props.children}
                        {/* </Grow> */}
                    </div>
                </div>
            </div>

        );
    }

}

export default withRouter(App)