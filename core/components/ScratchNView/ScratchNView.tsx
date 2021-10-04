import React, { createRef, useEffect, useState } from 'react'
import { debounce } from 'lodash'

import useArray from '../../hooks/useArray'
import styles from './ScratchNView.module.sass'


interface Props {}

const ScratchNView: React.FC<Props> = () => {

  const [mouseDown, setMouseDown] = useState(false)

  const {
    array: refs, set: setRefs, push, filter, update
  } = useArray([...Array(10 * 10)].map(() => createRef()))

  useEffect(() => {
    console.log(mouseDown)
  }, [mouseDown])

  useEffect(() => {
    window.addEventListener('mousedown', () => setMouseDown(true))
    window.addEventListener('mouseup', () => setMouseDown(false))
    return () => {
      window.removeEventListener('mousedown', () => setMouseDown(false))
      window.removeEventListener('mouseup', () => setMouseDown(false))
    }
  }, [])

  useEffect(() => {

    /* TODO: incorporate mousedown */
    const hideNode = (node: any) => {
      if(mouseDown) node.style.opacity = 0
    }

    refs.forEach(ref => {
      const node = ref.current
      if(node) {
        node.addEventListener('mouseover', () => hideNode(node))
        return node.removeEventListener('mouseover', () => hideNode(node))
      }
    })

  }, [mouseDown, refs])

  return (
    <div className={styles.root}>
      {refs.map((ref, i) => {
        return <div key={i} ref={ref} />
      })}
    </div>
  )
}

export default ScratchNView
