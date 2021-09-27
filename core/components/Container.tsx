import React, { useMemo } from 'react'

import styles from './Container.module.sass'


interface Props {
  className?: string
  children: React.ReactNode
}

const Container: React.FC<Props> = props => {

  const propsClassName = useMemo(() => (
    props.className ? ` ${props.className}` : ''
  ), [props.className])

  return (
    <div className={styles.container + propsClassName}>
      {props.children}
    </div>
  )
  
}

export default Container
