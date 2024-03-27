/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Menu(props) {
  function showMenu(menu) {
    console.log(menu);
  }
  return (
    <span className="menu" onClick={() => showMenu(props.menu)}>
      <FontAwesomeIcon
        icon={props.icon}
        fixedWidth
        className={props.icon === "fa-solid fa-bars" ? "bars" : ""}
      />
      {props.content && props.content}
    </span>
  );
}
