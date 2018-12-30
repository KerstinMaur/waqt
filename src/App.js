// react
import React, { Component } from 'react';

// analytics
import ReactGA from 'react-ga';

// styles
import './App.css';

// components
import Header from './components/Header/Header'
import ClockPanel from './components/ClockPanel/ClockPanel'
import BarControls from './components/BarControls/BarControls'
import Footer from './components/Footer/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faGlobeAsia, faTrashAlt, faCircleNotch, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

// font awesome init
library.add(faClock, faGlobeAsia, faTrashAlt, faCircleNotch, faCheckCircle, faExclamationCircle)

// google analytics init
ReactGA.initialize('UA-131515629-1');
ReactGA.pageview(window.location.pathname + window.location.search);


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