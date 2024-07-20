import "./Home.css";

const Home = ({handleGetStartedClick}) => {

  return (
    <div className="home-1">
      <section className="welcome-message-parent">
        <div className="welcome-message">
          <div className="rightrectangle" />
          <img
            className="feedback-icon"
            loading="lazy"
            alt=""
            src="/feedback.jpeg"
          />
        </div>
        <div className="leftrectangle-parent">
          <div className="leftrectangle" />
          <h1 className="welcomemessage">
            Welcome To Anonymous Student Feedback System
          </h1>
        </div>
      </section>
     <section className="about-container">
      <div className="how-this-works">
        <div className="frame-group">
          <div className="caption-wrapper">
            <h2 className="caption">{`“Your feedback fuels the progress! Share your insights to shape a better learning experience for all.” `}</h2>
          </div>
          <div className="scrollTo" data-scroll-to="scrollTo">
          <div className="footer-message">
            <div className="aboutcontainer" />
            <div className="how-it-works-box">
              <h1 className="how-this-works1">How This Works?</h1>
            </div>
            <div className="about-content-parent">
              <div className="about-content">
                "Share your feedback anonymously, watch it transform into
                actionable insights through cutting-edge analysis, and witness
                the positive impact on your educational journey!"
              </div>
              <div className="frame-container">
                <div className="frame-div">
                  <button className="get-started-button-parent" onClick={handleGetStartedClick}>
                    <div className="get-started-button" />
                    <div className="get-started">Login to Get Started</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="footer">
          <h1 className="footermessage">“Let's elevate education together!”</h1>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
