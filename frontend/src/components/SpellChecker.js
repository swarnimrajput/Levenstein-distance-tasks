import React, { useState } from 'react';
import { 
    Container, 
    TextField, 
    Typography, 
    Paper,
    Box,
    Fade,
    CircularProgress,
    Chip,
    IconButton,
    List
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const API_URL = 'http://localhost:5001';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: '600px',
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
    }
}));

const SearchBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        backgroundColor: '#f8f9fa',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#fff',
            boxShadow: '0 0 0 2px #e3f2fd'
        },
        '&.Mui-focused': {
            backgroundColor: '#fff',
            boxShadow: '0 0 0 2px #bbdefb'
        }
    }
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#1565c0'
    },
    '&.Mui-disabled': {
        backgroundColor: '#e0e0e0'
    }
}));

const SuggestionsList = styled(List)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderRadius: '16px'
}));

const StyledChip = styled(Chip)(({ theme, selected }) => ({
    borderRadius: '12px',
    padding: '20px 12px',
    fontSize: '1rem',
    background: selected ? 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)' : '#fff',
    color: selected ? '#fff' : '#333',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        background: selected 
            ? 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
            : 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)'
    }
}));

function SpellChecker() {
    const [word, setWord] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState('');

    const handleCheck = async () => {
        if (!word.trim()) {
            setError('Please enter a word to check');
            return;
        }

        try {
            setError('');
            setLoading(true);
            setSelectedSuggestion('');
            const response = await axios.post(`${API_URL}/spellcheck`, { word });
            setSuggestions(response.data.suggestions);
            if (response.data.suggestions.length === 0) {
                setError('No suggestions found for this word');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error checking spelling. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCheck();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setWord(suggestion);
        setSelectedSuggestion(suggestion);
        setTimeout(() => {
            setSuggestions([]);
        }, 500);
    };

    return (
        <StyledContainer>
            <Fade in={true} timeout={800}>
                <StyledPaper elevation={3}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <LightbulbIcon 
                            sx={{ 
                                fontSize: 40, 
                                color: '#1976d2',
                                mb: 2
                            }} 
                        />
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Spell Checker
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                mt: 1, 
                                color: 'text.secondary',
                                fontSize: '1.1rem'
                            }}
                        >
                            Enter a word to check its spelling
                        </Typography>
                    </Box>

                    <SearchBox>
                        <StyledTextField
                            fullWidth
                            placeholder="Type a word..."
                            value={word}
                            onChange={(e) => {
                                setWord(e.target.value);
                                setSelectedSuggestion('');
                            }}
                            onKeyPress={handleKeyPress}
                            error={!!error}
                            helperText={error}
                            InputProps={{
                                endAdornment: (
                                    <SearchButton 
                                        onClick={handleCheck}
                                        disabled={!word.trim() || loading}
                                        size="large"
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            <SearchIcon />
                                        )}
                                    </SearchButton>
                                )
                            }}
                        />
                    </SearchBox>

                    {suggestions.length > 0 && (
                        <Fade in={true} timeout={500}>
                            <SuggestionsList>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        mb: 2,
                                        color: 'text.secondary',
                                        fontWeight: 500
                                    }}
                                >
                                    Suggested spellings:
                                </Typography>
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: 1 
                                }}>
                                    {suggestions.map((suggestion, index) => (
                                        <StyledChip
                                            key={index}
                                            label={suggestion}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            selected={selectedSuggestion === suggestion}
                                        />
                                    ))}
                                </Box>
                            </SuggestionsList>
                        </Fade>
                    )}
                </StyledPaper>
            </Fade>
        </StyledContainer>
    );
}

export default SpellChecker; 