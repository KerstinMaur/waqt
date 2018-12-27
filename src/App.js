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

    constructor(props) {
        super(props)
        this.state = {
            checkTime : "",
            primaryZone : "Asia/Karachi",
            clocks : []
        }

        this.handleAddClock = this.handleAddClock.bind(this);
        this.handleCheckTime = this.handleCheckTime.bind(this);
    }

    handleAddClock = (clock) => {
        this.setState({
            clocks : [clock, ...this.state.clocks]
        })
    }

    handleCheckTime = (event) => {
        this.setState({
            checkTime : event.target.value
        })
    }

    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <BarControls 
                        handleAddClock={this.handleAddClock}
                        handleCheckTime={this.handleCheckTime}
                        />
                    <ClockPanel 
                        clocks={this.state.clocks} 
                        primaryZone={this.state.primaryZone}
                        checkTime={this.state.checkTime}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;


// AIzaSyBfaM8vXQTXUwzCXfM7frCw5ArnyTesGu4