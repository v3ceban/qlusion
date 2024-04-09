import { useState, useEffect, useContext } from "react";
import { DateContext } from "../providers/DateProvider";
import Event from "./Event";

export default function Main() {
  const { date } = useContext(DateContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [date]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/events.json"); // static events. should either be fetched from backend/API
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

  const isToday = date.toDateString() === new Date().toDateString();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const eventsToShow = events.filter((event) => event.date === formattedDate);

  return (
    <main>
      <h2>
        Events for
        <span className="date">{` ${isToday ? "Today," : ""} ${formattedDate}`}</span>
      </h2>
      <section>
        {eventsToShow.length === 0 ? (
          <p>Sorry, no events found for this day :(</p>
        ) : (
          // events.map((event, key) => <Event key={key} event={event} />) // show all events
          eventsToShow.map((event, key) => <Event key={key} event={event} />) // show events for the day
        )}
      </section>
    </main>
  );
}
