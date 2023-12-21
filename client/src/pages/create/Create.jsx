import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaguesContext } from "../../Contexts/LeaguesContext";
const Create = () => {
  const { League, setLeague, setCurrentLeague, setICurrentLeague } =
    useContext(LeaguesContext);
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const handleOnClick = () => {
    const newLeague = { name: Name, clubs: [] };
    setICurrentLeague(League.length);
    setLeague((prevLeague) => [...prevLeague, newLeague]);
    setCurrentLeague(newLeague.clubs);
    navigate("/standing");
  };
  return (
    <div className="center  ">
      <input
        type="text"
        placeholder="Enter League Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn" onClick={handleOnClick}>
        Create
      </button>
    </div>
  );
};

export default Create;
