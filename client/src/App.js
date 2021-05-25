import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./component/header/Header";
import {DataProvider} from './GlobalState'
import MainPages from './component/mainpages/pages'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <MainPages/>
      </Router>
    </div>
  );
}

export default App;
