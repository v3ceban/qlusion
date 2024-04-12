/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Event(props) {
  const event = props.event;
  return (
    <article className="event">
      <h3>{event.title}</h3>
      <ul>
        <li>{event.club_name}</li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-calendar" fixedWidth />
          {event.date}
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-clock" fixedWidth />
          {event.time_from} - {event.time_to}
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-location-arrow" fixedWidth />
          {event.location}
        </li>
      </ul>
      <div className="cta-container">
        <img src={"/img/" + event.image} alt={event.title} />
        {/* needs to check if user is logged in and redirect to login if not,
        otherwise render event registration component */}
        <button>Sign-up</button>
      </div>
      <p>{event.short_description}</p>
    </article>
  );
}
