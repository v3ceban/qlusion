import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header>
      <h1>
        <FontAwesomeIcon icon="fa-solid fa-rocket" />
        Qlusion
      </h1>
      <nav>
        <MenuButton icon="fa-solid fa-calendar" content="events" />
        <MenuButton icon="fa-solid fa-users" content="clubs" />
        <MenuButton icon="fa-solid fa-bars" menu="menu" />
      </nav>
    </header>
  );
}
