# TWTodos

TWTodos is a modern todo application built with Next.js, React, TypeScript, and TailwindCSS. It provides a clean and intuitive interface for managing your daily tasks with features like drag-and-drop reordering, light/dark theme support, and persistent storage.

## Features

- ✅ Create, view, and delete todos
- 🔄 Drag and drop to reorder tasks
- 🌓 Light and dark theme switching
- 💾 Persistent storage using LocalStorage
- 📱 Responsive design for all device sizes
- 🧩 Task validation (min 3 characters, must start with uppercase)
- 🐳 Docker support for easy deployment

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [React 19](https://react.dev) - Frontend library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [TailwindCSS](https://tailwindcss.com) - Styling
- [React DND](https://react-dnd.github.io/react-dnd/) - Drag and drop functionality
- [Docker](https://www.docker.com) - Containerization

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun
- Docker and Docker Compose (optional, for containerized setup)

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd twtodos
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Using Docker for Development

A development Docker setup is included:

```bash
docker compose -f compose.dev.yaml up
```

This will start the application in development mode with hot reloading enabled.

### Production Deployment

#### Using Docker (Recommended)

The project includes Docker configuration for production deployment:

```bash
docker compose up -d
```

This will build and run the application in production mode on port 3000.

#### Standard Deployment

1. Build the application:
   ```bash
   npm run build
   # or equivalent for your package manager
   ```

2. Start the production server:
   ```bash
   npm run start
   # or equivalent for your package manager
   ```

## How to Use

1. **Adding Todos**: Enter your task text in the input field and click "Add" or press Enter. Note that tasks must:
   - Be at least 3 characters long
   - Start with an uppercase letter

2. **Managing Todos**: 
   - Mark tasks as complete by clicking on them
   - Delete tasks using the trash icon
   - Reorder tasks by dragging and dropping

3. **Switching Themes**: Toggle between light and dark modes using the sun/moon icon in the header.

## Deployment on Fly.io

This project includes a `fly.toml` configuration file for deploying to [Fly.io](https://fly.io):

```bash
flyctl deploy
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)
