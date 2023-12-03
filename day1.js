function replace(input, index) {
  if (input.substr(index, 3) === "one") return 1;
  if (input.substr(index, 3) === "two") return 2;
  if (input.substr(index, 3) === "six") return 6;
  if (input.substr(index, 4) === "four") return 4;
  if (input.substr(index, 4) === "five") return 5;
  if (input.substr(index, 4) === "nine") return 9;
  if (input.substr(index, 5) === "seven") return 7;
  if (input.substr(index, 5) === "eight") return 8;
  if (input.substr(index, 5) === "three") return 3;
  return;
}

function update(input, idx, acc = []) {
  if (idx >= input.length) return acc;
  if (/\d/.test(input[idx])) {
    acc.push(+input[idx]);
    return update(input, idx + 1, acc);
  }
  const val = replace(input, idx);
  if (val) {
    acc.push(val);
    return update(input, idx + 1, acc);
  }
  return update(input, idx + 1, acc);
}

const test = `REDACTED`;

const answer = test
  .split("\n")
  .map((str) => update(str, 0))
  .map((str) => new Number(str[0]) * 10 + new Number(str.slice(-1)))
  .reduce((a, b) => a + b, 0);

console.log(answer);
