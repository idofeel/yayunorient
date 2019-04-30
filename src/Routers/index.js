import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// 加载路由组件
import Home from '../Page/Home/HomePage';
import Zoom from '../Page/Zoom/zoom';

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