import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, dateParts, catClass } from "../api";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(API + "/events").then((r) => r.json()).then(setEvents);
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);

  // upcoming only + search + category
  const filtered = events.filter((e) =>
    new Date(e.date) >= today &&
    e.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || e.category === category)
  );

  return (
    <div>
      <h1 className="page-title">Upcoming events</h1>

      <div className="filters">
        <input
          className="search"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Technical</option>
          <option>Cultural</option>
          <option>Sports</option>
          <option>Workshop</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <p className="empty">No events match your search. Try a different title or category.</p>
      )}
      {filtered.map((e) => {
        const d = dateParts(e.date);
        return (
          <Link to={"/events/" + e._id} className="event-card" key={e._id}>
            <div className="date-tile">
              <span className="date-month">{d.month}</span>
              <span className="date-day">{d.day}</span>
            </div>
            <div className="event-body">
              <h3>{e.title}</h3>
              <p className="meta">{e.venue || "Venue to be announced"}</p>
              <span className={catClass(e.category)}>{e.category}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Events;
