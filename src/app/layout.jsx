import React from "react";
import PropTypes from "prop-types";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@/scss/index.scss";

export const metadata = {
  title: "Qlusion",
  description:
    "Qlusion: the scheduling solution for SCU clubs, student organizations, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root" className="siteContainer">
          {children}
        </div>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
