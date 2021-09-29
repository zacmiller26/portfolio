import ReactDOM from 'react-dom'

import { useDomEl } from './useDomEl'


export default function usePortal() {

  const domEl = useDomEl()

  return {
    domEl,
    makePortal: (children: React.ReactNode) => (
      domEl.current && ReactDOM.createPortal(children, domEl.current)
    )
  }

}
