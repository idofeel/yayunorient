import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Routers';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'; 
import theme from './utils/baseStyle';

const Root = () => {
  return <MuiThemeProvider theme={theme}>
    <Router />
  </MuiThemeProvider>
}

ReactDOM.render(<Root />, document.getElementById('root'));

// serviceWorker.unregister();
serviceWorker.register();
