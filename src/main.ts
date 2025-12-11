import "./style.css";
import { fetchDadJoke, fetchChuckNorrisJoke } from "./services/jokes";
import { fetchWeather } from "./services/weather";
import { addJokeToReport } from "./data/dataManager";

const jokeContainer =
  document.querySelector<HTMLDivElement>("#joke-container")!;
const nextJokeBtn = document.querySelector<HTMLButtonElement>("#next-joke")!;
const weatherDiv = document.getElementById("weather")!;
const scoreButtons = document.querySelectorAll<HTMLButtonElement>(".score-btn");

let currentJokeText = "";
let currentScore: number | null = null;


async function getNextJoke() {
  return Math.random() < 0.5
    ? await fetchDadJoke()
    : await fetchChuckNorrisJoke();
}

async function showJoke() {
  if (currentJokeText && currentScore !== null) {
    addJokeToReport(currentJokeText, currentScore);
  }


  currentScore = null
  jokeContainer.textContent = "Loading...";

  try {
    const joke = await getNextJoke();
    currentJokeText = joke;
    jokeContainer.textContent = joke;
  } catch (error) {
    jokeContainer.textContent = "Error loading joke";
  }
}

async function loadWeather() {
  try {
    const data = await fetchWeather("Barcelona");
    weatherDiv.textContent = `Barcelona: ${
      data.weather[0].description
    }, ${Math.round(data.main.temp)}°C`;
  } catch (error) {
    weatherDiv.textContent = "Weather unavailable";
  }
}



nextJokeBtn.addEventListener("click", showJoke);

scoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentScore = Number(btn.dataset.score);
    console.log(`Score: ${currentScore}`);
  });
});

loadWeather();
showJoke();
