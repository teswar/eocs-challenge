import * as React from 'react';
import './App.css';
import { AxiosConfig } from './configs'
import { Board } from './pages/board'
import { SnackbarProvider } from 'notistack';

class App extends React.Component {

  constructor(props) {
    super(props);
    AxiosConfig.configure();
  }

  render() {
    return (
      <SnackbarProvider maxSnack={1} autoHideDuration={2000} preventDuplicate={true} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} >
        <Board />
      </SnackbarProvider>);
  }
}

export default App;