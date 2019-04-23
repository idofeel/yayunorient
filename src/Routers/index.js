import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// 加载路由组件
import Home from '../Home/home';
import Zoom from '../Zoom/zoom';

import Test from '../test';

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/zoom" component={Zoom} />
            <Route exact path="/test" component={Test} />
            <Route>
                <Redirect to="/test" />
            </Route>
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;