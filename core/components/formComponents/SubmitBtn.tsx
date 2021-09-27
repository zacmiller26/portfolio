import React from 'react'

import Dots from '../../animations/Dots'
import styles from './SubmitBtn.module.sass'


interface Props {
  text: React.ReactNode
  onClick?: Function
  disabled?: boolean
  isLoading?: boolean
  isLoadingVerb?: string
}

const SubmitBtn: React.FC<Props> = props => {
  return (
    <button
      className={styles.submitBtn}
      type="submit"
      onClick={() => props.onClick}
      disabled={props.disabled || props.isLoading}
    >
      {props.isLoading ?
        <>{props.isLoadingVerb || 'Submitting'}<Dots /></>
      :
        props.text
       }
    </button>
  )
}

export default SubmitBtn
