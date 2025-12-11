const API_KEY = "d074b52056b5ddcc5bcb4d159d7624c1";

export async function fetchWeather(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("The weather could not be obtained");
  return await response.json();
}
