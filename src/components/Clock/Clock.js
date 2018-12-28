import styles from './Clock.module.css'
import React, { Component } from 'react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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

        const designatePrimaryStyle = this.props.isPrimary ? { color : "#4778ff" } : { color : "inherit" }

        return (

            <div className={styles.clockContainer}>
                <div className={styles.top}>
                    <span className={styles.topText}>
                        { this.props.name }
                    </span>
                    <span className={styles.topText}>
                        { date.toLocaleString({ hour: "numeric", minute: "2-digit"}) }
                    </span>
                </div>
                <div className={styles.topNext}>
                    <span className={styles.topNextText}>
                        { date.toLocaleString({ weekday: "short", month: "short", day: "2-digit" }) }
                    </span>
                </div>
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
                 <div className={styles.bottom}>
                    <div 
                        className={styles.delete}
                        id={this.props.unique}
                        onClick={this.props.handleDeleteClock}>
                        <FontAwesomeIcon href="#" icon={["fas", "trash-alt"]}/>
                    </div>
                    <div
                        className={styles.designatePrimary} 
                        onClick={this.props.handlePrimaryZoneChange} 
                        id={this.props.unique}
                        style={ this.props.isPrimary ? { color: "#4778ff"} : { color : ""}}>
                        <FontAwesomeIcon href="#" icon={["fas", "clock"]} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Clock;
