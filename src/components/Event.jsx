/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultImage from "../img/default.jpg";

export default function Event(props) {
  const event = props.event;
  return (
    <article className="event">
      <h3>{event.club_name}</h3>
      <ul>
        <li>{event.club_category}</li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-calendar" fixedWidth />
          {event.event_date}
        </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-clock" fixedWidth />
          {event.event_time}
        </li>
        {event.event_location && (
          <li>
            <FontAwesomeIcon icon="fa-solid fa-location-arrow" fixedWidth />
            {event.event_location}
          </li>
        )}
      </ul>
      <div className="img-container">
        <img
          src={event.club_picture ? "/img/" + event.club_picture : DefaultImage}
          alt={event.club_name}
        />
      </div>
      <p>{event.short_description}</p>
    </article>
  );
}
