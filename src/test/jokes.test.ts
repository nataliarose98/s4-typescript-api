import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchDadJoke, fetchChuckNorrisJoke } from "../services/jokes";

const mockFetch = (data: any, ok: boolean = true) =>
  Promise.resolve({
    ok: ok,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  } as Response);

describe("Jokes Services", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get a dad joke properly", async () => {
    // ... (Tu test actual) ...
    const dadJokeMock = { joke: "A very funny dad joke" };
    fetchSpy.mockImplementation(() => mockFetch(dadJokeMock));

    const joke = await fetchDadJoke();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(joke).toBe(dadJokeMock.joke);
  });

  it("It should throw an error if fetchDaJoke fails (response.ok is false)", async () => {
    // ... (Tu test actual) ...
    fetchSpy.mockImplementation(() => mockFetch({}, false));

    await expect(fetchDadJoke()).rejects.toThrow(
      "Mistake when asking for the dad joke"
    );
  });

  it("You should get a Chuck Norris joke properly.", async () => {
    const chuckNorrisJokeMock = {
      value: "Chuck Norris doesn't do push-ups, he pushes the Earth down.",
    };
    fetchSpy.mockImplementation(() => mockFetch(chuckNorrisJokeMock));
    const joke = await fetchChuckNorrisJoke();
    expect(joke).toBe(chuckNorrisJokeMock.value);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("It should throw an error if fetchChuckNorrisJoke fails (response.ok is false)", async () => {
    fetchSpy.mockImplementation(() => mockFetch({}, false));
    await expect(fetchChuckNorrisJoke()).rejects.toThrow(
      "Mistake when asking for the Chuck Norris joke"
    );
  });
});
