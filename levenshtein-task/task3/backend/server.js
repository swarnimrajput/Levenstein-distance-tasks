const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const dictionary = ["cred", "bet", "shat", "that", "brad", "cart", "brat", "card"];
const Ci = 1, Cd = 1, Cs = 1;

function levenshteinDistance(s1, s2, Ci, Cd, Cs) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i * Cd;
  for (let j = 0; j <= n; j++) dp[0][j] = j * Ci;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : Cs;
      dp[i][j] = Math.min(
        dp[i - 1][j] + Cd,
        dp[i][j - 1] + Ci,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

app.post("/spellcheck", (req, res) => {
  const input = req.body.word.toLowerCase();
  let minDist = Infinity;
  let suggestions = [];

  for (const word of dictionary) {
    const dist = levenshteinDistance(input, word, Ci, Cd, Cs);
    if (dist < minDist) {
      suggestions = [word];
      minDist = dist;
    } else if (dist === minDist) {
      suggestions.push(word);
    }
  }

  res.json({ suggestions });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
