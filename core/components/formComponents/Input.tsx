import React, { useEffect, useMemo, useRef, useState } from 'react'

import styles from './Input.module.sass'


export interface Props {
  type: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  hidden?: boolean
  value: string | number
  name: string
  id: string
  noStyle?: boolean
  className?: string
  inputClassName?: string
  label?: string
  focusOnInit?: boolean
  autoComplete?: string
  placeholder?: string
  required?: boolean
  helpText?: string
  flat?: boolean
}

const Input: React.FC<Props> = props => {
  return (
    <div
      className={(props.noStyle ? '' : styles.root) + ' ' + props.className}
      data-hidden={props.hidden === true}
      data-readonly={props.readOnly === true}
    >
      {props.label && <label>{props.label}</label>}
      <InputElement {...props} />
      {props.helpText &&
        <span className={styles.helpText}>{props.helpText}</span>}
    </div>
  )
}

export const InputElement: React.FC<Props> = props => {


  const [active, setActive] = useState(false)
  const ref = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if(props.focusOnInit && ref && ref.current) {
      ref.current.focus()
    }
  }, [props.focusOnInit])

  const pattern = useMemo(() => {
    //return "^\d+\.{0,1}\d{0,2}"
    if(props.type === 'number') return "\\d*"
    return undefined
  }, [props.type])


  return (
    <>
      <input
        className={props.inputClassName}
        //onFocus={() => { !props.readOnly ? setActive(true) : null }}
        //onBlur={() => setActive(false)}
        autoComplete={props.autoComplete}
        type={props.type}
        pattern={pattern}
        value={props.value}
        inputMode={props.type === 'number' ? "decimal" : undefined}
        onChange={props.onChange ? e => props.onChange!(e) : undefined}
        readOnly={props.readOnly}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
        data-active={active}
        data-flat={props.flat ? true : false}
        ref={ref}
      />
    </>
  )

}

export default Input
