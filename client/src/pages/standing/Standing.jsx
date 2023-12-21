import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LeaguesContext } from "../../Contexts/LeaguesContext";
import "./Standing.css";
const Standing = () => {
  const navigate = useNavigate();
  const { currentLeague, setCurrentLeague, League, setLeague, icurrentLeague } =
    useContext(LeaguesContext);
  const [popUp, setPopUp] = useState(1);
  const [operation, setOperation] = useState(0);
  const [typed, setTyped] = useState("");
  const [club1, setClub1] = useState("");
  const [club2, setClub2] = useState("");
  const [club2G, setClub2G] = useState(0);
  const [club1G, setClub1G] = useState(0);
  const [sortedCurrentLeague, setSortedCurrentLeague] = useState(currentLeague);

  const handleOnOpe = () => {
    if (operation == 1) {
      const newClub = { name: typed, points: 0 };
      setCurrentLeague((prev) => [...prev, newClub]);
    } else if (operation == 2) {
      if (club1G > club2G) {
        const newCurrentLeague = currentLeague.map((club, i) => {
          const C = {
            name: club.name,
            points: club.name === club1 ? club.points + 3 : club.points,
          };
          return C;
        });
        setCurrentLeague(newCurrentLeague);
      } else if (club1G < club2G) {
        const newCurrentLeague = currentLeague.map((club, i) => {
          const C = {
            name: club.name,
            points: club.name === club2 ? club.points + 3 : club.points,
          };
          return C;
        });
        setCurrentLeague(newCurrentLeague);
      } else {
        const newCurrentLeague = currentLeague.map((club, i) => {
          const C = {
            name: club.name,
            points:
              club.name === club1 || club.name === club2
                ? club.points + 1
                : club.points,
          };
          return C;
        });
        setCurrentLeague(newCurrentLeague);
      }
    }
    handlePopUp(0);
  };
  const handlePopUp = (e) => {
    setOperation(e);
    setPopUp(!popUp);
  };
  const handleOnClick = () => {
    navigate("/Leagues");
  };
  useEffect(() => {
    // Assuming you want to update the clubs of the first league in the League state
    if (League.length > 0) {
      const updatedLeagues = [...League];
      updatedLeagues[icurrentLeague].clubs = currentLeague; // Assign currentLeague to the clubs of the first league
      setLeague(updatedLeagues);
    }
  }, [currentLeague]);
  useEffect(() => {
    // Sort currentLeague and store it in sortedCurrentLeague state
    const sorted = [...currentLeague].sort((a, b) => b.points - a.points);
    setSortedCurrentLeague(sorted);
  }, [currentLeague]);
  return (
    <div className="standing">
      <div className={`overlay ${popUp ? "hide" : ""}`}>
        <div className="popup">
          <div className="exit-icon" onClick={handlePopUp}>
            &times;
          </div>
          {operation === 1 ? (
            <input
              type="text"
              placeholder="Enter Club Name"
              onChange={(e) => setTyped(e.target.value)}
            />
          ) : (
            <>
              <div className="flexx">
                <input
                  type="text"
                  placeholder="Enter Club1 Name"
                  onChange={(e) => setClub1(e.target.value)}
                />{" "}
                <input
                  type="text"
                  placeholder="Enter Club2 Name"
                  onChange={(e) => setClub2(e.target.value)}
                />
              </div>
              <div className="flexx">
                <input
                  type="text"
                  placeholder="Enter Club1 Goals"
                  onChange={(e) => setClub1G(e.target.value)}
                />{" "}
                <input
                  type="text"
                  placeholder="Enter Club2 Goals"
                  onChange={(e) => setClub2G(e.target.value)}
                />
              </div>
            </>
          )}
          <button className="btn" onClick={handleOnOpe}>
            Submit
          </button>
        </div>
      </div>
      <div className="add">
        <button className="btn" onClick={handleOnClick}>
          Go To Leagues
        </button>
        <button className="btn" onClick={() => handlePopUp(1)}>
          Add Team
        </button>
        <button className="btn" onClick={() => handlePopUp(2)}>
          Add Match
        </button>
      </div>
      <div className="standings">
        <div className="row heading">
          <div className="rank">Rank</div>
          <div className="team">Team</div>
          <div className="points">Points</div>
        </div>

        {sortedCurrentLeague.map((leag, i) => (
          <div className="row" key={i}>
            <div className="rank">{i + 1}</div>
            <div className="team">{leag.name}</div>
            <div className="points">{leag.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standing;
