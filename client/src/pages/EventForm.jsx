import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API, adminHeaders } from "../api";

function EventForm() {
  const { id } = useParams(); // id exists only when editing
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", date: "", venue: "", category: "Technical",
  });

  // when editing, load the existing event into the form
  useEffect(() => {
    if (id) {
      fetch(API + "/events/" + id)
        .then((r) => r.json())
        .then((data) => setForm({ ...data, date: data.date.slice(0, 10) }));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(API + "/events" + (id ? "/" + id : ""), {
      method: id ? "PUT" : "POST",
      headers: adminHeaders(),
      body: JSON.stringify(form),
    });
    navigate("/admin");
  }

  return (
    <form className="form form-wide" onSubmit={handleSubmit}>
      <h1>{id ? "Edit event" : "Add event"}</h1>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label>
        Description
        <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
      </label>
      <div className="form-row">
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Technical</option>
            <option>Cultural</option>
            <option>Sports</option>
            <option>Workshop</option>
          </select>
        </label>
      </div>
      <label>
        Venue
        <input name="venue" value={form.venue} onChange={handleChange} />
      </label>
      <div className="form-actions">
        <button className="btn btn-primary">{id ? "Save changes" : "Add event"}</button>
        <Link to="/admin" className="btn btn-ghost">Cancel</Link>
      </div>
    </form>
  );
}

export default EventForm;
