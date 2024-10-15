import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

const Events = ({ events }) => {
  return (
    <div className="events">
      {events.length === 0 ? (
        <p>
          Sorry, no events found for this day. Try selecting a different day in
          the calendar or a different category
        </p>
      ) : (
        events.map((event) => <Event key={event.id} event={event} />)
      )}
    </div>
  );
};

Events.propTypes = {
  events: PropTypes.array,
};

export default Events;
