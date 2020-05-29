import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import { HashRouter, Link,Route,Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import Login from '@src/views/login'
import App from '@src/views/app-con/app'
import Routes from '@src/views/routes'
import {homePath,loginPath} from '@src/views/routes/path.ts'

const re = (sta, action) => {
    switch (action.type) {
        case 'add':
            return sta
    }
}

const store = createStore(re, { state: { add: 1 } })
console.log(store.getState());

class Container extends React.Component {
    // constructor() {
    //     this.state = {
    //         add:'1'
    //     }
    // }
    render(h = React.createElement) {
        // const {count,onIncreaseClick} = this.props
        return (
            // <Provider store={store}>
                <HashRouter>
                    <Link to='/login'><Button>test</Button> </Link>
                    <Link to='/home'><Button>home</Button> </Link>
                    <Link to='/home/charge'><Button>charge</Button> </Link>
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
            // </Provider>
        );
    }

}
// const mapState = (state) =>{
//     console.log(111,state);

//     return {
//         count:1
//     }
// }
// const increaseAction = { type: 'increase' }
// function mapDispatchToProps(dispatch) {
//     return {
//       onIncreaseClick: () => dispatch(increaseAction)
//     }
//   }
// export default connect(mapState,mapDispatchToProps)(App)
export default Container