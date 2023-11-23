import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const url = process.env.CALVIEWSERVER ? process.env.CALVIEWSERVER : "localhost:5000";

function App() {
  const [calendarData, setCalendarData] = useState([{}]);
  useEffect(() => {
    fetch(url+"/events").then(
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
