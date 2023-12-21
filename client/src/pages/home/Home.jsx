import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="center">
      <Link to="/leagues" className="btn">
        Veiw
      </Link>
      <Link to="/create" className="btn">
        Create
      </Link>
    </div>
  );
};

export default Home;
