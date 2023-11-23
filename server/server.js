import {fetchEvents} from "./fetch.js";
import {convertEvents} from "./icalConverter.js";
import express from 'express';

const user = 'tj';
const token = 'IMUQT-VLXJX-QTDEZ-CDBMW';
const updateIntervalInMinutes = 15;
const port = 5000;

const app = express();

let eventsByCalendar;
let lastUpdated = new Date('2000/01/01 12:00');

app.get('/events', async (request, response) => {
    // if needed fetch updates from server
    let minutesSinceLastUpdate = Math.abs(new Date() - lastUpdated)/1000/60;
    if (minutesSinceLastUpdate > updateIntervalInMinutes) {
        try {
            eventsByCalendar = await fetchEvents(user, token);
            lastUpdated = new Date();
        } catch (error) {
            console.error(error);
        }
    }

    // convert events to json
    let allEvents = [];
    for (let calendarIndex = 0; calendarIndex < eventsByCalendar.length; ++calendarIndex) {
        const calendarColor = eventsByCalendar[calendarIndex].calendarColor;
        const events = eventsByCalendar[calendarIndex].calendarObjects;
        let convertedEvents = convertEvents(events, calendarColor);
        allEvents = allEvents.concat(convertedEvents);
    }

    // send response
    response.json(allEvents);
});

app.listen(port, () => console.log('Server started on port '+port));
