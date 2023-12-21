import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leagues, Standing, Create, Home } from "./pages";
import { LeaguesContext } from "./Contexts/LeaguesContext";
import { useState , useEffect } from "react";
function App() { 
  const [League, setLeague] = useState([]);
  const [currentLeague, setCurrentLeague] = useState([]);
  const [icurrentLeague, setICurrentLeague] = useState(0);


   useEffect(()=> {

     const fetchLeagues = async () => {

           try {

               const response = await fetch('/api/leagues');
               const data = await response.json();
               setLeague(data); 
           } catch (error){

            console.error('Error while fetching leagues:', error);
           }

     };
     fetchLeagues();




   }, []);

  return (
    <LeaguesContext.Provider
      value={{
        League,
        setLeague,
        icurrentLeague,
        setICurrentLeague,
        currentLeague,
        setCurrentLeague,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/standing" element={<Standing />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </LeaguesContext.Provider>
  );
}

export default App;
