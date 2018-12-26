import React from 'react'
import styles from './Header.module.css'

const header = (props) => {
    return (
        <div>
            <div className={styles.flex}>
                <h1>Waqt</h1>
                <p>Work conveniently across timezones.</p>
            </div>
        </div>
    )
}

export default header;