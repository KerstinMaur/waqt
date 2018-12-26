import React from 'react'
import styles from './Footer.module.css'

const footer = (props) => {
    return (
        <div>
            <div className={styles.flex}>
                <a href="https://sarimabbas.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={ { textDecoration : "none", color : "inherit"} }>
                    <h1 className={styles.attribution}>Built with ❤ by Sarim Abbas.</h1>
                </a>
            </div>
        </div>
    )
}

export default footer;