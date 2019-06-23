import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import { AxiosConfig } from './configs'
import { Board } from './pages/board'

class App extends React.Component {

  constructor(props) {
    super(props);
    AxiosConfig.configure();
  }

  render() {
    return (<Board />);
  }
}

export default App;
