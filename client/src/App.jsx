import { Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Announcements from "./pages/Announcements";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/EventForm";

// only lets the admin in; others go to login
function Protected({ children }) {
  return localStorage.getItem("adminPassword") ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">C</span>
            Campus Portal
          </Link>
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>
            <NavLink to="/admin" className="nav-admin">Admin</NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Protected><Dashboard /></Protected>} />
          <Route path="/admin/event" element={<Protected><EventForm /></Protected>} />
          <Route path="/admin/event/:id" element={<Protected><EventForm /></Protected>} />
        </Routes>
      </main>

      <footer className="footer">Campus Event &amp; Announcement Portal</footer>
    </>
  );
}

export default App;
