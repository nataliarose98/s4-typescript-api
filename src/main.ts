import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div>
    <h1>Jokes App</h1>
    <div id="joke-container"></div>
    <button id="next-joke">Next Joke</button>
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
