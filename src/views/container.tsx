import React from 'react';
import { observer,inject } from 'mobx-react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '@src/views/login'
import App from '@src/views/app-con/app'
import Routes from '@src/views/routes'
import {homePath,loginPath} from '@src/views/routes/path.ts'
import LinearProgress from '@material-ui/core/LinearProgress';
import Notify from '@src/components/notify'
import { Color } from '@material-ui/lab/Alert';




@inject('store')
@observer
export default class Container extends React.Component {
    
    render() {

        const {store:{isLoading,hasLogined,notifyMsg,notifyType,} }:any = this.props
        
        return (
                <HashRouter>
                    {isLoading && <LinearProgress />}
                    {/* {createNotify(notifyMsg,notifyType)} */}
                    {<Notify  msg={notifyMsg} type={notifyType}  />}
                    <Redirect  to={hasLogined? homePath:loginPath} />
                    <Switch>
                        <Route path={loginPath} exact component={Login} /> 
                        <Route path={homePath}  render={() =>
                            <App>
                                    {
                                        Routes.map((el,index) => <Route path={el.path} key={index} exact component={el.component} />)
                                    }
                            </App>
                        } />
                    </Switch>
                </HashRouter>
        );
    }

}

