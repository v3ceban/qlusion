import Link from "next/link";
import React from "react";

const Cancel = () => {
  return (
    <Link className="button warning" href="/my_events/">
      Cancel
    </Link>
  );
};

export default Cancel;
