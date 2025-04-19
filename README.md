# Flip Transaction App (For Testing Purpose)

[![Expo](https://img.shields.io/badge/expo-000.svg?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactnative.dev/)
[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

A mobile application for managing financial transactions on flip.id, built with React Native Expo and Redux for state management.

## Features

- Transaction list and detail views
- Search functionality
- Sorting options
- Clipboard integration
- Responsive design
- Cross-platform support (iOS, Android, Web)
- Secure environment configuration

## Tech Stack

- **Framework**: React Native Expo
- **Navigation**: Expo Router
- **State Management**: Redux Toolkit
- **Testing**: Jest
- **Linting**: ESLint
- **Package Manager**: Yarn
- **Environment Management**: `.env` files

## Prerequisites

- Node.js (v18+ recommended)
- Yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS/Android simulator or physical device

## Installation

1. Clone the repository:
```bash
git clone https://github.com/martinluternn/flip-trx.git
cd flip-trx
```

2. Install dependencies:
```bash
yarn install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Running the App
Start development server:
```bash
yarn start
```

Platform-specific commands:
```bash
yarn android    # Android
yarn ios        # iOS
yarn web        # Web
```

5. Testing
Run unit tests with coverage:
```bash
yarn test
```

6. Linting
Check code quality:
```bash
yarn lint
```

Fix linting issues:
```bash
yarn lint --fix
```

7. Project Structure
flip-trx/
├── app/                # Expo Router components
├── assets/             # Images and fonts
├── components/         # Reusable components
├── hooks/              # React hooks
├── redux/              # Redux store and slices
├── themes/             # Theme configuration
├── utils/              # Helper functions and formatters
├── .env.example        # Environment template
└── babel.config.js     # Babel configuration

for more details, contact: `mlutern@gmail.com`