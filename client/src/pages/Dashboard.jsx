import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, adminHeaders, dateParts, catClass } from "../api";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function loadData() {
    fetch(API + "/events").then((r) => r.json()).then(setEvents);
    fetch(API + "/announcements").then((r) => r.json()).then(setAnnouncements);
  }

  useEffect(() => { loadData(); }, []);

  async function deleteItem(path, id) {
    if (!window.confirm("Are you sure?")) return;
    await fetch(API + path + "/" + id, { method: "DELETE", headers: adminHeaders() });
    loadData();
  }

  async function addAnnouncement(e) {
    e.preventDefault();
    await fetch(API + "/announcements", {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify({ title, message }),
    });
    setTitle("");
    setMessage("");
    loadData();
  }

  function logout() {
    localStorage.removeItem("adminPassword");
    navigate("/admin/login");
  }

  return (
    <div>
      <div className="dash-head">
        <h1 className="page-title">Admin dashboard</h1>
        <button className="btn btn-ghost" onClick={logout}>Log out</button>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat-num">{events.length}</span>
          <span className="stat-label">Events</span>
        </div>
        <div className="stat">
          <span className="stat-num">{announcements.length}</span>
          <span className="stat-label">Announcements</span>
        </div>
      </div>

      <div className="section-head">
        <h2>Events</h2>
        <Link to="/admin/event" className="btn btn-primary btn-sm">Add event</Link>
      </div>
      {events.length === 0 && <p className="empty">No events yet. Add the first one.</p>}
      {events.map((e) => {
        const d = dateParts(e.date);
        return (
          <div className="row-card" key={e._id}>
            <div className="date-tile date-tile-sm">
              <span className="date-month">{d.month}</span>
              <span className="date-day">{d.day}</span>
            </div>
            <div className="row-main">
              <b>{e.title}</b>
              <span className={catClass(e.category)}>{e.category}</span>
            </div>
            <div className="row-actions">
              <Link to={"/admin/event/" + e._id} className="btn btn-ghost btn-sm">Edit</Link>
              <button className="btn btn-danger btn-sm" onClick={() => deleteItem("/events", e._id)}>Delete</button>
            </div>
          </div>
        );
      })}

      <div className="section-head">
        <h2>Announcements</h2>
      </div>
      <form className="form form-wide" onSubmit={addAnnouncement}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Message
          <textarea rows="3" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <div className="form-actions">
          <button className="btn btn-primary">Post announcement</button>
        </div>
      </form>

      {announcements.map((a) => (
        <div className="row-card row-card-top" key={a._id}>
          <div className="row-main">
            <b>{a.title}</b>
            <p>{a.message}</p>
          </div>
          <div className="row-actions">
            <button className="btn btn-danger btn-sm" onClick={() => deleteItem("/announcements", a._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
