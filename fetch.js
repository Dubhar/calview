import {DAVClient} from 'tsdav';
import {convertEvent} from './icalConverter.js';

const client = new DAVClient({
    serverUrl: 'https://wolke.jefrickel.de/remote.php/dav/',
    credentials: {
        username: 'tj',
        password: 'IMUQT-VLXJX-QTDEZ-CDBMW',
    },
    authMethod: 'Basic',
    defaultAccountType: 'caldav',
});

const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();
let events = [];

await client.login();
const calendars = await client.fetchCalendars();

for (let i = 0; i < calendars.length; ++i) {
    const calendarColor = calendars[i].calendarColor;
    const calendarObjects = await client.fetchCalendarObjects({
        calendar: calendars[i],
        timeRange: {
            start: firstDay,
            end: lastDay,
        }
    });
    for (let j = 0; j < calendarObjects.length; ++j) {
        let element = calendarObjects[j].data;
        let convertedEvent = convertEvent(element, calendarColor);
        events.push(convertedEvent);
    }
}
console.log(events);

