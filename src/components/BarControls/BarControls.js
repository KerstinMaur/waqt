import React, { Component } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

import classNames from 'classnames';
import styles from './BarControls.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class BarControls extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mode : "location"
        }
    }

    handleMode = (event) => {
        if (this.state.mode === "location") {
            this.setState({
                mode : "time"
            })
        } else {
            this.setState({
                mode: "location"
            })
        }
    }

    handleLocationQuery = async (event) => {
        if (event.key === 'Enter') {

            // make request to geocode api
            const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: event.target.value,
                    key: 'AIzaSyBfaM8vXQTXUwzCXfM7frCw5ArnyTesGu4'
                }
            })

            // get data from geocode api
            const geocode = {
                lat: await res.data.results[0].geometry.location.lat,
                lng: await res.data.results[0].geometry.location.lng,
                name: await res.data.results[0].address_components[0].long_name
            }

            // make request to timezone api
            const timestamp = DateTime.local().toSeconds()
            const res_timezone = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
                params: {
                    location: await "" + geocode.lat + "," + geocode.lng,
                    timestamp: timestamp,
                    key: 'AIzaSyBfaM8vXQTXUwzCXfM7frCw5ArnyTesGu4'
                }
            })

            const clock = {
                lat : await geocode.lat,
                lng : await geocode.lng,
                name : await geocode.name,
                timezone: await res_timezone.data.timeZoneId,
            }

            this.props.handleAddClock(await clock)
        }
    }

    render() {
        return (
            <div>
                <div className={styles.flex}>
                    {/* mode buttons */}
                    {
                        this.state.mode === "location" ? 
                        <div className='button -green' onClick={this.handleMode}>
                            <FontAwesomeIcon href="#" icon={["fas", "globe-asia"]} size="2x"/>
                        </div>
                        :
                        <div className='button -blue' onClick={this.handleMode}>
                            <FontAwesomeIcon href="#" icon={["fas", "clock"]} size="2x"/>
                        </div>
                    }
                    {/* field input */}
                    {
                        this.state.mode === "location" ? 
                        <input className="input" type="text" 
                        placeholder= "Add location..." onKeyDown={this.handleLocationQuery}></input>
                        :
                        <input className="input" type="time" 
                        placeholder = "Check a time..." 
                        onChange={this.props.handleCheckTime}></input>
                    }
                </div>
            </div>
        )
    }

}

export default BarControls;