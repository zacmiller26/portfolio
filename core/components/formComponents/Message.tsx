import React from 'react'


interface Props {
  children: React.ReactNode
}

const Message: React.FC<Props> = props => {
  return !props.children ? <React.Fragment /> : (
    <>
      <div
        data-container="bubble"
        data-containersize="small"
        data-text="small"
      >
        {props.children}
      </div>
    </>
  )
}

export default Message
