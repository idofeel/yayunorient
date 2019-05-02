import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiThemefrom from '@material-ui/core/styles/createMuiTheme';
import theme from '../utils/baseStyle';
// 加载路由组件
import Home from '../Page/Home/HomePage';
import Zoom from '../Page/Zoom/zoom';

import Test from '../test';
class Routers extends React.Component {
    constructor() {
        super();
        theme.Root = this;
        this.state = {
            theme: theme
        }
    }
    render() {
        return <MuiThemeProvider theme={this.state.theme}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/zoom" component={Zoom} />
                    <Route exact path="/test" component={Test} />
                    <Route>
                        <Redirect to="/test" />
                    </Route>
                </Switch>
            </HashRouter>
        </MuiThemeProvider>
    }
    componentWillUpdate(oldParams, newParams) {
        newParams.theme.Root = this; //方便下次进行全局修改
    }
    setTheme(theme) {
        this.setState({
            theme: createMuiThemefrom({ ...theme })
        });
    }
}

export default Routers;