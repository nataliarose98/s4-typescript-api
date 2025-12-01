import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="page-bg">
    <div class="top-left">Today: partly cloudy</div>

    <div class="center-wrap">
      <div class="card" role="region" aria-label="card-title">
        <h1 id="card-title" class="card-title">Ready to laugh?<span aria-hidden="true">🤣</span></h1>
        <p id="joke-container" class="card-joke" aria-live="polite">Loading joke...</p>
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
  const joke = await fetchJoke()
  jokeContainer.textContent = joke
  console.log(joke)
}

showJoke()

nextJokeBtn.addEventListener('click', showJoke)
