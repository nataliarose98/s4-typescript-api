import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  reportJokes,
  addJokeToReport,
  type JokeReport,
} from "../data/dataManager";

const MOCK_DATE = "2025-12-11T10:00:00.000Z";

describe("DataManager", () => {
  beforeEach(() => {
    reportJokes.length = 0; 
    vi.useFakeTimers(); 
    vi.setSystemTime(new Date(MOCK_DATE)); 
  });

  it("It should be initialized with an empty array", () => {
    expect(reportJokes).toHaveLength(0);
  });

  it("You should add a joke report with the correct punctuation and date.", () => {
    const jokeText = "A test joke.";
    const scoreValue = 3;

    addJokeToReport(jokeText, scoreValue);

    expect(reportJokes).toHaveLength(1);
    expect(reportJokes[0]).toEqual({
      joke: jokeText,
      score: scoreValue,
      date: MOCK_DATE, 
    } as JokeReport);
  });

  it("should handle multiple reports", () => {
    addJokeToReport("Joke 1", 1);
    addJokeToReport("Joke 2", 2);

    expect(reportJokes).toHaveLength(2);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
