import * as React from 'react'
import { Button, Text } from '@blueprintjs/core'

export default function ProfileTab() {
  const noPadding = { padding: 0 }
  return (
    <div className="profile-tab row">
      <div className="photo" style={noPadding}>
        <img src="http://lorempixel.com/48/48/" />
      </div>
      <div className="name col-xs" style={noPadding}>
        <Text className="name" ellipsize>
          Evan Sebastian
        </Text>
        <div className="stat-bar">
          <span className="stat-bar-fill" />
          Level <b>36</b>
        </div>
      </div>
    </div>
  )
}
