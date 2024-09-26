import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faCalendar,
  faCircleInfo,
  faClock,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

export default function Event({ event }) {
  return (
    <article className="event">
      <h3>{event.club_name}</h3>
      <ul>
        <li>{event.club_category}</li>
        <li>
          <FontAwesomeIcon icon={faCalendar} fixedWidth />
          {event.event_date}
        </li>
        <li>
          <FontAwesomeIcon icon={faClock} fixedWidth />
          {event.event_time}
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
          {event.event_description}
        </li>
        {event.event_location && (
          <li>
            <FontAwesomeIcon icon={faLocationArrow} fixedWidth />
            {event.event_location}
          </li>
        )}
      </ul>
      <div className="img-container">
        <Image
          src={
            event.club_picture
              ? "/img/" + event.club_picture
              : "/img/default.jpg"
          }
          alt={event.club_name}
          width={150}
          height={200}
        />
      </div>
      <p>{event.short_description}</p>
    </article>
  );
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
};
