import React, { useMemo } from 'react'

import styles from './DoubleBounce.module.sass'

interface Props {
  position?: 'center' | 'left' | 'right'
  yAxis?: 'top' | 'center' | 'bottom'
  size?: string
}

const DoubleBounce: React.FC<Props> = (props) => {

  const pos = useMemo(() => props.position || 'center', [props.position])
  const yAxis = useMemo(() => props.yAxis || 'center', [props.yAxis])
  const size = useMemo(() => props.size || 40, [props.size])

  return (
    <div className={styles.spinnerRoot} data-position={pos} data-yaxis={yAxis}>
      <div className={styles.spinner} style={{
        width: size,
        height: size
      }}>
        <div className={styles.doubleBounce1} />
        <div className={styles.doubleBounce2} />
      </div>
    </div>
  )
}

export default DoubleBounce
