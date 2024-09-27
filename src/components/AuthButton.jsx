"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <span className="menu" onClick={() => signOut()}>
        <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
        Sign out
      </span>
    );
  }

  return (
    <span className="menu" onClick={() => signIn("google")}>
      <FontAwesomeIcon icon={faRightToBracket} fixedWidth />
      Sign in
    </span>
  );
};

export default AuthButton;
