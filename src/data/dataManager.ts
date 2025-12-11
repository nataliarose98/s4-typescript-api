export type JokeReport = {
  joke: string;
  score: number;
  date: string;
};

export const reportJokes: JokeReport[] = [];

export function addJokeToReport(joke: string, score: number) {
  const report: JokeReport = {
    joke: joke,
    score: score,
    date: new Date().toISOString(),
  };

  reportJokes.push(report);
  console.log("Updated Report:", reportJokes);
}
