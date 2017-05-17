import * as React from 'react'
import * as moment from 'moment'
import { groupBy, keys } from 'lodash'
import { RouteComponentProps } from 'react-router'

import { IAssessment, IHappening, IUser } from 'sa/core/types'
import HappeningCard from './HappeningCard'

export type Props = {
  happening: {[id:number]: IHappening}
  user: {[id:number]: IUser}
  assessment: {[id:number]: IAssessment}
} & RouteComponentProps<any>

type SectionProps = {
  timestamp: number
  happenings: IHappening[]
  user: {[id:number]: IUser}
  assessment: {[id:number]: IAssessment}
}

const Section: React.StatelessComponent<SectionProps> =
  ({ timestamp, happenings, user, assessment }) => (
    <div className="section">
      <h6 className="heading">{moment(timestamp).fromNow()}</h6>
      {happenings.map(happening =>
        <HappeningCard
           key={happening.id}
           happening={happening}
           user={user}
           assessment={assessment} />)}
    </div>
  )

const Happening: React.StatelessComponent<Props> =
  ({ happening, user, assessment }) => {
    const happenings: IHappening[] = keys(happening)
      .map(k => happening[parseInt(k, 10)])

    const compare = (n1: number | string, n2: number | string) => {
      if (n1 < n2) {
        return 1
      } else if (n1 > n2) {
        return -1
      } else {
        return 0
      }
    }

    const groups: {[day: number]: IHappening[]} = groupBy(
      happenings,
      (h) => moment(h.timestamp).startOf('day').valueOf()
    )

    for (let day of Object.keys(groups)) {
      groups[parseInt(day, 10)].sort(
        (h1, h2) => compare(h1.timestamp, h2.timestamp))
    }
    
    return (
      <div className="sa-happenings">
        {
          keys(groups)
            .sort((k1, k2) => compare(k1, k2))
            .map((key) => (
              <Section
                key={key}
                timestamp={parseInt(key, 10)}
                happenings={groups[parseInt(key, 10)]}
                user={user}
                assessment={assessment}
              />
            ))
        }
      </div>
    )
  }

export default Happening
