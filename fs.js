const scores = [
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 50, 40, 40, 40, 40, 40, 40, 50, 50,
  80, 90, 60,
];
const k = 6;

const numOfStudents = (scores, k) => {
  const sortedScores = scores.sort((a, b) => b - a);
  console.log(sortedScores);
  let count = 0;
  let position = 0;
  let positionArray = [];

  for (let i = 0; i <= sortedScores.length; i++) {
    if (position <= k) {
      if (position === k && sortedScores[i] !== sortedScores[i - 1]) {
        return positionArray.length;
      } else {
        positionArray.push(sortedScores[i]);
        if (i === 0) {
          count++;
          position++;
        } else {
          if (sortedScores[i] === sortedScores[i - 1]) {
            count++;
            if (
              i !== sortedScores.length - 1 &&
              sortedScores[i] !== sortedScores[i + 1]
            )
              position += count;
          } else {
            position += count;
            count = 1;
          }
        }
      }
    } else {
      return positionArray.length;
    }
  }
  return positionArray.length;
};

console.log(numOfStudents(scores, k));
