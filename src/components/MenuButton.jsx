/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import FiltersMenu from "./FiltersMenu";
import LoginMenu from "./LoginMenu";

export default function MenuButton(props) {
  const [filtersMenu, setFiltersMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  function toggleMenu(menu) {
    if (menu === "menu") {
      setFiltersMenu(!filtersMenu);
    } else if (menu === "user") {
      setUserMenu(!userMenu);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setFiltersMenu(window.innerWidth >= 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const disableScroll = (filtersMenu && window.innerWidth < 800) || userMenu;

    if (disableScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.querySelector("main").style.display = "none";
    }

    return () => {
      if (disableScroll) {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
        document.querySelector("main").style.display = "block";
      }
    };
  }, [filtersMenu, userMenu]);

  return (
    <>
      <span className="menu" onClick={() => toggleMenu(props.menu)}>
        <FontAwesomeIcon
          icon={
            filtersMenu && props.menu === "menu"
              ? "fa-solid fa-xmark"
              : props.icon
          }
          fixedWidth
          className={props.icon === "fa-solid fa-bars" ? "bars" : ""}
        />
        {props.content && props.content}
      </span>
      {filtersMenu && props.menu === "menu" && (
        <FiltersMenu setFiltersMenu={setFiltersMenu} />
      )}
      {userMenu && <LoginMenu menu={props.menu} />}
    </>
  );
}
