import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, dateParts, catClass } from "../api";

function Home() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(API + "/events").then((r) => r.json()).then(setEvents);
    fetch(API + "/announcements").then((r) => r.json()).then(setAnnouncements);
  }, []);

  // upcoming = today or later
  const today = new Date().setHours(0, 0, 0, 0);
  const upcoming = events.filter((e) => new Date(e.date) >= today).slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>What's happening on campus</h1>
        <p>Find upcoming events, read the latest notices and never miss a deadline.</p>
        <div className="hero-actions">
          <Link to="/events" className="btn btn-accent">Browse events</Link>
          <Link to="/announcements" className="btn btn-outline-light">Read announcements</Link>
        </div>
      </section>

      <div className="home-grid">
        <section>
          <div className="section-head">
            <h2>Upcoming events</h2>
            <Link to="/events" className="text-link">See all</Link>
          </div>
          {upcoming.length === 0 && <p className="empty">No upcoming events. Check back soon.</p>}
          {upcoming.map((e) => {
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
        </section>

        <section>
          <div className="section-head">
            <h2>Latest announcements</h2>
            <Link to="/announcements" className="text-link">See all</Link>
          </div>
          {announcements.length === 0 && <p className="empty">No announcements yet.</p>}
          {announcements.slice(0, 3).map((a) => (
            <article className="notice" key={a._id}>
              <h3>{a.title}</h3>
              <p>{a.message}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;
