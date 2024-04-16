import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "./MenuButton";
import LoginMenu from "./LoginMenu";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobile, setIsMobile] = useState(true);
  const [loginMenu, setLoginMenu] = useState(false);
  const [whichMenu, setWhichMenu] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleLoginMenu = () => {
    setLoginMenu(!loginMenu);
  };

  const MobileHeader = () => (
    <nav>
      <MenuButton icon="fa-solid fa-bars" menu="menu" loginMenu={loginMenu} />
      <h1>
        <FontAwesomeIcon icon="fa-solid fa-rocket" />
        Qlusion
      </h1>
      <MenuButton
        icon="fa-solid fa-user"
        menu="login"
        toggleLoginMenu={toggleLoginMenu}
        loginMenu={loginMenu}
        setWhichMenu={setWhichMenu}
      />
    </nav>
  );

  const DesktopHeader = () => (
    <nav>
      <h1>
        <FontAwesomeIcon icon="fa-solid fa-rocket" />
        Qlusion
      </h1>
      <section className="navMenus">
        <MenuButton
          icon="fa-solid fa-pen"
          menu="register"
          content="Register"
          toggleLoginMenu={toggleLoginMenu}
          loginMenu={loginMenu}
          setWhichMenu={setWhichMenu}
        />
        <MenuButton
          icon="fa-solid fa-right-to-bracket"
          menu="login"
          content="Login"
          toggleLoginMenu={toggleLoginMenu}
          loginMenu={loginMenu}
          setWhichMenu={setWhichMenu}
        />
        <MenuButton icon="fa-solid fa-bars" menu="menu" loginMenu={loginMenu} />
      </section>
    </nav>
  );

  return (
    <header>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      {loginMenu && <LoginMenu menu={whichMenu} />}
    </header>
  );
}
