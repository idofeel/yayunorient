import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import App from '../components/test/App';
import Home from '../Page/index';


class Root extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/test" component={App} />
                    <Route exact path="/" component={Home} />
                    <Route>
                        <Redirect to="/test" />
                    </Route>
                </Switch>
            </HashRouter>
        )
    }

}
export default Root;