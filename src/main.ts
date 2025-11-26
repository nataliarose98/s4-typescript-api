import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div>
    <h1>Jokes app</h1>
    <div id="joke-container"></div>
    <button id="next-joke">Next joke</button>
  </div>
`;
