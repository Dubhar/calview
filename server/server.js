import {fetchEvents} from "./fetch.js";
import {convertEvents} from "./icalConverter.js";
import express from 'express';

const user = 'tj';
const token = 'IMUQT-VLXJX-QTDEZ-CDBMW';

const app = express();

app.get('/events', async (request, response) => {
    let eventsByCalendar;
    try {
        eventsByCalendar = await fetchEvents(user, token);
    } catch (error) {
        console.error(error);
    }
    let allEvents = [];
    for (let calendarIndex = 0; calendarIndex < eventsByCalendar.length; ++calendarIndex) {
        const calendarColor = eventsByCalendar[calendarIndex].calendarColor;
        const events = eventsByCalendar[calendarIndex].calendarObjects;
        let convertedEvents = convertEvents(events, calendarColor);
        allEvents = allEvents.concat(convertedEvents);
    }
    response.json(allEvents);
});

app.listen(5000, () => console.log('Server started on port 5000'));
