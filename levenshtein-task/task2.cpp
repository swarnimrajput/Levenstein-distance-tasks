#include <bits/stdc++.h>
using namespace std;

int editDistance(string str1, string str2)
{
    int n = str1.length();
    int m = str2.length();
    
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));
    vector<vector<pair<int, char>>> operations(n + 1, vector<pair<int, char>>(m + 1));
    
    // Initialize first row and column
    for(int i = 0; i <= n; i++) {
        dp[i][0] = i;
        operations[i][0] = {i-1, 'D'}; // Delete operation
    }
    for(int j = 0; j <= m; j++) {
        dp[0][j] = j;
        operations[0][j] = {j-1, 'I'}; // Insert operation
    }
    operations[0][0] = {-1, 'X'}; // No operation for empty strings
    
    // Fill the dp table and track operations
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            if(str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
                operations[i][j] = {dp[i-1][j-1], 'M'}; // Match
            }
            else {
                int minOp = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                dp[i][j] = 1 + minOp;
                
                if(minOp == dp[i-1][j]) {
                    operations[i][j] = {dp[i-1][j], 'D'}; // Delete
                }
                else if(minOp == dp[i][j-1]) {
                    operations[i][j] = {dp[i][j-1], 'I'}; // Insert
                }
                else {
                    operations[i][j] = {dp[i-1][j-1], 'S'}; // Substitute
                }
            }
        }
    }
    
    // Print the operations
    cout << "Operations to convert " << str1 << " to " << str2 << ":\n";
    int i = n, j = m;
    vector<pair<char, int>> steps;
    
    while(i > 0 || j > 0) {
        char operation = operations[i][j].second;
        steps.push_back({operation, j-1});
        
        if(operation == 'D') i--;
        else if(operation == 'I') j--;
        else { i--; j--; }
    }
    
    reverse(steps.begin(), steps.end());
    string current = str1;
    
    for(auto step : steps) {
        cout << current << " -> ";
        if(step.first == 'D') {
            current.erase(current.begin() + step.second + 1);
            cout << "Delete at position " << step.second + 1 << ": ";
        }
        else if(step.first == 'I') {
            current.insert(current.begin() + step.second + 1, str2[step.second]);
            cout << "Insert " << str2[step.second] << " at position " << step.second + 1 << ": ";
        }
        else if(step.first == 'S') {
            current[step.second] = str2[step.second];
            cout << "Substitute with " << str2[step.second] << " at position " << step.second + 1 << ": ";
        }
        cout << current << endl;
    }
    
    return dp[n][m];
}

int main() {
    string str1, str2;
    cout << "Enter first string: ";
    cin >> str1;
    cout << "Enter second string: ";
    cin >> str2;
    
    cout << "\nMinimum Edit Distance: " << editDistance(str1, str2) << endl;
    return 0;
}