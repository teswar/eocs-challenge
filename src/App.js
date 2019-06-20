import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import { AxiosConfig } from './configs'
// import { Dashboard, DashboardPage } from './pages'
import Dashboard from './pages/dashboard/Dashboard'
import { PermanentDrawerLeft } from './pages/board'

class App extends React.Component {

  constructor(props) {
    super(props);
    AxiosConfig.configure();
  }

  render() {
    return (
      // <Dashboard />
      <PermanentDrawerLeft />
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.tsx</code> and save to reload.
      //   </p>
      //   <Dashboard />
      // </div>
    );
  }
}

export default App;
