const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const input = `REDACTED`;
const notSpecial = /[A-Za-z0-9.]/;

function parse(input: string): {
  partNumbers: number[];
  gearNumbers: { [location: string]: number[] };
} {
  const map = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  const height = map.length;
  const width = map[0].length;

  const get = (x: number, y: number): string => {
    if (x < 0 || x >= width || y < 0 || y >= height) return ".";
    return map[y][x];
  };

  const partNumbers: number[] = [];
  const gearNumbers: { [location: string]: number[] } = {};
  for (let y = 0; y < height; y++) {
    let current: string[] = [];
    let adjacent: { val: string; x: number; y: number }[] = [];
    for (let x = 0; x < width; x++) {
      if (/\d/.test(get(x, y))) {
        current.push(get(x, y));
        for (let ax = -1; ax <= 1; ax++) {
          for (let ay = -1; ay <= 1; ay++) {
            adjacent.push({ val: get(x + ax, y + ay), x: x + ax, y: y + ay });
          }
        }
      }

      if (
        current.length > 0 &&
        (x === width - 1 || !/\d/.test(get(x + 1, y)))
      ) {
        const isPartNumber = !!adjacent.find(
          ({ val }) => val !== "." && !/\d/.test(val)
        );

        const number = current
          .map(
            (num, index) =>
              Number(num) * Math.pow(10, current.length - index - 1)
          )
          .reduce((acc, val) => acc + val, 0);
        if (isPartNumber) {
          partNumbers.push(number);
        }
        const gears = adjacent.filter((adj) => adj.val === "*");
        if (gears.length) {
          const seen: string[] = [];
          gears.map((gear) => {
            const location = `${gear.x},${gear.y}`;
            if (seen.includes(location)) return;
            seen.push(location);
            if (!gearNumbers[location]) {
              gearNumbers[location] = [];
            }
            gearNumbers[location].push(number);
          });
        }
        current = [];
        adjacent = [];
      }
    }
  }
  return { partNumbers, gearNumbers };
}

function part1(input: string): number {
  return parse(input).partNumbers.reduce((acc, val) => acc + val, 0);
}

function part2(input: string): number {
  return Object.entries(parse(input).gearNumbers)
    .filter(([_, gears]) => gears.length == 2)
    .map(([_, gears]) => gears[0] * gears[1])
    .reduce((acc, val) => acc + val, 0);
}

console.log("part 1 test", part1(test));
console.log("part 1", part1(input));
console.log("part 2 test", part2(test));
console.log("part 2", part2(input));
export { part1 };
