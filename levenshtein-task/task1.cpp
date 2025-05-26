#include <bits/stdc++.h>
using namespace std;

int editDistance(string str1, string str2) {
    int n = str1.length();
    int m = str2.length();

    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    // Initialize first row and column
    for (int i = 0; i <= n; ++i) dp[i][0] = i;  // delete all i characters
    for (int j = 0; j <= m; ++j) dp[0][j] = j;  // insert all j characters

    // Fill the dp table
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (str1[i - 1] == str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // No operation needed
            } else {
                dp[i][j] = 1 + min({
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // substitute
                });
            }
        }
    }

    return dp[n][m];
}

int main() {
    string s1, s2;
    cout << "Enter first string: ";
    cin >> s1;
    cout << "Enter second string: ";
    cin >> s2;

    int result = editDistance(s1, s2);
    cout << "Minimum Edit Distance: " << result << endl;

    return 0;
}