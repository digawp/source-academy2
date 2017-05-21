import * as React from 'react'
import * as moment from 'moment'
import {
  Assessment,
  Happening,
  User,
  FIRST_TO_FINISH,
  SECOND_TO_FINISH,
  THIRD_TO_FINISH,
  ACHIEVEMENT_GOT,
  LEVEL_UP,
} from 'sa/core/types'
import { Button, Text } from '@blueprintjs/core'

export type Props = {
  happening: Happening,
  assessment: {[id: number]: Assessment},
  users: {[id: number]: User},
}

const Content: React.StatelessComponent<Props> =
  ({ happening, users, assessment }) => {
    const student = users[happening.user]

    if (!student) {
      return <span />
    }

    let asmt: Assessment

    const toFinish = (nth: string) => (
      <span>
        <strong>{student.firstName}</strong> is the {nth} to
        finish <strong>{asmt.title}</strong>
      </span>
    )

    if (typeof happening.assessment !== 'undefined') {
      asmt = assessment[happening.assessment]
      if (!asmt) {
        return <span />
      }
    }

    switch (happening.type) {
      case FIRST_TO_FINISH:
        return toFinish('first')
      case SECOND_TO_FINISH:
        return toFinish('second')
      case THIRD_TO_FINISH:
        return toFinish('third')
      case ACHIEVEMENT_GOT:
        return (
          <span>
            <strong>{student.firstName}</strong> has been
            conferred the achievement <strong>First Initiate</strong>
          </span>
        )
      case LEVEL_UP:
        return (
          <span>
            <strong>{student.firstName}</strong> has reached &nbsp;
            <strong>level {happening.level}</strong>
          </span>
        )
      default:
        return <span>Unknown type</span>
    }
  }

const Picture: React.StatelessComponent<Props> = ({ happening, users }) => {
  const profileImage = users[happening.user] &&
    <img src={users[happening.user].profilePicture} />

  return (
    <div className="picture">
      {profileImage}
    </div>
  )
}

const HappeningCard: React.StatelessComponent<Props> =
  (props) => (
    <div className="sa-happening row">
      <Picture {...props} />
      <div className="content col-xs">
        <div className="row">
          <div className="time col-xs-1">
            {moment(props.happening.timestamp).format('hh:mm')}
          </div>
          <div className="col-xs">
            <Content {...props} />
          </div>
        </div>
      </div>
    </div>
  )

export default HappeningCard
