import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faGlobeAsia } from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header/Header'
import ClockPanel from './components/ClockPanel/ClockPanel'
import BarControls from './components/BarControls/BarControls'
import Footer from './components/Footer/Footer'

library.add(faClock, faGlobeAsia)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
            <Header/>
            <BarControls/>
            <ClockPanel/>
        </div>
            <Footer/>
      </div>
    );
  }
}

export default App;


// AIzaSyBfaM8vXQTXUwzCXfM7frCw5ArnyTesGu4