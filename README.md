# Spell Checker Application

A modern spell checker application built with React and Node.js that suggests corrections for misspelled words using the Levenshtein distance algorithm.

## Features

- Real-time spell checking
- Interactive word suggestions
- Modern, responsive UI with Material-UI
- RESTful API backend
- Efficient word similarity calculation

## Tech Stack

- **Frontend:**
  - React
  - Material-UI
  - Axios for API calls

- **Backend:**
  - Node.js
  - Express
  - Custom Levenshtein distance implementation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spell-checker.git
   cd spell-checker
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on http://localhost:5001

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your default browser at http://localhost:3000

## API Endpoints

- `POST /spellcheck`
  - Checks spelling and returns suggestions
  - Request body: `{ "word": "yourword" }`
  - Response: `{ "suggestions": ["suggestion1", "suggestion2", ...] }`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 