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
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header>
      <Link href="/">
        <h1>
          <FontAwesomeIcon icon={faRocket} />
          Qlusion
        </h1>
      </Link>
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
