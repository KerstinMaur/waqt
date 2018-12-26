import styles from './Clock.module.css'
import React, { Component } from 'react';
import classNames from 'classnames';
import { DateTime } from 'luxon';

class Clock extends Component {
    constructor(props) {
        super(props)   

        this.state = {
            date: DateTime.local(),
        }
    }

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
        let date = DateTime.local()
        this.setState({
            date: date,
        });
    }

    render() {

        const secondsAngle = this.state.date.second * 6 
        const minutesAngle = this.state.date.minute * 6
        const hoursAngle = (this.state.date.hour * 30) + (this.state.date.minute / 2)

        const hoursTransform = {
            WebkitTransform : 'rotateZ('+ hoursAngle + 'deg)',
            transform : 'rotateZ('+ hoursAngle + 'deg)',
        }

        const minutesTransform = {
            WebkitTransform: 'rotateZ(' + minutesAngle + 'deg)',
            transform: 'rotateZ(' + minutesAngle + 'deg)',
        }

        const secondsTransform = {
            WebkitTransform: 'rotateZ(' + secondsAngle + 'deg)',
            transform: 'rotateZ(' + secondsAngle + 'deg)',
        }

        return (
            <div className={styles.clockContainer}>
                <p className={styles.location}>
                    San Francisco
                </p>
                <article className={classNames(styles.clock)}>
                    <div className={styles.hoursContainer}>
                        <div className={styles.hours} style={hoursTransform}></div>
                    </div>
                    <div className={styles.minutesContainer}>
                        <div className={styles.minutes} style={minutesTransform}></div>
                    </div>
                    <div className={styles.secondsContainer}>
                        <div className={styles.seconds} style={secondsTransform}></div>
                    </div>
                </article>
            </div>
        )
    }
}

export default Clock;
