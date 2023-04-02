import { useState, useEffect } from 'react'

import './App.css'

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");

  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  };

  // start the game
  const startGame = () => {
    // clear all letters
    clearLetterStates()

    // choose a word
    const { category, word } = pickWordAndCategory();

    // separando palavra em letras
    let wordLetters = word.split("");

    // deixando as letras todas minusculas 
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }


  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
   

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
        setGuesses((actualGuesses) => actualGuesses - 1)
      ]);
    }
  };




  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  const clearLetterStates = () => {
    setWrongLetters([])
    setGuessedLetters([])

    setGuesses(3);
    setGameStage(stages[0].name);
  }


  // check win condition 
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    // win condition
    if (guessedLetters.length == uniqueLetters.length && gameStage == "game") {
      // add score
      setScore((score) => score += 100);
      // restart game with new word
      startGame();
    }


  }, [guessedLetters, letters, startGame]);



  // check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses]);




  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
