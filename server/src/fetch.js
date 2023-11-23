import {DAVClient} from "tsdav";

export async function fetchEvents(url, username, token) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

    const client = new DAVClient({
        serverUrl: url, credentials: {
            username: username, password: token,
        }, authMethod: 'Basic', defaultAccountType: 'caldav',
    });

    let events = [];

    await client.login();
    const calendars = await client.fetchCalendars();

    for (let i = 0; i < calendars.length; ++i) {
        const calendarColor = calendars[i].calendarColor;
        const calendarObjects = await client.fetchCalendarObjects({
            calendar: calendars[i], timeRange: {
                start: firstDay, end: lastDay,
            }
        });
        events.push({calendarColor, calendarObjects});
    }
    return events;
}
