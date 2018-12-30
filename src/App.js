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

    constructor(props) {
        super(props)
        this.state = {
            checkTime : "",
            primaryZone : "",
            clocks : []
        }

        this.handleAddClock = this.handleAddClock.bind(this);
    }

    handlePrimaryZoneChange = (event) => {
        // get index
        const index = parseInt(event.currentTarget.id)

        // fetch clock
        const clock = this.state.clocks[index]

        // get zone
        const zone = clock.timezone

        // modify clocks array
        let clocks_copy = [...this.state.clocks]
        clocks_copy[index].isPrimary = true;
        for (let i = 0; i < clocks_copy.length; i++) {
            if (i !== index) {
                clocks_copy[i].isPrimary = false;
            }
        }

        // set as primary
        this.setState({
            primaryZone : zone,
            clocks : clocks_copy,
        })
    }

    handleAddClock = (clock) => {
        // update primary zone if first clock
        if (this.state.clocks.length === 0) {
            clock.isPrimary = true
            this.setState({
                primaryZone : clock.timezone,
                clocks: [clock, ...this.state.clocks]
            })

        // general case
        } else {
            this.setState({
                clocks: [clock, ...this.state.clocks]
            })
        }
    }

    handleDeleteClock = (event) => {
        // get index
        const index = parseInt(event.currentTarget.id)

        // get clock to remove
        const clock = this.state.clocks[index]

        // remove from array
        let clocks_updated =  this.state.clocks.filter((item) => item !== clock)

        // set state
        this.setState({
            clocks : clocks_updated
        })
    }

    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <BarControls 
                        handleAddClock={this.handleAddClock}
                        />
                    <ClockPanel 
                        clocks={this.state.clocks} 
                        primaryZone={this.state.primaryZone}
                        handlePrimaryZoneChange={this.handlePrimaryZoneChange}
                        handleDeleteClock={this.handleDeleteClock}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;