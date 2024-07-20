import Navbar from "../../components/Navbar/Navbar";
import Home from "../../components/Home/Home";
import LoginOptions from "../../components/LoginOptions/LoginOptions";
import "../../components/Home/Home.css";
import { useState } from "react";

const HomePage = () => {

  const [loginOptionsVisible, setLoginOptionsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const toggleLoginOptions = () => {
    scrollToTop();
    setLoginOptionsVisible(!loginOptionsVisible);
  };

  const handleGetStartedClick = () => {
    scrollToTop();
    setLoginOptionsVisible(true);
  }


  return (
    <div className="home-1">
      <Navbar toggleLoginOptions={toggleLoginOptions} />
      {loginOptionsVisible && <LoginOptions visible={loginOptionsVisible} />}
      <Home handleGetStartedClick={handleGetStartedClick} />
    </div>
  );
};

export default HomePage;