import * as React from 'react'
import { Link } from 'react-router-dom'

export function createLink(
  to: string,
  classNames: string,
  isActive: boolean,
  children: React.ReactNode
) {
  const finalClassNames = classNames + (isActive ? ' pt-active' : '')
  return <Link className={finalClassNames} to={to} children={children}/>
}

export function isProtectedPath(path: string) {
  return path !== '/'
}
