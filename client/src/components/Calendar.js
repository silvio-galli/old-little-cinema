import React from 'react'

function Calendar(props) {
  return (
    <p className="text-left mt-1 date">
      <b>{props.date}: </b>
      {
        props.showtimes.replace(' ', '').split(',').map(time => {
          return <span className="time mr-1 p-1 rounded">{time}</span>
        })
      }
    </p>
  )
}

export default Calendar