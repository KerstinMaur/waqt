import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header'
import ClockPanel from './components/ClockPanel/ClockPanel'
import BarControls from './components/BarControls/BarControls'
import Footer from './components/Footer/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faClock, faGlobeAsia, faTrashAlt, faCircleNotch, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faClock, faGlobeAsia, faTrashAlt, faCircleNotch, faCheckCircle, faExclamationCircle)

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <BarControls />
                    <ClockPanel />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;