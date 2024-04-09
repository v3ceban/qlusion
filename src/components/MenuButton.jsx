/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import FiltersMenu from "./FiltersMenu";

export default function MenuButton(props) {
  const [filtersShown, setFiltersShown] = useState(false);

  function toggleMenu(menu) {
    if (menu === "menu") {
      setFiltersShown(!filtersShown);
    } else {
      console.log(menu);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setFiltersShown(window.innerWidth >= 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    if (filtersShown && window.innerWidth < 800) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filtersShown]);

  return (
    <>
      <span className="menu" onClick={() => toggleMenu(props.menu)}>
        <FontAwesomeIcon
          icon={
            filtersShown && props.menu === "menu"
              ? "fa-solid fa-xmark"
              : props.icon
          }
          fixedWidth
          className={props.icon === "fa-solid fa-bars" ? "bars" : ""}
        />
        {props.content && props.content}
      </span>
      {filtersShown && props.menu === "menu" && <FiltersMenu />}
    </>
  );
}
