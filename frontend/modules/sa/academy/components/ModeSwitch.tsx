import * as React from 'react'
import { Button } from '@blueprintjs/core'

export interface IBundleSwitchProps {
  currentMode: string 
  switchMode: () => void
}

export default function BundleSwitch({
  currentMode,
  switchMode
}: IBundleSwitchProps) {
  return <Button onClick={switchMode}>Academy/Game</Button>
}
