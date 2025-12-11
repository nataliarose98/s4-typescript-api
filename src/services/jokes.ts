export async function fetchDadJoke(): Promise<string> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error loading joke");
  }

  const data = await response.json();
  return data.joke;
}

export async function fetchChuckNorrisJoke(): Promise<string> {
  const response = await fetch("https://api.chucknorris.io/jokes/random");

  if (!response.ok) {
    throw new Error("Error loading joke");
  }

  const data = await response.json();
  return data.value;
}
