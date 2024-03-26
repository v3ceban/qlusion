/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css/modules/menuButton.module.scss";

export default function Menu(props) {
  function showMenu(menu) {
    console.log(menu);
  }
  return (
    <span className={styles.menu} onClick={() => showMenu(props.menu)}>
      <FontAwesomeIcon
        icon={props.icon}
        fixedWidth
        className={props.icon === "fa-solid fa-bars" ? styles.bars : ""}
      />
      {props.content && props.content}
    </span>
  );
}
