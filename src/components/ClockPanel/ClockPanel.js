import styles from './ClockPanel.module.css'
import React, { Component } from 'react';

import { DateTime } from 'luxon';

import classNames from 'classnames';
import Clock from '../Clock/Clock'


class ClockPanel extends Component {
    
    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.grid}>
                    {
                        this.props.clocks.map((clock, index) => 
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
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ClockPanel;