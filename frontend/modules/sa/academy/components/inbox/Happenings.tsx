import * as React from 'react'
import * as moment from 'moment'
import { groupBy, keys, values } from 'lodash'
import { RouteComponentProps } from 'react-router'

import { Assessment, Happening, User } from 'sa/core/types'
import HappeningCard from './HappeningCard'

export type Props = {
  happenings: {[id: number]: Happening},
  users: {[id: number]: User},
  assessments: {[id: number]: Assessment},
} & RouteComponentProps<any>

type SectionProps = {
  timestamp: number,
  happenings: Happening[],
  user: {[id: number]: User},
  assessment: {[id: number]: Assessment},
}

const Section: React.StatelessComponent<SectionProps> =
  ({ timestamp, happenings, user, assessment }) => {
    const happeningCards = happenings.map(happening => (
      <HappeningCard
        key={happening.id}
        happening={happening}
        users={user}
        assessment={assessment}
      />
    ))

    return (
      <div className="section">
        <h6 className="heading">{moment(timestamp).fromNow()}</h6>
        {happeningCards}
      </div>
    )
  }

const Happenings: React.StatelessComponent<Props> =
  ({ happenings, users, assessments }) => {
    const compare = (n1: number | string, n2: number | string) => {
      if (n1 < n2) {
        return 1
      } else if (n1 > n2) {
        return -1
      } else {
        return 0
      }
    }

    const groups: {[day: number]: Happening[]} = groupBy(
      values(happenings),
      (h) => moment(h.timestamp).startOf('day').valueOf(),
    )

    keys(groups).forEach(key => (
      groups[parseInt(key, 10)].sort(
        (h1, h2) => compare(h1.timestamp, h2.timestamp))
    ))

    const sections = keys(groups)
      .sort(compare)
      .map(key => (
        <Section
          key={key}
          timestamp={parseInt(key, 10)}
          happenings={groups[parseInt(key, 10)]}
          user={users}
          assessment={assessments}
        />
      ))

    return (
      <div className="sa-happenings">
        {sections}
      </div>
    )
  }

export default Happenings
