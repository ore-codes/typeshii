# TypeShii Monorepo

Welcome to **TypeShii**, a fast-paced multiplayer typing racing game built as part of a take-home assessment for PlayHour.ai. This monorepo is managed using **Turborepo** and contains both the frontend and backend for the game.

## 🎮 About the Game

TypeShii is a multiplayer game where players compete to type through a given paragraph as quickly and accurately as possible. The first player to complete the paragraph wins!

### How to Play
1. **Join or Create a Game**:
    - Enter an existing game ID or create a new game.
2. **Race to Type**:
    - Type the provided paragraph as quickly and accurately as possible.
    - Progress is displayed in real-time for all players.
3. **Win**:
    - The first player to complete the paragraph is the winner, but all players can see their scores and rankings at the end.

---

## 🛠️ Technologies Used

### Frontend (apps/web)
- **[RxJS](https://rxjs.dev/)**: For reactive state management and handling real-time updates efficiently.
- **[Storybook](https://storybook.js.org/)**: For building and testing UI components in isolation.
- **[Framer Motion](https://www.framer.com/motion/)**: For smooth animations and transitions.
- **[Vite](https://vitejs.dev/)**: A fast and modern frontend build tool.
- **[Socket.IO](https://socket.io/)**: For real-time communication between the client and server.

### Backend (apps/server)
- **[Node.js](https://nodejs.org/)**: Runtime for building server-side applications.
- **[NestJS](https://nestjs.com/)**: Framework for scalable and modular backend systems.
- **[Socket.IO](https://socket.io/)**: Library for real-time bidirectional communication.
- **[RxJS](https://rxjs.dev/)**: Reactive programming for efficient handling of data streams.
- **[Redis](https://redis.io/)**: In-memory data store for fast state management.
- **[Jest](https://jestjs.io/)**: For end-to-end testing.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later)
- **npm** (preferred dependency manager)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ore-codes/typeshii.git
   cd typeshii
   ```  

2. **Install Dependencies**
   ```bash
   npm install
   ```  

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory with the following content:
   ```env
   # Backend
   PORT=3000
   REDIS_URL=redis://localhost:6379
   
   # Frontend
   VITE_SERVER_URL=http://localhost:3000
   ```  
   Replace values as needed based on your setup.

4. **Run the Development Servers**
   ```bash
   npm run dev
   ```  
   This will start both the frontend and backend in parallel.

5. **Run Storybook**
   ```bash
   npm run storybook --workspace=apps/web
   ```  
   Storybook will be accessible at `http://localhost:6006`.

---

## 🌟 Features

- **Real-Time Multiplayer**: Powered by Socket.IO for seamless interactions between players.
- **Reactive UI**: Built using RxJS to handle live updates in player progress and game states.
- **Interactive Animations**: Framer Motion makes the game visually engaging and smooth.
- **Component Isolation**: Storybook ensures high-quality, reusable UI components.
- **Modern Build Tooling**: Vite and Turborepo enable efficient development and builds.
- **Scalable Backend**: NestJS and Redis provide a solid foundation for real-time gameplay.

---

## 📂 Monorepo Structure

```
typeshii/
├── apps/
│   ├── web/        # Frontend (React + Vite)
│   ├── server/     # Backend (NestJS + Socket.IO)
├── package.json    # Turborepo root package
├── turbo.json      # Turborepo configuration
```

---

## 🧩 Backend API Documentation

The backend provides WebSocket APIs for game interactions and REST APIs for auxiliary operations.

### WebSocket Endpoints
- **`createGame`** - Create a new game session.
- **`joinGame`** - Join an existing game.
- **`updateProgress`** - Update the player's progress.
- **`leaveGame`** - Leave the current game.

### WebSocket Events
- **`gameJoined`** - Triggered when a player successfully joins a game.
- **`gameStarted`** - Triggered when the game starts.
- **`playerJoined`** - Triggered when a new player joins the game.
- **`playerLeft`** - Triggered when a player leaves the game.
- **`gameStateUpdated`** - Triggered when the game state updates.
- **`gameCompleted`** - Triggered when the leaderboard is ready.
- **`error`** - Triggered when an error occurs.

### API Types
```ts
export type Player = {
  id: string;
  progress: number;
  speed: number;
  typedText: string;
  paragraph: string;
  finishTime?: number;
  score?: number;
};
```

---

## 🌐 Deployment

1. Ensure the environment variables are properly configured on the production server.
2. Use a process manager like **PM2** or Docker for deployment.
3. Build and start the application:
   ```bash
   npm run build
   npm run start
   ```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out **TypeShii**! 🚀
