import React from 'react'
import styles from './Header.module.css'

const header = (props) => {
    return (
        <div>
            <div className={styles.flex}>
                <a href="/" style={{ textDecoration : "none", color: "inherit"}}><h1>Waqt</h1></a>
                <p>Work conveniently across timezones.</p>
            </div>
        </div>
    )
}

export default header;