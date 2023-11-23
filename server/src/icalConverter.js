import("ical.js");

function icalToJcal(icalEvent) {
    let jCalElement = ICAL.parse(icalEvent);
    let comp = new ICAL.Component(jCalElement);
    let vevent = comp.getFirstSubcomponent("vevent");
    return new ICAL.Event(vevent);
}

function jcalToFullcalendar(jcalEvent, calendarColor) {
    return {
        title: jcalEvent.summary,
        start: jcalEvent.startDate.toJSDate(),
        end: jcalEvent.endDate.toJSDate(),
        color: calendarColor,
    };
}

export function convertEvent(icalEvent, calendarColor) {
    let event = icalToJcal(icalEvent.data);
    return jcalToFullcalendar(event, calendarColor);
}

export function convertEvents(icalEvents, calendarColor) {
    let convertedEvents = [];
    for (let eventIndex = 0; eventIndex < icalEvents.length; ++eventIndex) {
        let convertedEvent = convertEvent(icalEvents[eventIndex], calendarColor);
        convertedEvents.push(convertedEvent);
    }
    return convertedEvents;
}