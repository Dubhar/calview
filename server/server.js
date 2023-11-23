import {fetchEvents} from "./fetch.js";
import {convertEvents} from "./icalConverter.js";

let eventsByCalendar = await fetchEvents('tj', 'IMUQT-VLXJX-QTDEZ-CDBMW');
let allEvents = [];
for (let calendarIndex = 0; calendarIndex < eventsByCalendar.length; ++calendarIndex) {
    const calendarColor = eventsByCalendar[calendarIndex].calendarColor;
    const events = eventsByCalendar[calendarIndex].calendarObjects;
    let convertedEvents = convertEvents(events, calendarColor);
    allEvents = allEvents.concat(convertedEvents);
}
