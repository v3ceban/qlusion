"use client";

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faCalendar,
  faCircleInfo,
  faClock,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "@/lib/Providers";
import Link from "next/link";

export default function Event({ event }) {
  const { session } = useContext(AppContext);
  const hasAdminAccess = event.adminUsers?.some(
    (user) => user.email === session.user.email,
  );

  return (
    <article className="event">
      <h3>{event.club_name || "Error Loading Club Name"}</h3>
      <ul>
        {event.club_category && <li>{event.club_category}</li>}
        {event.event_date && (
          <li>
            <FontAwesomeIcon icon={faCalendar} fixedWidth />
            {event.event_date}
          </li>
        )}
        {event.event_time && (
          <li>
            <FontAwesomeIcon icon={faClock} fixedWidth />
            {event.event_time}
          </li>
        )}
        {event.event_description && (
          <li>
            <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
            {event.event_description}
          </li>
        )}
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
      {event.short_description && <p>{event.short_description}</p>}
      {hasAdminAccess && (
        <Link className="button" href={`/my_events/edit/${event.id}`}>
          Edit
        </Link>
      )}
    </article>
  );
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
};
