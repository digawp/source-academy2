import * as React from 'react'

export default function NotFound() {
  return (
    <div className="sa-http-error">
      <h2><span className="error-code">404</span> Not Found</h2>
      <p>
        The specified resource cannot be found. If you think that
        this is a bug, please report it to our &nbsp;
        <a href="mailto:support@source-academy.comp.nus.edu.sg">support team</a>
      </p>
    </div>
  )
}