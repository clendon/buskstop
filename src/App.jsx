import React, { useState, useEffect } from 'react';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom'; //eslint-disable-line
import MapView from './Map/MapView.jsx'
import Header from './Shared/Header.jsx';
import Footer from './Shared/Footer.jsx';
import Search from './Search/Search.jsx';
import Login from './Login/login.jsx';
import Performer from './Performer/Performer.jsx';

const App = () => (
  <div className="h-screen max-h-screen flex flex-col min-h-full justify-between items-stretch">
<Performer/>
  </div>
);

export default App;


