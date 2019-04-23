import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/zoom"
            rel="noopener noreferrer"
          >
           主页？
          </a>
          <Button variant="contained" color="primary">
                你好，世界
            </Button>
        </header>
      </div>
    );
  }
}

export default App;
