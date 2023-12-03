const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const input = `REDACTED`;
type round = {
  value: number;
  color: string;
};
type game = {
  game: number;
  rounds: round[][];
};

function parse(input: string): game[] {
  return input.split("\n").map((line) => {
    const game = new Number(line.split(":")[0].split(" ")[1].trim()) as number;
    const rounds = line
      .split(":")[1]
      .trim()
      .split(";")
      .map((round) => round.trim())
      .map((round) =>
        round
          .split(",")
          .map((item) => item.trim())
          .map((item) => item.split(" "))
          .map(([value, color]) => ({
            value: new Number(value) as number,
            color,
          }))
      );

    return {
      game,
      rounds,
    };
  });
}

type bag = {
  red: number;
  blue: number;
  green: number;
};

const part1Bag = {
  red: 12,
  blue: 14,
  green: 13,
};

function isPossible(game: game, bag: bag): boolean {
  const result = game.rounds.every((round, index) => {
    const roundResult = round.every((item) => {
      const { value, color } = item;
      const total = bag[color] - value;
      return total >= 0;
    });
    return roundResult;
  });
  return result;
}

function findMinimum(game: game): bag {
  const bag = {
    red: 0,
    blue: 0,
    green: 0,
  };
  game.rounds.forEach((round) => {
    round.forEach((item) => {
      const { value, color } = item;
      if (bag[color] < value) {
        bag[color] = value;
      }
    });
  });
  return bag;
}

function part1(input: string, bag = part1Bag) {
  const games = parse(input);
  const good = games
    .filter((game) => isPossible(game, bag))
    .map((game) => game.game);
  return good.reduce((acc, game) => acc + game, 0);
}

function part2(input: string) {
  const games = parse(input);
  return games
    .map((game) => findMinimum(game))
    .map(({ red, blue, green }) => red * blue * green)
    .reduce((acc, powerset) => acc + powerset, 0);
}

console.log("part1 test", part1(test));
console.log("part2 test", part2(test));
console.log("part1", part1(input));
console.log("part2", part2(input));

export { part1, part2 };
