import { useState } from "react"

type UseToggleType = [
  boolean,
  (value?: boolean) => void
]

export default function useToggle(defaultValue: boolean) : UseToggleType {

  const [value, setValue] = useState(defaultValue)

  function toggleValue(value?: boolean) {
    setValue(currentValue =>
      typeof value === "boolean" ? value : !currentValue
    )
  }

  return [value, toggleValue]

}
