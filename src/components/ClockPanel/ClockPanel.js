import styles from './ClockPanel.module.css'
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

import { DateTime } from 'luxon';

import classNames from 'classnames';
import Clock from '../Clock/Clock'

class ClockPanel extends Component {
    
    render() {

        const ClockPosed = posed.div({
            enter: { y: 0, opacity: 1 },
            exit: { y: 50, opacity: 0 }
        })

        return (
            <div className={styles.panel}>
                <div className={styles.grid}>
                    <PoseGroup>
                    {
                        this.props.clocks.map((clock, index) => 
                            <ClockPosed key={index}>
                                <Clock 
                                    key={index} 
                                    unique={index}
                                    timezone={clock.timezone} 
                                    primaryZone={this.props.primaryZone}
                                    checkTime={this.props.checkTime}
                                    name={clock.name}
                                    isPrimary={clock.isPrimary}
                                    handlePrimaryZoneChange={this.props.handlePrimaryZoneChange}
                                    handleDeleteClock={this.props.handleDeleteClock}
                                /> 
                            </ClockPosed>
                        )
                    }
                    </PoseGroup>
                </div>
            </div>
        )
    }
}

export default ClockPanel;