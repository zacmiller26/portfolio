import React, { createRef, useEffect } from 'react'

import useArray from '../../hooks/useArray'
import styles from './ScratchNView.module.sass'


interface Props {}
const PANEL_COUNT = 8

const ScratchNView: React.FC<Props> = () => {

  const {
    array: refs
  } = useArray([...Array(PANEL_COUNT * PANEL_COUNT)].map(() => createRef()))

  useEffect(() => {

    const hideNode = (node: any) => node.style.opacity = 0

    refs.forEach(ref => {
      const node = ref.current
      if(node) {
        node.addEventListener('mouseover', () => hideNode(node))
        return node.removeEventListener('mouseover', () => hideNode(node))
      }
    })

  }, [refs])

  return (
    <div className={styles.root}>
      {refs.map((ref, i) => {
        return <div key={i} ref={ref} style={{
          width: `${100/PANEL_COUNT}%`,
          height: `${100/PANEL_COUNT}%`
        }} />
      })}
    </div>
  )
}

export default ScratchNView
