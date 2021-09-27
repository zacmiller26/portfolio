import React from 'react'
import ReactDOM from 'react-dom'

import CloseSVG from '../vectors/Close'
import styles from './Modal.module.sass'


export interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  close?: () => void
  isOpen: boolean
  footer?: React.ReactNode
}

const Modal: React.FC<Props> = props => {

  const domEl = typeof document !== 'undefined' ?
    document.getElementById('modal-root')
    :
    null

  return (!domEl || !props.isOpen) ? <React.Fragment /> : ReactDOM.createPortal(
    <div className={styles.modal}>

      {props.close && <>
        <button
          className={styles.easyCloseBtn}
          type="button"
          onClick={() => props.close && props.close()}
        />
      </>}

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft} />
          <div className={styles.headerCenter}>
            {props.title && <h2>{props.title}</h2>}
            {props.description && <p>{props.description}</p>}
          </div>
          <div className={styles.headerRight}>
            {props.close &&
              <button
                className={styles.closeBtn}
                type="button"
                onClick={() => props.close && props.close()}
              >
                <CloseSVG />
              </button>
            }
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div />
          <div>
            <div className={styles.content}>
              {props.children}
            </div>
          </div>
          <div />
        </div>
        <div className={styles.footer}>
          {props.footer}
        </div>
      </div>

    </div>,
    domEl
  )

}

export default Modal
