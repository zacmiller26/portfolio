import React from 'react'

import styles from './Error.module.sass'


interface Props {
  children: React.ReactNode
}

const Error: React.FC<Props> = props => {
  return !props.children ? <React.Fragment /> : (
    <span className={styles.error}>
      {props.children}
    </span>
  )
}

export default Error
