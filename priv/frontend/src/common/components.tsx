import * as React from 'react'
import { render } from 'react-dom'
import { DateRangePicker } from '@blueprintjs/datetime'
import * as moment from 'moment-timezone'

export const dateRangePicker = (container: HTMLElement,
    startInput: HTMLInputElement, endInput: HTMLInputElement) => {
  const handleChange = ([newStart, newEnd]: [Date, Date]) => {
    newStart = moment(newStart).startOf('day').toDate()
    newEnd = moment(newEnd).startOf('day').toDate()
    startInput.value = newStart.getTime().toString()
    endInput.value = newEnd.getTime().toString()
  }
  let node: any
  if (startInput.value && endInput.value) {
    const startValue = new Date(startInput.value)
    const endValue = new Date(endInput.value)
    startInput.value = startValue.getTime().toString()
    endInput.value = endValue.getTime().toString()
    node = <DateRangePicker defaultValue={[startValue!, endValue!]} onChange={handleChange} />
  } else {
    node = <DateRangePicker onChange={handleChange} />
  }
  render(node, container)
}
