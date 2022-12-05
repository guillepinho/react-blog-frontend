// Logic Import
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Component Import
import Login from './pages/Login';
import CreateAcc from './pages/CreateAcc';
import Feira from './pages/Feira';
// CSS Import
import './App.css';
// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import AppProvider from './context/AppProvider';
import firebaseConfig from './firebaseConfig';

function App() {
  const app = initializeApp(firebaseConfig);
  getDatabase(app);
  getAuth(app);
  return (
    <div className="App">
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/novousuario" component={ CreateAcc } />
          <Route exact path="/feira" component={ Feira } />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;
