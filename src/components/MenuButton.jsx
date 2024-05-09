/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { MainContext } from "../providers/MainContent";
import { FiltersContext } from "../providers/FiltersProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuButton(props) {
  const { filtersMenu, setFiltersMenu } = useContext(FiltersContext);
  const [showText, setShowText] = useState(false);
  const { setMainContent } = useContext(MainContext);

  useEffect(() => {
    const handleResize = () => {
      setFiltersMenu(window.innerWidth >= 800);
      setShowText(window.innerWidth >= 475);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setFiltersMenu, setShowText]);

  useEffect(() => {
    const disableScroll = filtersMenu && window.innerWidth < 800;

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
  }, [filtersMenu]);

  return (
    <>
      <span
        className="menu"
        onClick={() => {
          if (props.menu) {
            setFiltersMenu(!filtersMenu);
          } else if (props.content) {
            setMainContent(props.content);
          }
        }}
      >
        <FontAwesomeIcon
          icon={filtersMenu && props.menu ? "fa-solid fa-xmark" : props.icon}
          fixedWidth
          className={props.icon === "fa-solid fa-bars" ? "bars" : ""}
        />
        {props.content && showText && props.content}
      </span>
    </>
  );
}
