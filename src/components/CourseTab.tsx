import * as React from 'react'

type CourseTabProps = { isSelected: boolean, onClick: () => {}, name: string }

const tabClassCommon = ''
const tabClassSelected = 'bg-lblue text-white px-5 py-2 rounded-t-2xl w-1/4 border-navy border-x-3 border-t-3'
const tabClassNotSelected = 'bg-lgreen px-5 py-2 rounded-t-2xl w-1/4 border-navy border-3'
// const tabClassSelected = 'bg-lt-green'
// const tabClassNotSelected = 'bg-lt-blue'

export default function CourseTab ({isSelected, onClick, name}: CourseTabProps) {
  return (
      <button value={name}
          className={
              isSelected ?
              [tabClassCommon, tabClassSelected].join(' ') :
              [tabClassCommon, tabClassNotSelected].join(' ')

          }
          onClick={onClick}
      >
        {name}
      </button>
  )
}
