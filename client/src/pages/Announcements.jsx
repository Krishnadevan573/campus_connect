

import { useEffect, useState } from "react";
import { API } from "../api";

function Announcements() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(API + "/announcements").then((r) => r.json()).then(setList);
  }, []);

  return (
    <div>
      <h1 className="page-title">Announcements</h1>
      {list.length === 0 && <p className="empty">No announcements yet.</p>}
      {list.map((a) => (
        <article className="notice" key={a._id}>
          <h3>{a.title}</h3>
          <p>{a.message}</p>
          <small>{new Date(a.createdAt).toLocaleString()}</small>
        </article>
      ))}
    </div>
  );
}

export default Announcements;
