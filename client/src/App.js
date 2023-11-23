import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function App() {
  const [calendarData, setCalendarData] = useState([{}]);
  useEffect(() => {
    fetch("/events").then(
        response => response.json()
    ).then(
        data => {
          setCalendarData(data)
        }
    )
  }, []);

  return (
      <div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
                start: 'title',
                center: '',
                end: ''
            }}
            events={calendarData}
        />
      </div>
  )
}

export default App
