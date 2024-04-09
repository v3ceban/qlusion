import Calendar from "./Calendar";

export default function FiltersMenu() {
  return (
    <aside className="asideMenu container">
      <h3>Sort Events</h3>
      <p>Select the events you want to see</p>
      <Calendar />
    </aside>
  );
}
