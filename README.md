# MaxOutProgressionApp

MaxOutProgressionApp is a React Native application built with Expo, designed to help users track and improve their workout progression.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MaxOutProgressionApp.git
   cd MaxOutProgressionApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx expo start
   ```

## Running the App

- To run on iOS simulator: Press `i` in the terminal after starting the development server
- To run on Android emulator: Press `a` in the terminal after starting the development server
- To run on web: Press `w` in the terminal after starting the development server

## Building the App

To create a production build:

1. For Android:
   ```
   eas build --platform android
   ```

2. For iOS:
   ```
   eas build --platform ios
   ```

3. For web:
   ```
   npx expo export
   ```

## Testing

Run the test suite with:
```
npm test
```