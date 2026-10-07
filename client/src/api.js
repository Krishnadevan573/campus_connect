export const API = "http://localhost:5000";

// headers for admin requests
export function adminHeaders() {
  return {
    "Content-Type": "application/json",
    "x-admin-password": localStorage.getItem("adminPassword") || "",
  };
}

// splits a date into pieces for the calendar tile (e.g. "OCT", 12)
export function dateParts(d) {
  const x = new Date(d);
  return {
    month: x.toLocaleString("en-US", { month: "short" }),
    day: x.getDate(),
    full: x.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
}

// css class for the coloured category chip
export function catClass(category) {
  return "chip chip-" + (category || "other").toLowerCase();
}
