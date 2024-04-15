import { useState, useEffect, useContext } from "react";
import { DateContext } from "../providers/DateProvider";
import Event from "./Event";

export default function Main() {
  const { date } = useContext(DateContext);
  const [events, setEvents] = useState([]);
  const [mainContent, setMainContent] = useState("events");
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // production
        const response = await fetch("/events.php?day=" + dayOfWeek);
        // local development
        // const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(
            `Error fetching events: ${response.status}, ${response.statusText}`,
          );
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(`Error fetching events: ${error.message}`);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [date, dayOfWeek]);

  const isToday = date.toDateString() === new Date().toDateString();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main>
      <h2>
        <nav>
          <a
            className={`mainNav ${mainContent !== "events" ? "inactive" : ""}`}
            onClick={() => setMainContent("events")}
          >
            Events
          </a>
          <a
            className={`mainNav ${mainContent !== "clubs" ? "inactive" : ""}`}
            onClick={() => setMainContent("clubs")}
          >
            Clubs
          </a>
        </nav>
        <span
          className="date"
          style={mainContent !== "events" ? { visibility: "hidden" } : {}}
        >{` ${isToday ? "Today" : dayOfWeek}, ${formattedDate}`}</span>
      </h2>
      <section>
        {mainContent === "events" && (
          <>
            {events.length === 0 ? (
              <p>
                Sorry, no events found for this day, <br />
                Try selecting a different day in the calendar
              </p>
            ) : (
              events.map((event, key) => <Event key={key} event={event} />)
            )}
          </>
        )}{" "}
        <iframe
          className={mainContent !== "clubs" ? "hidden" : ""}
          src="https://airtable.com/embed/appe9g0nayQGaEwk3/shr0cCfcwDyg7lRur?viewControls=on"
          frameBorder="0"
          width="100%"
          height="675"
        ></iframe>
      </section>
    </main>
  );
}
