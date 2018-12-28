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
            mode : "location",
        }
    }

    handleMode = (event) => {
        if (this.state.mode === "location") {
            this.setState({
                mode : "time"
            })
        } else {
            // hack to clear on switch
            this.props.handleCheckTime({target : { value : ""}})

            // set to location mode
            this.setState({
                mode: "location"
            })
        }
    }

    handleLocationQuery = async (event) => {
        if (event.key === 'Enter') {

            let res = undefined
            try {
                // make request to geocode api
                res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: event.target.value,
                        key: 'AIzaSyD803rKP9ygtRsX-vUO61n42vUD4b8xb0E'
                    }
                })
            } catch (e) {
                console.log(e)
            }

            // check
            if (res === undefined) {
                return console.log("No response from Geocode API")
            } else {
                console.log(res)
            }
            
            // get data from geocode api
            const geocode = {
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng,
                name: res.data.results[0].address_components[0].long_name
            }

            // make request to timezone api
            // http: //api.timezonedb.com/v2.1/get-time-zone?key=MWZNB46ZMW9N&by=position&format=json&lat=24.8607&lng=67.0011

            const timestamp = Math.trunc(DateTime.utc().toSeconds())
            let res_timezone = undefined
            const url = "https://cors-anywhere.herokuapp.com/http://api.timezonedb.com/v2.1/get-time-zone"
            try {
                res_timezone = await axios.get(url, {
                    params: {
                        by: "position",
                        lat: geocode.lat,
                        lng: geocode.lng,
                        time: timestamp,
                        key: 'MWZNB46ZMW9N',
                        format: "json"
                    }
                })
            } catch (e) {
                console.log(e)
            }

            // check
            if (res_timezone === undefined) {
                return console.log("No response from TimezoneDb API")
            } else {
                console.log(res_timezone)
            }
           
            // create a clock from the two API calls
            const clock = {
                lat : geocode.lat,
                lng : geocode.lng,
                name : geocode.name,
                timezone: res_timezone.data.zoneName,
                isPrimary: false,
            }

            // add the clock to the top state
            this.props.handleAddClock(clock)
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
                        <div className={styles.timeInput}>
                            <input 
                            className={classNames("input", styles.timeInputField)}
                            type="time"
                            onChange={this.props.handleCheckTime}></input>
                            <label className={styles.staticLabel}>Check a time:</label>
                        </div>
                    }
                </div>
            </div>
        )
    }

}

export default BarControls;