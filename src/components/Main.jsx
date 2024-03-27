/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Event from "./Event";

export default function Main(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const today = new Date();
  const isToday = props.date.getDate() === today.getDate();
  const formattedDate = props.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main>
      <h2>
        {isToday ? "Today" : "Events For"}
        <span className="date">{formattedDate}</span>
      </h2>
      <section>
        {events.length === 0 ? (
          <h3>No events found for this day</h3>
        ) : (
          events.map((event, key) => <Event key={key} event={event} />)
        )}
      </section>
    </main>
  );
}
