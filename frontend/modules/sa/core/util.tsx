import * as React from 'react'
import { Link } from 'react-router-dom'

export const ACADEMY_BUNDLE_LOADED = 'academy/BUNDLE_LOADED'
export const HOME_BUNDLE_LOADED = 'home/BUNDLE_LOADED'

export const academyBundleLoaded = () => ({
  type: ACADEMY_BUNDLE_LOADED
})

export const homeBundleLoaded = () => ({
  type: HOME_BUNDLE_LOADED
})

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
