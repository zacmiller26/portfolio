import React, { useRef } from 'react'

import { useSiteTheme, ThemeOptionsType } from '../../contexts/siteTheme'
import useToggle from '../../hooks/useToggle'
import Dropdown from '../Dropdown'
import styles from './ThemeBar.module.sass'

interface Props {
  className?: string
  top?: boolean
}

const ThemeBar: React.FC<Props> = props => {

  const {
    accent, themeOptions, accentOptions, theme, setTheme, setAccent
  } = useSiteTheme()

  return (
    <div className={styles.root + ' ' + props.className}>
      <OptionsList
        className={styles.themeOptions}
        options={themeOptions}
        selected={theme}
        setOption={setTheme}
        optionType="theme"
        top={props.top}
      />
      <OptionsList
        className={styles.accentOptions}
        options={accentOptions}
        selected={accent}
        setOption={setAccent}
        optionType="accent"
        top={props.top}
      />
    </div>
  )
}

interface OptionsProps {
  className: string
  options: ThemeOptionsType
  selected: string
  setOption: Function
  optionType: string
  top?: boolean
}

const OptionsList: React.FC<OptionsProps> = props => {

  const [isOpen, toggleIsOpen] = useToggle(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <div className={styles.optionsContainer}>
      <button
        className={styles.toggleBtn}
        type="button"
        ref={btnRef}
        onClick={() => toggleIsOpen()}
        data-active={isOpen}
      >
        {props.selected} <i>{props.optionType}</i>
      </button>
      <Dropdown
        show={isOpen}
        close={() => toggleIsOpen(false)}
        btnRef={btnRef}
      >
        <ul
          className={styles.optionsList + ' ' + props.className}
          data-top={props.top}
        >
          {Object.entries(props.options).map(([option, _]) => (
            <li key={option.toString()}>
              <button
                type="button"
                onClick={() => props.setOption(option)}
                data-selected={props.selected === option}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  )

}

export default ThemeBar
