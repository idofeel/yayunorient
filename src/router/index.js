import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Routers from './routers';

class Root extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    {Routers.map((item, index) => {
                        return <Route key={index} exact path={item.path} render={props => {
                            return <item.components  {...props} />
                        }} />
                    })}
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </HashRouter>
        )
    }

}
export default Root;