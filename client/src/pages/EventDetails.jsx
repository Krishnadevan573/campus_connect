import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API, dateParts, catClass } from "../api";

function EventDetails() {
  const { id } = useParams(); // reads :id from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(API + "/events/" + id).then((r) => r.json()).then(setEvent);
  }, [id]);

  if (!event) return <p className="empty">Loading...</p>;

  const d = dateParts(event.date);

  return (
    <div>
      <Link to="/events" className="text-link back">Back to events</Link>
      <article className="detail">
        <div className="detail-head">
          <div className="date-tile date-tile-lg">
            <span className="date-month">{d.month}</span>
            <span className="date-day">{d.day}</span>
          </div>
          <div>
            <span className={catClass(event.category)}>{event.category}</span>
            <h1>{event.title}</h1>
          </div>
        </div>

        <dl className="facts">
          <div>
            <dt>Date</dt>
            <dd>{d.full}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{event.venue || "To be announced"}</dd>
          </div>
        </dl>

        <p className="detail-desc">{event.description || "No description has been added yet."}</p>
      </article>
    </div>
  );
}

export default EventDetails;
