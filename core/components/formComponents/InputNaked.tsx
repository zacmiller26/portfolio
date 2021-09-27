import React from 'react'

import { InputElement, Props as InputProps } from './Input'
import styles from './InputNaked.module.sass'


const InputNaked: React.FC<InputProps> = props => {
  return (
    <InputElement
      {...props}
      inputClassName={styles.input + ' ' + props.inputClassName}
    />
  )
}

export default InputNaked
