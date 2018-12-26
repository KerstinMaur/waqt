import styles from './ClockPanel.module.css'
import React, { Component } from 'react';
import classNames from 'classnames';
import Clock from '../Clock/Clock'

class ClockPanel extends Component {
    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.grid}>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                    <Clock/>
                </div>
            </div>
        )
    }
}

export default ClockPanel;