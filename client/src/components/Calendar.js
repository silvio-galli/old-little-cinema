import React from 'react'

function Calendar(props) {
  return (
    <ul className="text-left mt-1 date">
      <li>
        <b>{props.date}: </b>
        {
          props.showtimes.replace(' ', '').split(',').map(time => {
            return <span key={`${props.date}-${time}`} className="time mr-1 p-1 rounded">{time}</span>
          })
        }
      </li>
    </ul>
  )
}

export default Calendar