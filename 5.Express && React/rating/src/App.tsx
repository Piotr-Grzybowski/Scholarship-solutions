import React from "react";
import data from "./assets/data/data.json";
import "./App.css";
import RatingsList from "./components/ratingslist/RatingsList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RatingsList ratings={data.ratings}></RatingsList>
      </header>
    </div>
  );
}

export default App;
