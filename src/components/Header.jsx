import React from "react";
import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <h1>
        <FontAwesomeIcon icon={faRocket} />
        Qlusion
      </h1>
      <nav>
        <MenuButton icon={faCalendar} content="events" />
        <MenuButton icon={faUsers} content="clubs" />
        <MenuButton icon={faBars} menu="menu" />
      </nav>
    </header>
  );
}
