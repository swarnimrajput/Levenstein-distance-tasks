# Spell Checker Application

A full-stack spell checker application that suggests similar words using the Levenshtein distance algorithm.

## Features

- Real-time spell checking
- Word suggestions based on Levenshtein distance
- Configurable cost for insertions, deletions, and substitutions
- Modern React frontend with Material-UI
- Express.js backend with efficient algorithm implementation

## Tech Stack

- Frontend:
  - React with TypeScript
  - Material-UI for components
  - Axios for API calls

- Backend:
  - Node.js
  - Express.js
  - CORS enabled
  - Custom Levenshtein distance implementation

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
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

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## API Endpoints

- `POST /spellcheck`
  - Request body: `{ "word": "string" }`
  - Response: `{ "suggestions": ["string"] }`

## Algorithm Details

The spell checker uses the Levenshtein distance algorithm with configurable costs:
- Insertion cost (Ci) = 1
- Deletion cost (Cd) = 1
- Substitution cost (Cs) = 1

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 