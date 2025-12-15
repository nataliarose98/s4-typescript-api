import "./style.css";
import { fetchDadJoke, fetchChuckNorrisJoke } from "./services/jokes";
import { fetchWeather } from "./services/weather";
import { addJokeToReport } from "./data/dataManager";

const jokeContainer =
  document.querySelector<HTMLDivElement>("#joke-container")!;
const nextJokeBtn = document.querySelector<HTMLButtonElement>("#next-joke")!;
const scoreButtons =
  document.querySelectorAll<HTMLButtonElement>(".joke-score-btn");

const weatherIconEl = document.querySelector<HTMLSpanElement>("#weather-icon")!;
const weatherTextEl = document.querySelector<HTMLSpanElement>("#weather-text")!;

let currentJokeText = "";
let currentScore: number | null = null;

function getWeatherEmoji(iconCode: string): string {
  switch (iconCode) {
    case "01d":
    case "01n":
      return "☀️";
    case "02d":
    case "02n":
      return "🌤️";
    case "03d":
    case "03n":
      return "☁️";
    case "04d":
    case "04n":
      return " overcast";
    case "09d":
    case "09n":
      return "🌧️";
    case "10d":
    case "10n":
      return "☔";
    case "11d":
    case "11n":
      return "⛈️";
    case "13d":
    case "13n":
      return "❄️";
    case "50d":
    case "50n":
      return "🌫️";
    default:
      return "🌡️";
  }
}

async function getNextJoke() {
  return Math.random() < 0.5
    ? await fetchDadJoke()
    : await fetchChuckNorrisJoke();
}

async function showJoke() {
  if (currentJokeText && currentScore !== null) {
    addJokeToReport(currentJokeText, currentScore);
  }

  currentScore = null;
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

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const emoji = getWeatherEmoji(iconCode);

    weatherIconEl.textContent = emoji;
    weatherTextEl.textContent = `Barcelona: ${description}, ${temperature}°C`;
  } catch (error) {
    weatherIconEl.textContent = "❌";
    weatherTextEl.textContent = "Weather unavailable";
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
