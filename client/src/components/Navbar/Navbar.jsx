import { useCallback } from "react";
import "./Navbar.css";
// import LoginOptions from "../LoginOptions/LoginOptions";

const Navbar = ({toggleLoginOptions}) => {

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const onAboutTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='scrollTo']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
      <header className="home-navbar-parent">
        <div className="home-navbar" />
        <h2 className="home" onClick={scrollToTop}>HOME</h2>
        <div className="frame-wrapper">
          <div className="frame-parent">
            <div className="about-wrapper">
              <h3 className="about" onClick={onAboutTextClick}>
                About
              </h3>
            </div>
            <h3 className="home-login" onClick={toggleLoginOptions}>Login</h3>
          </div>
        </div>
    </header>
  );
};

export default Navbar;