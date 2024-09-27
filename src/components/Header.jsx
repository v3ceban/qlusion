import React from "react";
import MenuButton from "./MenuButton";
import AuthButton from "./AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header>
      <h1>
        <FontAwesomeIcon icon={faRocket} />
        Qlusion
      </h1>
      <nav>
        <MenuButton icon={faCalendar} content="events" />
        <MenuButton icon={faUsers} content="clubs" />
        <AuthButton />
        <MenuButton icon={faBars} menu="menu" />
      </nav>
      {session && <p>Hello, {session?.user?.name}</p>}
    </header>
  );
}
