// react
import React, { Component } from 'react';
// components
import Clock from '../Clock/Clock'
// styles
import styles from './ClockPanel.module.css'
import classNames from 'classnames';
// redux
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions';
// animation
import posed, { PoseGroup } from 'react-pose';
// time
import { DateTime } from 'luxon';

const ClockPosed = posed.div({
    enter: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
})

class ClockPanel extends Component {

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let date = DateTime.utc()
        this.props.universalDateUpdate(date)
    }

    render() {
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
                                    name={clock.name}
                                    isPrimary={clock.isPrimary}
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

const mapStateToProps = (state) => {
    return {
        universalDate : state.universalDate,
        clocks : state.clocks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        universalDateUpdate: (date) => dispatch({type: actionTypes.UNIVERSAL_UPDATE, payload: { newDate:  date}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClockPanel);