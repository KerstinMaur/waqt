import styles from './Clock.module.css'
import React, { Component } from 'react';
import classNames from 'classnames';
import { DateTime } from 'luxon';

class Clock extends Component {
    constructor(props) {
        super(props)   

        this.state = {
            date: DateTime.local().setZone(props.timezone)
        }
    }

    componentDidMount() {
        if (this.props.checkTime === "") {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let date = DateTime.local().setZone(this.props.timezone)
        this.setState({
            date: date,
        });
    }

    render() {

        let date = NaN

        //  render with specified time in preferred timezone, converted to specified timezone
        if (this.props.checkTime !== "") {
            const hour = parseInt(this.props.checkTime.split(":")[0])
            const minute = parseInt(this.props.checkTime.split(":")[1])
            console.log(hour, minute)
            date = DateTime.fromObject({
                hour:  hour,
                minute: minute,
                zone: this.props.primaryZone
            }).setZone(this.props.timezone)

        // render with local() time converted to specified timezone
        } else {
            date = this.state.date
        }
      
        const secondsAngle = date.second * 6 
        const minutesAngle = date.minute * 6
        const hoursAngle = (date.hour * 30) + (date.minute / 2)

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
                    { this.props.name }
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
