import React, { useMemo } from 'react'

import styles from './Bubble.module.sass'


interface Props {
  className?: string
  children: React.ReactNode
}

const Bubble: React.FC<Props> = props => {

  const propsClassName = useMemo(() => (
    props.className ? ` ${props.className}` : ''
  ), [props.className])

  return (
    <div className={styles.bubble + propsClassName}>
      {props.children}
    </div>
  )

}

export default Bubble
