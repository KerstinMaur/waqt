import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './BarControls.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class BarControls extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mode : "time"
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
                        placeholder= "Add location..."></input>
                        :
                        <input className="input" type="time" 
                        placeholder = "Check a time..."></input>
                    }
                </div>
            </div>
        )
    }

}

export default BarControls;