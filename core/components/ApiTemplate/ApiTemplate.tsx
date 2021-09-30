import React, { useEffect, useState } from 'react'
import JSONPretty from 'react-json-pretty'

import Bounce from '../../animations/Bounce'
import styles from './ApiTemplate.module.sass'


interface Props {
  children: React.ReactNode
  isLoading: boolean
  apiResponse?: undefined | null | Object
}

const ApiTemplate: React.FC<Props> = props => {

  const [showApiResult, setShowApiResult] = useState(false)

  useEffect(() => {
    if(!props.isLoading && props.apiResponse) {
      setShowApiResult(true)
    } else {
      setShowApiResult(false)
    }
  }, [props.isLoading, props.apiResponse])

  return (
    <div className={styles.root}>

      <div className={styles.header}>
        <button
          type="button"
          onClick={() => setShowApiResult(false)}
          data-active={showApiResult === false}
          >
          Client Side
        </button>
        <button
          type="button"
          data-active={showApiResult}
          onClick={() => setShowApiResult(true)}
        >
          API Response
        </button>
      </div>

      {!showApiResult && <div className={styles.clientSide}>
        <div>{props.children}</div>
      </div>}

      {showApiResult &&
        <div className={styles.apiResponseSide}>
          {props.apiResponse ? <JSONPretty
            id="json-pretty"
            data={props.apiResponse}
            stringStyle={"color: var(--accent); font-style: italic;"}
            booleanStyle={"color: var(--accent-secondary)"}
            valueStyle={"color: var(--accent-tertiary)"}
            errorStyle="color: var(--accent)"
            keyStyle="font-weight: 500; color: var(--text-jaded)"
            mainStyle={`
              font-size: .9rem;
              font-weight: 400;
              color: var(--text-muted);
              line-height: 1.1rem;
              overflow: scroll
            `}
          >
          </JSONPretty>
          :
          <div><em>No response</em></div>}
        </div>
      }
      {/*<div className={styles.apiSide}>
        <h4>API</h4>
        <div>
          <div>
            {props.isLoading ? <Bounce /> : <em>Inactive</em>}
          </div>
        </div>
      </div>

      <div className={styles.responseSide}>
        <h4>API Response</h4>
        <div>
          {props.apiResponse && <JSONPretty
            id="json-pretty"
            data={props.apiResponse}
            stringStyle={"color: var(--accent); font-style: italic;"}
            booleanStyle={"color: var(--accent-secondary)"}
            valueStyle={"color: var(--accent-tertiary)"}
            errorStyle="color: var(--accent)"
            keyStyle="font-weight: 500; color: var(--text-jaded)"
            mainStyle={`
              font-size: .9rem;
              font-weight: 400;
              color: var(--text-muted);
              line-height: 1.1rem;
              overflow: scroll
            `}
          >
          </JSONPretty>}
        </div>
      </div>*/}

    </div>
  )
}

export default ApiTemplate
