import React from "react";
import styles from './style.module.scss'

export default function Core(props){
    const { children } = props;

    return(
        <div className={styles.colLayoutContainer}> {children} </div>
    )
}