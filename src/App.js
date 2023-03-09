import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </>
    );
  }
}

export default App;
