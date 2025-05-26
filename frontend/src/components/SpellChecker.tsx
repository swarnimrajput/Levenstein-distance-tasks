import React, { useState } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    Typography, 
    Paper 
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5001';

const SpellChecker: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const handleCheck = async () => {
        if (!word.trim()) {
            setError('Please enter a word to check');
            return;
        }

        try {
            setError('');
            const response = await axios.post(`${API_URL}/spellcheck`, { word });
            setSuggestions(response.data.suggestions);
            if (response.data.suggestions.length === 0) {
                setError('No suggestions found for this word');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error checking spelling. Please try again.');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleCheck();
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Spell Checker
                </Typography>
                <TextField
                    fullWidth
                    label="Enter a word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyPress={handleKeyPress}
                    margin="normal"
                    error={!!error}
                    helperText={error}
                />
                <Button 
                    variant="contained" 
                    onClick={handleCheck}
                    sx={{ mt: 2 }}
                    fullWidth
                    disabled={!word.trim()}
                >
                    Check Spelling
                </Button>

                {suggestions.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6">Suggestions:</Typography>
                        <List>
                            {suggestions.map((suggestion, index) => (
                                <ListItem key={index}>
                                    <Typography>{suggestion}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default SpellChecker;
