import React from 'react'

import styles from './HeartRate.module.scss'


interface Props {}

const ComponentName: React.FC<Props> = props => {
  return (
    <React.Fragment>
      <div className={styles.root}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px"
          width="150px" height="73px"
          viewBox="0 0 150 73"
          enable-background="new 0 0 150 73"
          xmlSpace="preserve"
        >
          <polyline
            fill="none"
            stroke="var(--accent)"
            stroke-width="3"
            stroke-miterlimit="10"
            points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
          />
        </svg>
        <div className={styles.fadeIn}></div>
        <div className={styles.fadeOut}></div>
      </div>
    </React.Fragment>
  )
}

export default ComponentName
