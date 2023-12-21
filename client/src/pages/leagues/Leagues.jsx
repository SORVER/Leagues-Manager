import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LeaguesContext } from "../../Contexts/LeaguesContext";
const Leagues = () => {
  const { League, setCurrentLeague, setICurrentLeague } =
    useContext(LeaguesContext);
  const navigate = useNavigate();
  const handleOnClick = (lis, i) => {
    setICurrentLeague(i);
    setCurrentLeague(lis);
    navigate("/standing");
  };
  return (
    <div className="center">
      <ul>
        {League.length === 0 ? (
          <h1>There is No Leagues</h1>
        ) : (
          League.map((L, i) => (
            <li onClick={() => handleOnClick(L.clubs, i)} key={i}>
              {L.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leagues;
