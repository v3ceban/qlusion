import { useState, useEffect, useContext } from "react";
import { AppContext } from "../Providers";
import Event from "./Event";
import FiltersMenu from "./FiltersMenu";

export default function Main() {
  const { date, mainContent, filtersMenu } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(["All"]);
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

  const toggleCategory = (category) => {
    if (category === "All") {
      setCategories(["All"]);
    } else {
      const updatedCategories = categories.includes("All")
        ? [category]
        : categories.includes(category)
          ? categories.filter((c) => c !== category && c !== "All")
          : [...categories, category];
      setCategories(updatedCategories);
    }
  };

  const filteredEvents = events.filter((event) =>
    categories.includes("All")
      ? true
      : categories.includes(event.club_category),
  );

  const allCategories = [
    "All",
    "Academic & Professional",
    "Business",
    "Cultural",
    "Engineering",
    "Faith-Based",
    "Performance Arts",
    "Recreational",
    "Service",
    "Social Justice",
    "Special Interest",
  ];

  return (
    <main>
      <section className="hero">
        <h2>
          Get included in your college life with <span>Qlusion</span>
        </h2>
      </section>
      {mainContent === "events" && (
        <nav className="categories">
          <ul>
            {allCategories.map((category) => (
              <li
                key={category}
                onClick={() => toggleCategory(category)}
                className={categories.includes(category) ? "active" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </nav>
      )}
      <h2>
        {mainContent === "events" ? "Events" : "Clubs"}
        <span
          className="date"
          style={mainContent !== "events" ? { visibility: "hidden" } : {}}
        >{` ${isToday ? "Today" : dayOfWeek}, ${formattedDate}`}</span>
      </h2>
      <section className="content">
        {mainContent === "events" && (
          <>
            <div className="events">
              {filteredEvents.length === 0 ? (
                <p>
                  Sorry, no events found for this day. Try selecting a different
                  day in the calendar or a different category
                </p>
              ) : (
                filteredEvents.map((event, key) => (
                  <Event key={key} event={event} />
                ))
              )}
            </div>
            {filtersMenu && <FiltersMenu />}
          </>
        )}
        <iframe
          className={mainContent === "events" ? "hidden" : ""}
          src="https://airtable.com/embed/appe9g0nayQGaEwk3/shr0cCfcwDyg7lRur?viewControls=on"
          frameBorder="0"
          width="100%"
          height="675"
        ></iframe>
      </section>
    </main>
  );
}
