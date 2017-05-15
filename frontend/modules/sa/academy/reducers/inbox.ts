import { push } from 'react-router-redux'

// Creators
export const setInboxActiveTopic = (topic: string) => push(`?topic=${topic}`)
