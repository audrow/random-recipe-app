import * as React from 'react'

type CourseTabProps = { isSelected: boolean, onClick: () => {}, name: string }

const tabClassCommon = 'm-5 rounded-2 border-1'
const tabClassSelected = 'bg-pink'
const tabClassNotSelected = 'bg-black'
// const tabClassSelected = 'bg-lt-green'
// const tabClassNotSelected = 'bg-lt-blue'

export default function CourseTab ({isSelected, onClick, name}: CourseTabProps) {
  return (
      <input type='button' name='course' value={name}
          className={
              isSelected ? 
              [tabClassCommon, tabClassSelected].join(' ') : 
              [tabClassCommon, tabClassNotSelected].join(' ')

          }
          onClick={onClick}
      />
  )
}
