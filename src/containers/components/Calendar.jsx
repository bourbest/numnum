import React, {useState} from 'react'
import PropTypes from 'prop-types'

function CalendarNavBar ({onMonthChanged, monthDisplayed}) {
  const monthName = monthDisplayed.toLocaleString('default', { month: 'long' });
  return (
    <div className="react-calendar__navigation d-flex">
        <button type="button" value="prev" onClick={onMonthChanged}>‹</button>
        <span className="react-calendar__title flex-grow">{monthName} {monthDisplayed.getFullYear()}</span>
        <button type="button" value="next" onClick={onMonthChanged}>›</button>
      </div>
  )
}

function CalendarDayNames () {
  const namesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (<div className="react-calendar__weekdays">
    {namesEn.map( name => (
      <div className="react-calendar__dayName" key={name}>
        <span>{name}</span>
      </div>
    ))}
    </div>)
}

function CalendarTile ({className, children, selected, value, onClick, name}) {
  const classes = "react-calendar__tile justify-content-center align-items-center " + (className || '')
  return (
    <button className={classes} value={value} name={name} onClick={onClick}>
      <div className={selected ? 'react-calendar__tile__day selected' : 'react-calendar__tile__day'}>
        {children}
      </div>
    </button>
  )
}

export default function Calendar (props) {
  let initialMonthDisplayed = props.value 
    ? new Date(props.value)
    : props.initialMonthDisplayed ? new Date(props.initialMonthDisplayed) : new Date()

  initialMonthDisplayed = new Date(initialMonthDisplayed.getFullYear(), initialMonthDisplayed.getMonth(), 1)
  const [monthDisplayed, setMonthDisplayed] = useState(initialMonthDisplayed)
  let startDay = new Date(monthDisplayed)
  startDay.setDate(1-startDay.getDay())

  const tiles = []

  const handleMonthChanged = function (event) {
    const newMonth = new Date(monthDisplayed)
    if (event.target.value === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setMonthDisplayed(newMonth)
  }

  const today = new Date()
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDay)
    date.setDate(startDay.getDate() + i)
    const classNames = []

    if (date.getMonth() !== monthDisplayed.getMonth()) {
      classNames.push('react-calendar__day--neighboringMonth')
    }

    if (date.getMonth() === today.getMonth() && date.getDate() === today.getDate() && date.getFullYear() === today.getFullYear() ) {
      classNames.push('react-calendar__day--today')
    }
    const strDate = date.toISOString().slice(0, 10)
    tiles.push(<CalendarTile
      className={classNames.join(' ')}
      onClick={props.onChange}
      value={strDate}
      selected={props.value === strDate}
      key={strDate}
      name={props.name}
      >{date.getDate()}</CalendarTile>)
  }

  return (
    <div className="react-calendar">
      <CalendarNavBar onMonthChanged={handleMonthChanged} monthDisplayed={monthDisplayed} />
      <div className="react-calendar__viewContainer">
        <div className="react-calendar__month-view ">
          <div className="d-flex align-items-end">
            <div className="flex-grow w-100">
              <CalendarDayNames />
              <div className="react-calendar__month-view__days d-flex flex-wrap">
                {tiles}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Calendar.propTypes = {
  initialMonthDisplayed: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}