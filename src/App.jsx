import React, { useState, useEffect } from 'react';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom'; //eslint-disable-line
import MapView from './Map/MapView.jsx'
// import Header from './Shared/Header.jsx';
import Footer from './Shared/Footer.jsx';
import Search from './Search/Search.jsx';
import Login from './Login/login.jsx';
import Audience from './Audience/Audience.jsx';
import Performer from './Performer/Performer.jsx';
import Shrek from './Shared/Shrek.jsx';
// sample user data for rendering Audience component
const sampleUser = {
  id: 1, // need to ask nick to change this to int
  name: 'Mickey Mack',
  location: 'Bushwick',
  coordinates: '',
  category: 'Musician',
  description: 'A busker by trade, Mickey Mack is an upright bassist of the people',
  profileImageURL: 'http://placecorgi.com/260/180',
  performer: false, // need to ask nick to change this to bool
  dateAndTime: 'Sept. 1, 2021, 8:00PM',
};

const App = () => (
  <div className="h-screen max-h-screen flex flex-col min-h-full justify-between items-stretch">
    <Router>
      <Switch>
        <Route exact path="/audience">
          <Audience name={sampleUser.name} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/map">
          <MapView />
        </Route>
        <Route exact path="/performer">
          <Performer />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/shrek">
          <Shrek />
        </Route>
      </Switch>
    </Router>
    <Footer menu />
  </div>
);

export default App;
