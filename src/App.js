import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import {AiOutlineSearch}  from 'react-icons/ai';

import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=996e0b0b";
const title = 'interstelar'
const APIKey = "996e0b0b"

export default function App () {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    async function searchMovies() {
      setIsLoading(true)
      const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${searchTerm}`);

      const data = await response.json();
      setMovies(data.Search);
      setIsLoading(false)
    };
    searchMovies();  
  }, [searchTerm]);



  return (
    <>
   <div className="app">
    <div className="gradient-div">
       <h1 className="gradient-border" >CinemaPlanet</h1>
    </div>
       <Search 
         searchTerm={searchTerm} 
         setSearchTerm={setSearchTerm} 
         setMovies={setMovies} />
      {isLoading && <Loader/>}
      {!isLoading && <MovieList movies={movies} /> }       
    </div>)
    </>
  );
};

function Search({searchTerm, setSearchTerm}) {
  return (
     <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <AiOutlineSearch style={{color: 'white', fontSize: '30px',fontWeight: 'bold'}} onClick={(e) => setSearchTerm(e.target.value)}/> 
      </div>
  )
}

function MovieList({movies}) {
  return (
     <div className="container">
          {movies?.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID}/>
          ))}
        </div>
  )
}

function Loader() {
    return <h3>Loading ... </h3>
  } 

