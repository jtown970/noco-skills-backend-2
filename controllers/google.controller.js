import { google } from "googleapis";

const calendar = google.calendar("v3");

// Create an event in the user's primary calendar
export const createEvent = async (req, res) => {
  try {
    const auth = req.user.auth;
    const { start, end, summary, description, location, attendees } = req.body;

    const timeMin = new Date(start).toISOString();
    const timeMax = new Date(end).toISOString();

    // Check if the requested time slot is available
    const freebusyReq = {
      resource: {
        timeMin,
        timeMax,
        timeZone: "America/Los_Angeles",
        items: [{ id: "primary" }],
      },
    };
    const freebusyRes = await calendar.freebusy.query({
      auth,
      requestBody: freebusyReq,
    });
    const busy = freebusyRes.data.calendars.primary.busy;
    if (busy.length > 0) {
      return res.status(400).send("The requested time slot is not available.");
    }

    // Create the event
    const event = {
      summary,
      location,
      description,
      start: {
        dateTime: timeMin,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: timeMax,
        timeZone: "America/Los_Angeles",
      },
      attendees,
      reminders: {
        useDefault: true,
      },
    };
    const eventRes = await calendar.events.insert({
      auth,
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all",
    });
    const eventId = eventRes.data.id;

    return res.status(200).send({ eventId });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to create event.");
  }
};

// export default { createEvent };
