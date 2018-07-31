import React from 'react'
import Moment from 'react-moment'

const UploadListItem = props => {
  const { id, fileName, date, select } = props
  return (
    <li>
      <a onClick={e => select(e, id)} href={`/file/${id}`}>
        {fileName + ' - '}
        <Moment fromNow date={date} />
      </a>
    </li>
  )
}

export default UploadListItem
