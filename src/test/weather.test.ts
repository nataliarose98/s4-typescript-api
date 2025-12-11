import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchWeather } from "../services/weather";

const weatherMock = {
  main: { temp: 20.5 },
  weather: [{ description: "clear sky" }],
  name: "Barcelona",
};

const mockFetch = (data: any, ok: boolean = true) =>
  Promise.resolve({
    ok: ok,
    json: () => Promise.resolve(data),
  } as Response);

describe("Weather Service", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  it("You should get the weather data and call the API with the correct city.", async () => {
    fetchSpy.mockImplementation(() => mockFetch(weatherMock));

    const city = "Madrid";
    const data = await fetchWeather(city);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(`q=${city}`));
    
    expect(data.name).toBe("Barcelona"); 
  });

  it("It should throw an error if the weather response is not OK.", async () => {
    fetchSpy.mockImplementation(() => mockFetch({}, false));

    await expect(fetchWeather("Seville")).rejects.toThrow(
      "The weather could not be obtained"
    );
  });
});
