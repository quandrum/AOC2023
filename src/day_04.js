/**
 * Contains solutions for Day 4
 * Puzzle Description: https://adventofcode.com/2023/day/4
 */

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */

export const levelOne = ({ lines }) => {
  return parseInput(lines)
    .filter(({ winners }) => winners.length > 0)
    .reduce((acc, { winners }) => 2 ** (winners.length - 1) + acc, 0);
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ lines }) => {
  const accumulator = {};
  for (let i = 1; i < lines.length + 1; i++) {
    accumulator[i] = 1;
  }

  const copies = parseInput(lines).reduce((acc, { winners }, index) => {
    const winningGames = winners.length;
    const copies = acc[index + 1];

    for (
      let i = index + 2;
      i < Math.min(index + 2 + winningGames, lines.length + 1);
      i++
    ) {
      if (acc[i]) {
        acc[i] += copies;
      }
    }

    return acc;
  }, accumulator);

  return Object.values(copies).reduce((acc, val) => acc + val, 0);
};

const parseInput = (lines) => {
  return lines.map((line) => {
    const [cardNum, cards] = line.split(":");
    const game = cardNum.split(" ")[1];
    const [winning, gameCards] = cards.split("|");
    const winningCard = new Set(winning.split(/\s+/).map(Number));
    const winners = gameCards
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter((card) => winningCard.has(card));
    return { game, winners };
  });
};

const test = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

console.log(levelOne({ lines: test.split("\n") }));
console.log(levelTwo({ lines: test.split("\n") }));
