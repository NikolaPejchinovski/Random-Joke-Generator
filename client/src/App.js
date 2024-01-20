import Header from "./components/Header";
import Joke from "./components/Joke";
import Button from "./components/Button";
import { useState, useEffect } from "react";

function App() {

  const [joke, setJoke] = useState('Loading...');

  // Fetch joke
  useEffect(() => {

    fetchJoke();

    updateJoke();

  }, []);

  const fetchJoke = async () => {
    let res = await fetch('http://localhost:8000/joke');
    let data = await res.json();

    return data;
  }

  // Update the joke
  const updateJoke = async () => {
    const fetchedJoke = await fetchJoke();
    console.log(fetchedJoke[0].joke);
    setJoke(fetchedJoke[Math.floor((Math.random() * 10))].joke);
  }

   // Get Another Joke 
   const getAnotherJoke = () => {
    updateJoke();
    }; 

      

  return (
    <div className="container">
      <Header />
      <Joke joke={joke} />
      <Button text='Get Another Joke' onClick={getAnotherJoke}/>
    </div>
  );
}

export default App;
