import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="page-bg">
    <div id="weather" class="top-left">Loading weather...</div>

    <div class="center-wrap">
      <div class="card" role="region" aria-label="card-title">
        <h1 id="card-title" class="card-title">Ready to laugh?<span aria-hidden="true">🤣</span></h1>
        <p id="joke-container" class="card-joke" aria-live="polite">Loading joke...</p>

        <div id="score-buttons">
          <button class="score-btn" data-score="1">1</button>
          <button class="score-btn" data-score="2">2</button>
          <button class="score-btn" data-score="3">3</button>
        </div>

        <button id="next-joke" class="btn">Next joke</button>
      </div>
    </div>
  </div>
`;

const jokeContainer = document.querySelector<HTMLDivElement>('#joke-container')!
const nextJokeBtn = document.querySelector<HTMLButtonElement>('#next-joke')!

async function fetchJoke(): Promise<string> {
  const response = await fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json'}})
  const data = await response.json()
  return data.joke
}

async function showJoke() {
  if(jokeContainer.textContent && jokeContainer.textContent !== 'Loading joke...'){
    saveJoke(jokeContainer.textContent)
  }


  const joke = await fetchJoke()
  jokeContainer.textContent = joke
  console.log(joke)
}



nextJokeBtn.addEventListener('click', showJoke)

//Exercise 3

type JokeReport = {
  joke: string;
  score: number;
  date: string;
}

const reportJokes: JokeReport[] = [];

const scoreButtons = document.querySelectorAll<HTMLAnchorElement>('.score-btn')
let currentScore: number | null = null;

function saveJoke(joke: string){
  const report: JokeReport = {
    joke,
    score: currentScore ?? 0,
    date: new Date().toISOString()
  }
  reportJokes.push(report)
  console.log(reportJokes)
}

scoreButtons.forEach(button => {
  button.addEventListener('click', () =>{
    currentScore = Number(button.dataset.score)
    console.log('Selected score', currentScore)
  })
})

//exercise 4 

const key = 'd074b52056b5ddcc5bcb4d159d7624c1'

async function fetchWeather(city:string) {

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  )

  const data = await response.json()
  return data
  
}

const weatherDiv = document.getElementById('weather')!;

async function showWeather() {
  const data = await fetchWeather('Barcelona')
  const temp = data.main.temp
  const description = data.weather[0].description
  weatherDiv.textContent = `Today: ${description}, ${temp}°C`
  
}

showWeather()
showJoke();
