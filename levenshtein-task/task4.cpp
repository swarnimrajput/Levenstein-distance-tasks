#include <bits/stdc++.h>
using namespace std;

/*
Space-optimized solution for Levenshtein Distance
prev array: Stores the minimum edit distances for the previous row (for str1[0..i-1] and all prefixes of str2).
cur array: Stores the minimum edit distances for the current row (for str1[0..i] and all prefixes of str2).
Each of these arrays is of length m+1 (length of str2 plus one for the empty prefix).
*/
int editDistance(string str1, string str2)
{
    int n = str1.size();
    int m = str2.size();
    vector<int> prev(m+1, 0), cur(m+1, 0);
    
    // Initialize first row
    for(int j = 0; j <= m; j++) {
        prev[j] = j;
    }
    
    // Fill the arrays
    for(int i = 1; i <= n; i++) {
        cur[0] = i;  // Initialize first column of current row
        for(int j = 1; j <= m; j++) {
            if(str1[i-1] == str2[j-1]) {
                cur[j] = prev[j-1];  // No operation needed
            }
            else {
                cur[j] = 1 + min({prev[j],      // deletion
                                cur[j-1],      // insertion
                                prev[j-1]});   // substitution
            }
        }
        prev = cur;  // Update previous row for next iteration
    }
    
    return prev[m];
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

// Space Complexity: O(m)