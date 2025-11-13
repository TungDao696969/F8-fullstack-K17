const matches = [
  { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
  { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
  { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
  { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
  { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
];
// Tính số trận thắng, hòa, thua của mỗi đội.
const result = {};

matches.forEach((team) => {

    if (!result[team.teamA]) {
        result[team.teamA] = {win: 0, lose: 0, draw: 0}
    }
    if (!result[team.teamB]) {
        result[team.teamB] = {win: 0, lose: 0, draw: 0}
    }

    if (team.scoreA > team.scoreB) {
        result[team.teamA].win++;
        result[team.teamB].lose++
    }else if (team.scoreA < team.scoreB) {
        result[team.teamA].lose++;
        result[team.teamB].win++;
    }else {
        result[team.teamA].draw++;
        result[team.teamB].draw++
    }

    return result;
});
console.log(result);

// Xếp hạng các đội bóng theo số điểm, với quy tắc:
// Thắng: +3 điểm

// Hòa: +1 điểm

// Thua: +0 điểm

const sum = {};

matches.forEach((team) => {

    if (!sum[team.teamA]) {
        sum[team.teamA] = {win: 0, lose: 0, draw: 0, poin: 0}
    }
    if (!sum[team.teamB]) {
        sum[team.teamB] = {win: 0, lose: 0, draw: 0, poin: 0}
    }

    if (team.scoreA > team.scoreB) {
        sum[team.teamA].win++;
        sum[team.teamB].lose++
        sum[team.teamA].poin += 3
    }else if (team.scoreA < team.scoreB) {
        sum[team.teamA].lose++;
        sum[team.teamB].win++;
        sum[team.teamB].poin+=3;
    }else {
        sum[team.teamA].draw++;
        sum[team.teamB].draw++;
        sum[team.teamA].poin+=1;
        sum[team.teamB].poin+=1;
    }

    return sum;
});
const resultB = Object.entries(sum);
const a = resultB.map((item) => {
    const team = item[0]; 
  const data = item[1]; 
  return {
    team: team,
    win: data.win,
    lose: data.lose,
    draw: data.draw,
    point: data.poin
  }
}).sort((a, b) => b.point - a.point);
console.log(a);


// Tìm đội có số bàn thắng nhiều nhất.
const goal = {};
matches.forEach((item) => {
    goal[item.teamA] = (goal[item.teamA] || 0) + item.scoreA;
    goal[item.teamB] = (goal[item.teamB] || 0) + item.scoreB;
});
const bigGoal = Object.entries(goal).reduce((acc, index) => {
    return index.goal > acc.goal ? index:acc;
});
console.log("Đội có nhiều bàn thắng nhất là: ",bigGoal);





